"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ListingStatus } from "@prisma/client";

export default function AdminPropertyActions({ id, status }: { id: string; status: ListingStatus }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function setStatus(next: ListingStatus) {
    setLoading(true);
    const res = await fetch(`/api/properties/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    setLoading(false);
    if (res.ok) router.refresh();
  }

  return (
    <select
      defaultValue={status}
      onChange={(e) => setStatus(e.target.value as ListingStatus)}
      disabled={loading}
      style={{ padding: "0.35rem 0.5rem", borderRadius: 4, border: "1px solid rgba(43,42,40,0.2)", fontFamily: "inherit", fontSize: "0.82rem", background: "#fff" }}
    >
      <option value="PUBLISHED">PUBLISHED</option>
      <option value="DRAFT">DRAFT</option>
      <option value="HIDDEN">HIDDEN</option>
      <option value="SOLD">SOLD</option>
    </select>
  );
}
