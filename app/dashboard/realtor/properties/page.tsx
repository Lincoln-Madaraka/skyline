import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function MyProperties() {
  const session = await auth();
  const userId = session!.user.id;
  const list = await prisma.property.findMany({
    where: { realtorId: userId },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { inquiries: true } } },
  });

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>My Properties</h1>
          <p>Manage your active listings, drafts, and sold properties.</p>
        </div>
        <div className="dash-actions">
          <Link className="btn-sm" href="/dashboard/realtor/properties/new">+ Post property</Link>
        </div>
      </div>

      <div className="panel">
        {list.length === 0 ? (
          <div className="empty-state">
            <strong>No properties yet</strong>
            Tap &ldquo;Post property&rdquo; to add your first listing.
          </div>
        ) : (
          <table className="dash-table">
            <thead>
              <tr>
                <th></th><th>Title</th><th>Area</th><th>Type</th><th>Price</th><th>Status</th><th>Inquiries</th><th>Views</th><th></th>
              </tr>
            </thead>
            <tbody>
              {list.map((p) => (
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
                  <td>{p.propertyType}</td>
                  <td>{p.priceLabel}</td>
                  <td><span className={`tag tag-${p.status.toLowerCase()}`}>{p.status}</span></td>
                  <td>{p._count.inquiries}</td>
                  <td>{p.views}</td>
                  <td>
                    <Link className="btn-sm ghost" href={`/dashboard/realtor/properties/${p.id}`}>Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
