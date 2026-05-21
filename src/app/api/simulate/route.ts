import { NextRequest, NextResponse } from "next/server";
import { getUserFromCookie } from "@/lib/auth";
import { askOracle } from "@/lib/oracle";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { itemType, base, ilvl, affixes, budget } = await req.json();
  if (!itemType || !base || !ilvl || !affixes || !budget) {
    return NextResponse.json({ error: "itemType, base, ilvl, affixes, and budget are required" }, { status: 400 });
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

  let response: string;
  try {
    response = await askOracle(structuredPrompt);
  } catch (err) {
    console.error("Oracle error:", err);
    return NextResponse.json({ error: "Oracle call failed" }, { status: 502 });
  }

  const saved = await prisma.savedCraft.create({
    data: {
      userId: user.id,
      itemType,
      base,
      ilvl: Number(ilvl),
      affixes,
      budget,
      response,
      patchVersion: "0.4",
    },
  });

  return NextResponse.json({ id: saved.id, response });
}
