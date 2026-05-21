import { NextResponse } from "next/server";
import { getUserFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/db";

const NEWS_URL = "https://www.pathofexile.com/forum/view-forum/path-of-exile-2-news";
// Matches strings like "0.4.1", "0.5", "1.0.0"
const VERSION_RE = /\b(\d+\.\d+(?:\.\d+)?)\b/g;

export async function POST() {
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let latestVersion = "0.4"; // fallback to known cached version

  try {
    const res = await fetch(NEWS_URL, {
      headers: { "User-Agent": "poe2-oracle-patch-checker/1.0" },
      signal: AbortSignal.timeout(8000),
    });
    if (res.ok) {
      const html = await res.text();
      const matches = [...html.matchAll(VERSION_RE)].map((m) => m[1]);
      if (matches.length > 0) {
        // Take the highest version string found
        latestVersion = matches.sort((a, b) => {
          const av = a.split(".").map(Number);
          const bv = b.split(".").map(Number);
          for (let i = 0; i < 3; i++) {
            const diff = (bv[i] ?? 0) - (av[i] ?? 0);
            if (diff !== 0) return diff;
          }
          return 0;
        })[0];
      }
    }
  } catch (e) {
    console.warn("Patch fetch failed, returning cached version:", e);
  }

  // Upsert the patch cache entry
  await prisma.patchCache.upsert({
    where: { version: latestVersion },
    update: { lastChecked: new Date() },
    create: { version: latestVersion, modPools: {}, lastChecked: new Date() },
  });

  return NextResponse.json({ version: latestVersion, checkedAt: new Date().toISOString() });
}
