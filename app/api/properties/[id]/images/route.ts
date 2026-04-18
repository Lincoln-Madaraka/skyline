import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const MAX_FILE_SIZE = 6 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const property = await prisma.property.findUnique({ where: { id: params.id } });
  if (!property) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (session.user.role !== "ADMIN" && property.realtorId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const form = await req.formData();
  const files = form.getAll("files").filter((x): x is File => x instanceof File);
  if (files.length === 0) return NextResponse.json({ error: "No files" }, { status: 400 });

  const dir = path.join(process.cwd(), "public", "uploads", "properties", property.id);
  await mkdir(dir, { recursive: true });

  const existingCount = await prisma.propertyImage.count({ where: { propertyId: property.id } });
  const created: { url: string; id: string }[] = [];

  for (const [i, file] of files.entries()) {
    if (!ALLOWED.has(file.type)) continue;
    if (file.size > MAX_FILE_SIZE) continue;
    const ext = file.type.split("/")[1]?.replace("jpeg", "jpg") ?? "jpg";
    const filename = `${randomUUID()}.${ext}`;
    const abs = path.join(dir, filename);
    const bytes = Buffer.from(await file.arrayBuffer());
    await writeFile(abs, bytes);
    const url = `/uploads/properties/${property.id}/${filename}`;
    const image = await prisma.propertyImage.create({
      data: {
        propertyId: property.id,
        url,
        alt: property.title,
        position: existingCount + i,
      },
    });
    created.push({ id: image.id, url });
  }

  if (!property.coverImage && created.length > 0) {
    await prisma.property.update({
      where: { id: property.id },
      data: { coverImage: created[0].url },
    });
  }

  return NextResponse.json({ images: created }, { status: 201 });
}
