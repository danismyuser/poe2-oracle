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

  const { question } = await req.json();
  if (!question?.trim()) {
    return NextResponse.json({ error: "question is required" }, { status: 400 });
  }

  // Rate limit before the expensive Claude call
  const limit = await checkOracleRateLimit(user.id);
  if (!limit.allowed) {
    log.warn("oracle.ratelimit", { userId: user.id, route: "ask", retryAfter: limit.retryAfter });
    return NextResponse.json(
      {
        error: `Hourly Oracle limit reached. Try again in ${Math.ceil((limit.retryAfter ?? 60) / 60)} minutes.`,
        retryAfter: limit.retryAfter,
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter ?? 60) } },
    );
  }

  const startedAt = Date.now();
  let response: string;
  try {
    response = await askOracle(question);
  } catch (err) {
    log.error("oracle.error", { userId: user.id, route: "ask", err: String(err) });
    return NextResponse.json({ error: "Oracle call failed" }, { status: 502 });
  }

  // Hard rule: every craft request and response is logged — no silent calls.
  const patchVersion = await getCurrentPatchVersion();
  const saved = await prisma.savedCraft.create({
    data: {
      userId: user.id,
      itemType: "free-form",
      base: "free-form",
      ilvl: 0,
      affixes: {},
      budget: "unknown",
      question,
      response,
      patchVersion,
    },
  });

  log.info("oracle.ask", {
    userId: user.id,
    craftId: saved.id,
    questionLength: question.length,
    responseLength: response.length,
    durationMs: Date.now() - startedAt,
    remaining: limit.remaining - 1,
  });

  return NextResponse.json({ id: saved.id, response });
}
