"use client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { InquiryStatus } from "@prisma/client";

export default function InquiryStatusControl({ id, current }: { id: string; current: InquiryStatus }) {
  const router = useRouter();
  const [value, setValue] = useState<InquiryStatus>(current);
  const [pending, startTransition] = useTransition();

  async function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value as InquiryStatus;
    setValue(next);
    const res = await fetch(`/api/inquiries/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    if (res.ok) startTransition(() => router.refresh());
  }

  return (
    <select value={value} onChange={onChange} disabled={pending} style={{ padding: "0.35rem 0.5rem", borderRadius: 4, border: "1px solid rgba(43,42,40,0.2)", fontFamily: "inherit", fontSize: "0.82rem", background: "#fff" }}>
      <option value="NEW">NEW</option>
      <option value="CONTACTED">CONTACTED</option>
      <option value="CLOSED">CLOSED</option>
    </select>
  );
}
