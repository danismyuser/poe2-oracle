"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error); return; }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="flex-1 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-amber-400 mb-6">Log in</h1>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <input
            type="email" placeholder="Email" required value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 rounded px-3 py-2 focus:outline-none focus:border-amber-500"
          />
          <input
            type="password" placeholder="Password" required value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 rounded px-3 py-2 focus:outline-none focus:border-amber-500"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit" disabled={loading}
            className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-semibold py-2 rounded"
          >
            {loading ? "Logging in…" : "Log in"}
          </button>
        </form>
        <p className="mt-4 text-sm text-zinc-500">
          No account?{" "}
          <Link href="/signup" className="text-amber-400 hover:underline">Sign up free</Link>
        </p>
      </div>
    </main>
  );
}
