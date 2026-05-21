import { NextRequest, NextResponse } from "next/server";
import { getUserFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { craftId, success, currencySpent, notes } = await req.json();
  if (!craftId || success === undefined || !currencySpent) {
    return NextResponse.json({ error: "craftId, success, and currencySpent are required" }, { status: 400 });
  }

  // Verify the craft belongs to this user
  const craft = await prisma.savedCraft.findUnique({ where: { id: craftId } });
  if (!craft || craft.userId !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const attempt = await prisma.craftAttempt.create({
    data: { userId: user.id, craftId, success: Boolean(success), currencySpent, notes },
  });

  return NextResponse.json(attempt, { status: 201 });
}
