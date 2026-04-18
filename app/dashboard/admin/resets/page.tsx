import { prisma } from "@/lib/prisma";
import ResetRow from "./ResetRow";

export const dynamic = "force-dynamic";

export default async function AdminResetsPage() {
  const requests = await prisma.passwordResetRequest.findMany({
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    include: { user: { select: { id: true, name: true, email: true, role: true } } },
    take: 200,
  });

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>Password Reset Requests</h1>
          <p>Reset a password, then share the temporary password with the user securely.</p>
        </div>
      </div>

      <div className="panel">
        {requests.length === 0 ? (
          <div className="empty-state"><strong>No reset requests</strong>Nothing to process right now.</div>
        ) : (
          <table className="dash-table">
            <thead>
              <tr><th>User</th><th>Reason</th><th>Requested</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <ResetRow
                  key={r.id}
                  req={{
                    id: r.id,
                    status: r.status,
                    reason: r.reason,
                    createdAt: r.createdAt.toISOString(),
                    tempPassword: r.tempPassword,
                    user: r.user,
                  }}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
