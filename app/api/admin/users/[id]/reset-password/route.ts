import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

function generateTempPassword() {
  const raw = randomBytes(9).toString("base64").replace(/[^a-zA-Z0-9]/g, "");
  return `Sky-${raw.slice(0, 8)}`;
}

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.user.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const user = await prisma.user.findUnique({ where: { id: params.id } });
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const tempPassword = generateTempPassword();
  const passwordHash = await bcrypt.hash(tempPassword, 10);

  await prisma.$transaction([
    prisma.user.update({ where: { id: user.id }, data: { passwordHash } }),
    prisma.passwordResetRequest.updateMany({
      where: { userId: user.id, status: "PENDING" },
      data: { status: "FULFILLED", tempPassword, fulfilledAt: new Date() },
    }),
  ]);

  return NextResponse.json({ tempPassword });
}
