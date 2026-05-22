import { prisma } from "@/lib/db";

/**
 * Returns the current patch version from the PatchCache table.
 * Falls back to "0.4" if the table is empty or unreachable.
 * Used everywhere a patch version string is needed at runtime.
 */
export async function getCurrentPatchVersion(): Promise<string> {
  try {
    const latest = await prisma.patchCache.findFirst({
      orderBy: { lastChecked: "desc" },
    });
    return latest?.version ?? "0.4";
  } catch {
    return "0.4";
  }
}
