import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { uniqueSlug } from "@/lib/slug";

const schema = z.object({
  title: z.string().min(3).max(160),
  area: z.string().min(1).max(80),
  propertyType: z.string().min(1).max(60),
  saleStatus: z.string().min(1).max(40),
  status: z.enum(["DRAFT", "PUBLISHED", "SOLD", "HIDDEN"]).default("PUBLISHED"),
  priceLabel: z.string().min(1).max(40),
  beds: z.number().int().min(0).max(50),
  baths: z.number().int().min(0).max(50),
  parking: z.number().int().min(0).max(50).nullable().optional(),
  plotSize: z.string().max(60).nullable().optional(),
  yearBuilt: z.number().int().min(1800).max(2100).nullable().optional(),
  summary: z.string().min(10).max(2000),
  quickFact: z.string().max(500).nullable().optional(),
  about: z.array(z.string()).nullable().optional(),
  amenities: z.array(z.string()).nullable().optional(),
});

function priceValueFromLabel(label: string): number | null {
  const m = label.replace(/,/g, "").match(/([\d.]+)\s*(K|M|B)?/i);
  if (!m) return null;
  const n = Number(m[1]);
  if (!isFinite(n)) return null;
  const mult =
    m[2]?.toUpperCase() === "M" ? 1_000_000 :
    m[2]?.toUpperCase() === "B" ? 1_000_000_000 :
    m[2]?.toUpperCase() === "K" ? 1_000 : 1;
  return n * mult;
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.user.role !== "REALTOR" && session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid" }, { status: 400 });
  }
  const d = parsed.data;

  const slug = await uniqueSlug(d.title, async (s) => !!(await prisma.property.findUnique({ where: { slug: s } })));
  const priceValue = priceValueFromLabel(d.priceLabel);

  const property = await prisma.property.create({
    data: {
      realtorId: session.user.id,
      title: d.title,
      slug,
      area: d.area,
      propertyType: d.propertyType,
      saleStatus: d.saleStatus,
      status: d.status,
      priceLabel: d.priceLabel,
      priceValue: priceValue?.toString() ?? null,
      beds: d.beds,
      baths: d.baths,
      parking: d.parking ?? null,
      plotSize: d.plotSize ?? null,
      yearBuilt: d.yearBuilt ?? null,
      summary: d.summary,
      quickFact: d.quickFact ?? null,
      about: d.about ? JSON.stringify(d.about) : null,
      amenities: d.amenities ? JSON.stringify(d.amenities) : null,
    },
  });
  return NextResponse.json({ property }, { status: 201 });
}
