import { redirect } from "next/navigation";
import { getUserFromCookie } from "@/lib/auth";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const user = await getUserFromCookie();
  if (!user) redirect("/login");

  return <DashboardClient userEmail={user.email} />;
}
