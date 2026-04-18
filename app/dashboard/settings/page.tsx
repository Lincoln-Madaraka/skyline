import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import SettingsForm from "./SettingsForm";
import PasswordForm from "./PasswordForm";

export default async function SettingsPage() {
  const session = await auth();
  const me = await prisma.user.findUniqueOrThrow({
    where: { id: session!.user.id },
    select: { id: true, name: true, email: true, phone: true, bio: true, role: true },
  });

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>Settings</h1>
          <p>Update your profile information and password.</p>
        </div>
      </div>

      <div className="panel">
        <h2 className="section-title">Profile</h2>
        <SettingsForm initial={me} />
      </div>

      <div className="panel">
        <h2 className="section-title">Change password</h2>
        <PasswordForm />
      </div>
    </>
  );
}
