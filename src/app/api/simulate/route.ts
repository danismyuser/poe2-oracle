import { NextRequest, NextResponse } from "next/server";
import { getUserFromCookie } from "@/lib/auth";
import { askOracle } from "@/lib/oracle";
import { prisma } from "@/lib/db";
import { getCurrentPatchVersion } from "@/lib/patch-cache";
import { checkOracleRateLimit } from "@/lib/rate-limit";
import { log } from "@/lib/logger";

export async function POST(req: NextRequest) {
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { itemType, base, ilvl, affixes, budget } = await req.json();
  if (!itemType || !base || !ilvl || !affixes || !budget) {
    return NextResponse.json({ error: "itemType, base, ilvl, affixes, and budget are required" }, { status: 400 });
  }

  // Rate limit before the expensive Claude call
  const limit = await checkOracleRateLimit(user.id);
  if (!limit.allowed) {
    log.warn("oracle.ratelimit", { userId: user.id, route: "simulate", retryAfter: limit.retryAfter });
    return NextResponse.json(
      {
        error: `Hourly Oracle limit reached. Try again in ${Math.ceil((limit.retryAfter ?? 60) / 60)} minutes.`,
        retryAfter: limit.retryAfter,
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter ?? 60) } },
    );
  }

  const prefixList = (affixes.prefixes ?? []).map((p: { name: string; tier: string }) => `  - ${p.name} (${p.tier})`).join("\n");
  const suffixList = (affixes.suffixes ?? []).map((s: { name: string; tier: string }) => `  - ${s.name} (${s.tier})`).join("\n");

  const structuredPrompt = `Generate a complete crafting guide for the following item configuration.

Item type: ${itemType}
Base: ${base}
Item level: ${ilvl}
Budget tier: ${budget}

Target affixes:
Prefixes:
${prefixList || "  (none specified — suggest optimal prefixes)"}
Suffixes:
${suffixList || "  (none specified — suggest optimal suffixes)"}

Please provide:
1. All viable crafting routes compared and ranked (route engine, section 6 of your instructions)
2. Three budget variants: league-start / mid-tier / high-end (section 7)
3. A clear recommended route based on the budget tier above
4. Any failure modes to watch out for`;

  const startedAt = Date.now();
  let response: string;
  try {
    response = await askOracle(structuredPrompt);
  } catch (err) {
    log.error("oracle.error", { userId: user.id, route: "simulate", err: String(err) });
    return NextResponse.json({ error: "Oracle call failed" }, { status: 502 });
  }

  const patchVersion = await getCurrentPatchVersion();
  const saved = await prisma.savedCraft.create({
    data: {
      userId: user.id,
      itemType,
      base,
      ilvl: Number(ilvl),
      affixes,
      budget,
      response,
      patchVersion,
    },
  });

  log.info("oracle.simulate", {
    userId: user.id,
    craftId: saved.id,
    itemType,
    base,
    budget,
    responseLength: response.length,
    durationMs: Date.now() - startedAt,
    remaining: limit.remaining - 1,
  });

  return NextResponse.json({ id: saved.id, response });
}
