import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function DashboardIndex() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const r = session.user.role;
  if (r === "ADMIN") redirect("/dashboard/admin");
  if (r === "REALTOR") redirect("/dashboard/realtor");
  redirect("/dashboard/buyer");
}
