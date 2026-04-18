import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function BuyerOverview() {
  const session = await auth();
  const userId = session!.user.id;

  const [savedCount, inquiryCount, newProperties] = await Promise.all([
    prisma.savedListing.count({ where: { userId } }),
    prisma.inquiry.count({ where: { buyerId: userId } }),
    prisma.property.count({
      where: {
        status: "PUBLISHED",
        createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      },
    }),
  ]);

  const recentInquiries = await prisma.inquiry.findMany({
    where: { buyerId: userId },
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { property: { select: { id: true, slug: true, title: true, area: true } } },
  });

  const saved = await prisma.savedListing.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 6,
    include: { property: { select: { id: true, slug: true, title: true, area: true, priceLabel: true, coverImage: true } } },
  });

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>Your Dashboard</h1>
          <p>Track saved listings, inquiries, and new homes across Nairobi.</p>
        </div>
        <div className="dash-actions">
          <Link className="btn-sm" href="/listings">Browse listings</Link>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-label">Saved Listings</div>
          <div className="stat-value">{savedCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">My Inquiries</div>
          <div className="stat-value">{inquiryCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">New in Last 30 Days</div>
          <div className="stat-value">{newProperties}</div>
          <div className="stat-delta">Fresh listings on the market</div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h2 className="panel-title">Recently Saved</h2>
          <Link className="btn-sm ghost" href="/dashboard/buyer/saved">View all</Link>
        </div>
        {saved.length === 0 ? (
          <div className="empty-state">
            <strong>Nothing saved yet</strong>
            Browse listings and tap the heart to save them here.
          </div>
        ) : (
          <table className="dash-table">
            <thead>
              <tr><th></th><th>Title</th><th>Area</th><th>Price</th><th></th></tr>
            </thead>
            <tbody>
              {saved.map((s) => (
                <tr key={s.id}>
                  <td>
                    {s.property.coverImage ? (
                      <div className="prop-thumb" style={{ backgroundImage: `url(${s.property.coverImage})` }} aria-label={s.property.title} />
                    ) : (
                      <div className="prop-thumb-empty">NO IMG</div>
                    )}
                  </td>
                  <td><strong>{s.property.title}</strong></td>
                  <td>{s.property.area}</td>
                  <td>{s.property.priceLabel}</td>
                  <td><Link className="btn-sm ghost" href={`/listings/${s.property.slug}`}>View</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="panel">
        <div className="panel-head">
          <h2 className="panel-title">Recent Inquiries</h2>
          <Link className="btn-sm ghost" href="/dashboard/buyer/inquiries">View all</Link>
        </div>
        {recentInquiries.length === 0 ? (
          <div className="empty-state">
            <strong>No inquiries yet</strong>
            Reach out on a listing page and your messages appear here.
          </div>
        ) : (
          <table className="dash-table">
            <thead>
              <tr><th>Date</th><th>Property</th><th>Status</th></tr>
            </thead>
            <tbody>
              {recentInquiries.map((iq) => (
                <tr key={iq.id}>
                  <td>{new Date(iq.createdAt).toLocaleDateString()}</td>
                  <td><Link href={`/listings/${iq.property.slug}`}>{iq.property.title}</Link></td>
                  <td><span className={`tag tag-${iq.status.toLowerCase()}`}>{iq.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
