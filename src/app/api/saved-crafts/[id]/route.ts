import { NextRequest, NextResponse } from "next/server";
import { getUserFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/db";

async function ownedCraft(userId: string, id: string) {
  const craft = await prisma.savedCraft.findUnique({ where: { id } });
  if (!craft || craft.userId !== userId) return null;
  return craft;
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const craft = await ownedCraft(user.id, id);
  if (!craft) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(craft);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const craft = await ownedCraft(user.id, id);
  if (!craft) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.savedCraft.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
