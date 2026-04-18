import { NextResponse } from "next/server";
import { unlink } from "fs/promises";
import path from "path";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(_req: Request, { params }: { params: { id: string; imageId: string } }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const property = await prisma.property.findUnique({ where: { id: params.id } });
  if (!property) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (session.user.role !== "ADMIN" && property.realtorId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const image = await prisma.propertyImage.findUnique({ where: { id: params.imageId } });
  if (!image || image.propertyId !== property.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // only delete from disk if it's a local upload
  if (image.url.startsWith("/uploads/")) {
    const abs = path.join(process.cwd(), "public", image.url.replace(/^\//, ""));
    await unlink(abs).catch(() => null);
  }

  await prisma.propertyImage.delete({ where: { id: image.id } });

  if (property.coverImage === image.url) {
    const next = await prisma.propertyImage.findFirst({
      where: { propertyId: property.id },
      orderBy: { position: "asc" },
    });
    await prisma.property.update({
      where: { id: property.id },
      data: { coverImage: next?.url ?? null },
    });
  }

  return NextResponse.json({ ok: true });
}
