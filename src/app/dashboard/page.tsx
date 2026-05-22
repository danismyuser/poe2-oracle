import { redirect } from "next/navigation";
import { getUserFromCookie } from "@/lib/auth";
import DashboardClient from "./DashboardClient";

const VALID_TABS = ["ask", "simulate", "saved"] as const;
type TabKey = (typeof VALID_TABS)[number];

const TAB_MAP: Record<TabKey, "Ask the Oracle" | "Configure & Simulate" | "Saved Crafts"> = {
  ask: "Ask the Oracle",
  simulate: "Configure & Simulate",
  saved: "Saved Crafts",
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const user = await getUserFromCookie();
  if (!user) redirect("/login");

  const params = await searchParams;
  const tabKey = (VALID_TABS.find((t) => t === params.tab) ?? "ask") as TabKey;
  const initialTab = TAB_MAP[tabKey];

  return <DashboardClient userEmail={user.email} initialTab={initialTab} />;
}
