import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json().catch(() => null);
  if (!data?.name || !data?.email) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Stub: real SMTP integration goes here (Resend, Postmark, Nodemailer...).
  // For now we log the enquiry and let the form fall back to mailto on the client
  // by returning 503 only when real email is not configured.
  console.log("[contact] new enquiry", data);

  const hasTransport = process.env.RESEND_API_KEY || process.env.SMTP_URL;
  if (!hasTransport) {
    return NextResponse.json({ error: "transport-not-configured" }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}
