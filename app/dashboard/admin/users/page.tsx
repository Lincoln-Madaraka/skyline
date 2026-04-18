import { prisma } from "@/lib/prisma";
import AdminUserActions from "./AdminUserActions";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage({ searchParams }: { searchParams: { filter?: string } }) {
  const filter = searchParams.filter;
  const where =
    filter === "pending-realtors"
      ? { role: "REALTOR" as const, realtorApproved: false }
      : filter === "realtors"
      ? { role: "REALTOR" as const }
      : filter === "buyers"
      ? { role: "BUYER" as const }
      : filter === "admins"
      ? { role: "ADMIN" as const }
      : {};

  const users = await prisma.user.findMany({
    where,
    orderBy: { createdAt: "desc" },
    select: {
      id: true, name: true, email: true, phone: true, role: true,
      realtorApproved: true, createdAt: true,
      _count: { select: { properties: true, inquiries: true } },
    },
    take: 200,
  });

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>Users</h1>
          <p>Approve realtors, manage roles, and reset passwords.</p>
        </div>
        <div className="dash-actions">
          <a className={`btn-sm ${!filter ? "" : "ghost"}`} href="/dashboard/admin/users">All</a>
          <a className={`btn-sm ${filter === "buyers" ? "" : "ghost"}`} href="/dashboard/admin/users?filter=buyers">Buyers</a>
          <a className={`btn-sm ${filter === "realtors" ? "" : "ghost"}`} href="/dashboard/admin/users?filter=realtors">Realtors</a>
          <a className={`btn-sm ${filter === "pending-realtors" ? "" : "ghost"}`} href="/dashboard/admin/users?filter=pending-realtors">Pending Realtors</a>
          <a className={`btn-sm ${filter === "admins" ? "" : "ghost"}`} href="/dashboard/admin/users?filter=admins">Admins</a>
        </div>
      </div>

      <div className="panel">
        {users.length === 0 ? (
          <div className="empty-state"><strong>No users</strong>Try a different filter.</div>
        ) : (
          <table className="dash-table">
            <thead>
              <tr><th>Name</th><th>Role</th><th>Joined</th><th>Properties</th><th>Inquiries</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div><strong>{u.name}</strong></div>
                    <div style={{ fontSize: "0.78rem", color: "rgba(28,27,25,0.55)" }}>{u.email}{u.phone ? ` · ${u.phone}` : ""}</div>
                  </td>
                  <td>
                    <span className={`tag tag-${u.role.toLowerCase()}`}>{u.role}</span>
                    {u.role === "REALTOR" && !u.realtorApproved && <> <span className="tag tag-pending">pending</span></>}
                  </td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td>{u._count.properties}</td>
                  <td>{u._count.inquiries}</td>
                  <td><AdminUserActions userId={u.id} role={u.role} approved={u.realtorApproved} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
