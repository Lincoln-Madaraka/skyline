"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ResetStatus, Role } from "@prisma/client";

type Props = {
  req: {
    id: string;
    status: ResetStatus;
    reason: string | null;
    createdAt: string;
    tempPassword: string | null;
    user: { id: string; name: string; email: string; role: Role };
  };
};

export default function ResetRow({ req }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [shown, setShown] = useState<string | null>(req.tempPassword);

  async function onReset() {
    if (!confirm("Generate a temporary password? The user's current password will no longer work.")) return;
    setLoading(true);
    const res = await fetch(`/api/admin/users/${req.user.id}/reset-password`, { method: "POST" });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) return alert(data.error || "Failed");
    setShown(data.tempPassword);
    router.refresh();
  }

  return (
    <tr>
      <td>
        <div><strong>{req.user.name}</strong></div>
        <div style={{ fontSize: "0.78rem", color: "rgba(28,27,25,0.55)" }}>{req.user.email} · <span className={`tag tag-${req.user.role.toLowerCase()}`}>{req.user.role}</span></div>
      </td>
      <td style={{ maxWidth: 320 }}>{req.reason || <span style={{ color: "rgba(28,27,25,0.4)" }}>—</span>}</td>
      <td>{new Date(req.createdAt).toLocaleDateString()}</td>
      <td><span className={`tag tag-${req.status.toLowerCase()}`}>{req.status}</span></td>
      <td>
        {req.status === "PENDING" ? (
          <button className="btn-sm" onClick={onReset} disabled={loading}>{loading ? "Resetting…" : "Reset password"}</button>
        ) : shown ? (
          <span style={{ fontSize: "0.78rem", background: "rgba(107,106,58,0.1)", padding: "0.3rem 0.55rem", borderRadius: 4 }}>
            Temp: <code>{shown}</code>
          </span>
        ) : (
          <span style={{ color: "rgba(28,27,25,0.4)", fontSize: "0.82rem" }}>Fulfilled</span>
        )}
      </td>
    </tr>
  );
}
