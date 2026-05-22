import { redirect } from "next/navigation";
import { getUserFromCookie } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";
import { prisma } from "@/lib/db";
import AdminClient from "./AdminClient";

export const dynamic = "force-dynamic";

/**
 * Internal admin view — lists recent SavedCraft entries so the operator can
 * spot-check Oracle responses without digging through the database directly.
 * Gated by the ADMIN_EMAILS env var (comma-separated list of allowed emails).
 */
export default async function AdminPage() {
  const user = await getUserFromCookie();
  if (!user) redirect("/login");
  if (!isAdminEmail(user.email)) redirect("/dashboard");

  const [crafts, totals] = await Promise.all([
    prisma.savedCraft.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      select: {
        id: true,
        itemType: true,
        base: true,
        budget: true,
        question: true,
        response: true,
        patchVersion: true,
        createdAt: true,
        user: { select: { email: true } },
      },
    }),
    Promise.all([
      prisma.user.count(),
      prisma.savedCraft.count(),
      prisma.craftAttempt.count(),
      prisma.savedCraft.count({
        where: { createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
      }),
    ]),
  ]);

  const [userCount, craftCount, attemptCount, craftsLast24h] = totals;

  return (
    <AdminClient
      crafts={crafts.map((c) => ({
        ...c,
        createdAt: c.createdAt.toISOString(),
      }))}
      stats={{ userCount, craftCount, attemptCount, craftsLast24h }}
    />
  );
}
