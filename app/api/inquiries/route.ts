import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  propertyId: z.string().min(1),
  name: z.string().min(2).max(120),
  email: z.string().email().max(160),
  phone: z.string().max(40).optional().or(z.literal("")),
  message: z.string().min(5).max(2000),
});

export async function POST(req: Request) {
  const session = await auth();
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid" }, { status: 400 });
  }

  const property = await prisma.property.findUnique({ where: { id: parsed.data.propertyId } });
  if (!property) return NextResponse.json({ error: "Property not found" }, { status: 404 });

  const inquiry = await prisma.inquiry.create({
    data: {
      propertyId: property.id,
      buyerId: session?.user?.id ?? null,
      name: parsed.data.name,
      email: parsed.data.email.toLowerCase(),
      phone: parsed.data.phone || null,
      message: parsed.data.message,
    },
  });
  return NextResponse.json({ inquiry }, { status: 201 });
}
