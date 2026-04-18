import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  role: z.enum(["BUYER", "REALTOR", "ADMIN"]).optional(),
  realtorApproved: z.boolean().optional(),
  name: z.string().min(2).max(120).optional(),
  phone: z.string().max(40).nullable().optional(),
});

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.user.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid" }, { status: 400 });

  const data: Record<string, unknown> = {};
  if (parsed.data.role !== undefined) {
    data.role = parsed.data.role;
    if (parsed.data.role === "REALTOR") data.realtorApproved = true;
  }
  if (parsed.data.realtorApproved !== undefined) data.realtorApproved = parsed.data.realtorApproved;
  if (parsed.data.name !== undefined) data.name = parsed.data.name;
  if (parsed.data.phone !== undefined) data.phone = parsed.data.phone;

  const user = await prisma.user.update({ where: { id: params.id }, data });
  return NextResponse.json({ user: { id: user.id, role: user.role, realtorApproved: user.realtorApproved } });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.user.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (params.id === session.user.id) return NextResponse.json({ error: "Cannot delete yourself" }, { status: 400 });
  await prisma.user.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
