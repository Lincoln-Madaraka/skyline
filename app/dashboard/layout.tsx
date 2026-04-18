import { redirect } from "next/navigation";
import { auth } from "@/auth";
import DashShell from "./DashShell";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login?redirect=/dashboard");
  return <DashShell user={session.user}>{children}</DashShell>;
}
