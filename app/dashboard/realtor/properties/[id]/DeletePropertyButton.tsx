"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeletePropertyButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function onDelete() {
    if (!confirm("Delete this property? This cannot be undone.")) return;
    setLoading(true);
    const res = await fetch(`/api/properties/${id}`, { method: "DELETE" });
    setLoading(false);
    if (res.ok) {
      router.push("/dashboard/realtor/properties");
      router.refresh();
    } else {
      alert("Delete failed");
    }
  }
  return (
    <button className="btn-sm danger" onClick={onDelete} disabled={loading}>
      {loading ? "Deleting…" : "Delete"}
    </button>
  );
}
