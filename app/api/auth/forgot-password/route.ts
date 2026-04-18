import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  email: z.string().email(),
  reason: z.string().max(500).optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const email = parsed.data.email.toLowerCase().trim();
  const user = await prisma.user.findUnique({ where: { email } });

  // Always return 200 so we don't leak whether the email exists
  if (!user) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  await prisma.passwordResetRequest.create({
    data: {
      userId: user.id,
      reason: parsed.data.reason || null,
    },
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}
