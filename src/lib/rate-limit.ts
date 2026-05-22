import { prisma } from "@/lib/db";

/**
 * Per-user hourly cap on Oracle calls. Protects against runaway Claude API costs
 * if a user (or a compromised account) hammers the /ask or /simulate endpoints.
 *
 * Uses the existing SavedCraft.createdAt timestamps as the rate-limit counter,
 * since every successful Oracle call creates exactly one SavedCraft row.
 * No schema migration needed.
 */

/** Maximum Oracle calls per user per rolling hour. */
const HOURLY_LIMIT = Number(process.env.ORACLE_HOURLY_LIMIT ?? 30);

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  /** Seconds until the oldest counted call falls outside the window. */
  retryAfter?: number;
}

/**
 * Check whether a user is allowed to make another Oracle call.
 * Returns allowed=false when the user has hit the hourly limit.
 */
export async function checkOracleRateLimit(userId: string): Promise<RateLimitResult> {
  const windowStart = new Date(Date.now() - 60 * 60 * 1000);

  const recent = await prisma.savedCraft.findMany({
    where: { userId, createdAt: { gte: windowStart } },
    select: { createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  if (recent.length < HOURLY_LIMIT) {
    return { allowed: true, remaining: HOURLY_LIMIT - recent.length };
  }

  const oldest = recent[0].createdAt;
  const retryAfter = Math.max(1, Math.ceil((oldest.getTime() + 60 * 60 * 1000 - Date.now()) / 1000));
  return { allowed: false, remaining: 0, retryAfter };
}
