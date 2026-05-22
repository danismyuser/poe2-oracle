"use client";
import { useRouter } from "next/navigation";

/**
 * Shared logout hook. Calls the logout API, clears the session cookie,
 * then redirects to home and triggers a server component refresh.
 */
export function useLogout() {
  const router = useRouter();

  return async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };
}
