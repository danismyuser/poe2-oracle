import { NextRequest, NextResponse } from "next/server";
import { getUserFromCookie } from "@/lib/auth";
import { askOracle } from "@/lib/oracle";
import { prisma } from "@/lib/db";
import { getCurrentPatchVersion } from "@/lib/patch-cache";

export async function POST(req: NextRequest) {
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { question } = await req.json();
  if (!question?.trim()) {
    return NextResponse.json({ error: "question is required" }, { status: 400 });
  }

  let response: string;
  try {
    response = await askOracle(question);
  } catch (err) {
    console.error("Oracle error:", err);
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

  return NextResponse.json({ id: saved.id, response });
}
