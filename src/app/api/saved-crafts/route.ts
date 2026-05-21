import { NextRequest, NextResponse } from "next/server";
import { getUserFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const take = 50;

  const [crafts, total] = await Promise.all([
    prisma.savedCraft.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * take,
      take,
      select: {
        id: true,
        itemType: true,
        base: true,
        budget: true,
        question: true,
        routeChosen: true,
        costEstimate: true,
        patchVersion: true,
        createdAt: true,
      },
    }),
    prisma.savedCraft.count({ where: { userId: user.id } }),
  ]);

  return NextResponse.json({ crafts, total, page, pages: Math.ceil(total / take) });
}
