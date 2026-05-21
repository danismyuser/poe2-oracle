"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavBar() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((u) => setEmail(u?.email ?? null))
      .catch(() => setEmail(null));
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setEmail(null);
    router.push("/");
    router.refresh();
  }

  return (
    <nav className="border-b border-zinc-800 bg-zinc-950 px-6 py-3 flex items-center justify-between">
      <Link href="/" className="font-bold text-amber-400 tracking-tight text-lg">
        PoE2 Oracle
      </Link>
      <div className="flex gap-4 items-center text-sm">
        {email ? (
          <>
            <Link href="/dashboard" className="text-zinc-300 hover:text-white">
              Dashboard
            </Link>
            <button onClick={logout} className="text-zinc-500 hover:text-white">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-zinc-300 hover:text-white">
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-3 py-1 rounded"
            >
              Sign up free
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
