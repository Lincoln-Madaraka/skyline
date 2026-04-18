import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function RealtorOverview() {
  const session = await auth();
  const userId = session!.user.id;

  const [total, published, newInquiries, totalInquiries, recent] = await Promise.all([
    prisma.property.count({ where: { realtorId: userId } }),
    prisma.property.count({ where: { realtorId: userId, status: "PUBLISHED" } }),
    prisma.inquiry.count({ where: { property: { realtorId: userId }, status: "NEW" } }),
    prisma.inquiry.count({ where: { property: { realtorId: userId } } }),
    prisma.property.findMany({
      where: { realtorId: userId },
      orderBy: { createdAt: "desc" },
      take: 6,
      include: { _count: { select: { inquiries: true } } },
    }),
  ]);

  const totalViews = await prisma.property.aggregate({
    where: { realtorId: userId },
    _sum: { views: true },
  });

  const approved = session!.user.realtorApproved;

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>Realtor Overview</h1>
          <p>Welcome back, {session!.user.name}. Manage your portfolio at a glance.</p>
        </div>
        <div className="dash-actions">
          <Link className="btn-sm" href="/dashboard/realtor/properties/new">+ Post property</Link>
        </div>
      </div>

      {!approved && (
        <div className="notice warn">
          Your realtor account is pending admin approval. You can prepare drafts, but your listings stay hidden until approval.
        </div>
      )}

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-label">Total Properties</div>
          <div className="stat-value">{total}</div>
          <div className="stat-delta">{published} published</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">New Inquiries</div>
          <div className="stat-value">{newInquiries}</div>
          <div className="stat-delta">{totalInquiries} all-time</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Views</div>
          <div className="stat-value">{totalViews._sum.views ?? 0}</div>
          <div className="stat-delta">Across all listings</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg Inquiries / Listing</div>
          <div className="stat-value">{total ? Math.round((totalInquiries / total) * 10) / 10 : 0}</div>
          <div className="stat-delta">Rolling</div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h2 className="panel-title">Recent Listings</h2>
          <Link className="btn-sm ghost" href="/dashboard/realtor/properties">View all</Link>
        </div>
        {recent.length === 0 ? (
          <div className="empty-state">
            <strong>No listings yet</strong>
            Post your first property to start getting inquiries.
          </div>
        ) : (
          <table className="dash-table">
            <thead>
              <tr>
                <th></th><th>Title</th><th>Area</th><th>Price</th><th>Status</th><th>Inquiries</th><th></th>
              </tr>
            </thead>
            <tbody>
              {recent.map((p) => (
                <tr key={p.id}>
                  <td>
                    {p.coverImage ? (
                      <div className="prop-thumb" style={{ backgroundImage: `url(${p.coverImage})` }} aria-label={p.title} />
                    ) : (
                      <div className="prop-thumb-empty">NO IMG</div>
                    )}
                  </td>
                  <td><strong>{p.title}</strong></td>
                  <td>{p.area}</td>
                  <td>{p.priceLabel}</td>
                  <td><span className={`tag tag-${p.status.toLowerCase()}`}>{p.status}</span></td>
                  <td>{p._count.inquiries}</td>
                  <td><Link className="btn-sm ghost" href={`/dashboard/realtor/properties/${p.id}`}>Manage</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
