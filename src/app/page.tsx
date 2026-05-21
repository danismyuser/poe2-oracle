import Link from "next/link";
import { prisma } from "@/lib/db";

async function getCachedPatch() {
  try {
    const latest = await prisma.patchCache.findFirst({ orderBy: { lastChecked: "desc" } });
    return latest?.version ?? "0.4";
  } catch {
    return "0.4";
  }
}

export default async function Home() {
  const patch = await getCachedPatch();

  return (
    <main className="flex-1 flex flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 gap-6">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1 text-xs text-amber-400 font-medium mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          Patch {patch} · The Last of the Druids
        </div>
        <h1 className="text-5xl font-bold tracking-tight max-w-2xl">
          The <span className="text-amber-400">PoE2 Crafting</span> Oracle
        </h1>
        <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">
          Describe any item. Get the optimal crafting route, three budget variants,
          and patch-accurate advice — powered by authoritative game data, not guesswork.
        </p>
        <div className="flex gap-3 mt-2">
          <Link
            href="/signup"
            className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-6 py-2.5 rounded-lg transition-colors"
          >
            Start crafting free
          </Link>
          <Link
            href="/login"
            className="border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white px-6 py-2.5 rounded-lg transition-colors"
          >
            Log in
          </Link>
        </div>
      </section>

      {/* Feature cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto px-6 pb-20 w-full">
        <FeatureCard
          icon="💬"
          title="Ask anything"
          desc="Describe your target item in plain English. The Oracle extracts your intent and generates a full crafting plan with route comparison."
        />
        <FeatureCard
          icon="⚙️"
          title="Configure & simulate"
          desc="Pick your base, item level, and target affixes. Get every viable route ranked by efficiency and determinism, with three budget variants."
        />
        <FeatureCard
          icon="🔄"
          title="Always patch-aware"
          desc="Consults craftofexile.com and poe2db.tw. Never gives advice that doesn't exist in the current patch. Flags stale data automatically."
        />
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-4 text-center text-xs text-zinc-600">
        PoE2 Crafting Oracle · Patch {patch} cached · Not affiliated with Grinding Gear Games
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-5 flex flex-col gap-3">
      <span className="text-2xl">{icon}</span>
      <h2 className="font-semibold text-white">{title}</h2>
      <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
