import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  title: z.string().min(3).max(160).optional(),
  area: z.string().min(1).max(80).optional(),
  propertyType: z.string().min(1).max(60).optional(),
  saleStatus: z.string().min(1).max(40).optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "SOLD", "HIDDEN"]).optional(),
  priceLabel: z.string().min(1).max(40).optional(),
  beds: z.number().int().min(0).max(50).optional(),
  baths: z.number().int().min(0).max(50).optional(),
  parking: z.number().int().min(0).max(50).nullable().optional(),
  plotSize: z.string().max(60).nullable().optional(),
  yearBuilt: z.number().int().min(1800).max(2100).nullable().optional(),
  summary: z.string().min(10).max(2000).optional(),
  quickFact: z.string().max(500).nullable().optional(),
  about: z.array(z.string()).nullable().optional(),
  amenities: z.array(z.string()).nullable().optional(),
});

async function loadAndAuthorize(id: string, userId: string, role: string) {
  const property = await prisma.property.findUnique({ where: { id } });
  if (!property) return { error: NextResponse.json({ error: "Not found" }, { status: 404 }) };
  if (role !== "ADMIN" && property.realtorId !== userId) {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }
  return { property };
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const auth0 = await loadAndAuthorize(params.id, session.user.id, session.user.role);
  if ("error" in auth0) return auth0.error;

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid" }, { status: 400 });

  const d = parsed.data;
  const data: Record<string, unknown> = {};
  if (d.title !== undefined) data.title = d.title;
  if (d.area !== undefined) data.area = d.area;
  if (d.propertyType !== undefined) data.propertyType = d.propertyType;
  if (d.saleStatus !== undefined) data.saleStatus = d.saleStatus;
  if (d.status !== undefined) data.status = d.status;
  if (d.priceLabel !== undefined) data.priceLabel = d.priceLabel;
  if (d.beds !== undefined) data.beds = d.beds;
  if (d.baths !== undefined) data.baths = d.baths;
  if (d.parking !== undefined) data.parking = d.parking;
  if (d.plotSize !== undefined) data.plotSize = d.plotSize;
  if (d.yearBuilt !== undefined) data.yearBuilt = d.yearBuilt;
  if (d.summary !== undefined) data.summary = d.summary;
  if (d.quickFact !== undefined) data.quickFact = d.quickFact;
  if (d.about !== undefined) data.about = d.about ? JSON.stringify(d.about) : null;
  if (d.amenities !== undefined) data.amenities = d.amenities ? JSON.stringify(d.amenities) : null;

  const updated = await prisma.property.update({ where: { id: params.id }, data });
  return NextResponse.json({ property: updated });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const auth0 = await loadAndAuthorize(params.id, session.user.id, session.user.role);
  if ("error" in auth0) return auth0.error;
  await prisma.property.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
