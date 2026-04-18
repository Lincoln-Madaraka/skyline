import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ saved: [] });
  const saved = await prisma.savedListing.findMany({
    where: { userId: session.user.id },
    select: { propertyId: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ saved });
}

const bodySchema = z.object({ propertyId: z.string().min(1) });

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid" }, { status: 400 });
  await prisma.savedListing.upsert({
    where: { userId_propertyId: { userId: session.user.id, propertyId: parsed.data.propertyId } },
    update: {},
    create: { userId: session.user.id, propertyId: parsed.data.propertyId },
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid" }, { status: 400 });
  await prisma.savedListing
    .delete({ where: { userId_propertyId: { userId: session.user.id, propertyId: parsed.data.propertyId } } })
    .catch(() => null);
  return NextResponse.json({ ok: true });
}
