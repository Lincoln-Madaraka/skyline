"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Role } from "@prisma/client";

export default function AdminUserActions({ userId, role, approved }: { userId: string; role: Role; approved: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [temp, setTemp] = useState<string | null>(null);

  async function call(path: string, body: unknown = {}, method: "POST" | "PATCH" = "PATCH") {
    setLoading(true);
    const res = await fetch(path, {
      method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) {
      alert(data.error || "Action failed");
      return null;
    }
    router.refresh();
    return data;
  }

  async function resetPassword() {
    if (!confirm("Generate a temporary password for this user? You'll need to share it with them securely.")) return;
    const data = await call(`/api/admin/users/${userId}/reset-password`, {}, "POST");
    if (data?.tempPassword) setTemp(data.tempPassword);
  }

  return (
    <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", alignItems: "center" }}>
      {role === "REALTOR" && !approved && (
        <button className="btn-sm" onClick={() => call(`/api/admin/users/${userId}`, { realtorApproved: true })} disabled={loading}>
          Approve
        </button>
      )}
      <select
        defaultValue={role}
        onChange={(e) => call(`/api/admin/users/${userId}`, { role: e.target.value as Role })}
        disabled={loading}
        style={{ padding: "0.35rem 0.5rem", borderRadius: 4, border: "1px solid rgba(43,42,40,0.2)", fontFamily: "inherit", fontSize: "0.82rem", background: "#fff" }}
      >
        <option value="BUYER">BUYER</option>
        <option value="REALTOR">REALTOR</option>
        <option value="ADMIN">ADMIN</option>
      </select>
      <button className="btn-sm ghost" onClick={resetPassword} disabled={loading}>Reset password</button>
      {temp && (
        <span style={{ fontSize: "0.78rem", background: "rgba(107,106,58,0.1)", padding: "0.3rem 0.55rem", borderRadius: 4, color: "#4a4a28" }}>
          Temp: <code>{temp}</code>
        </span>
      )}
    </div>
  );
}
