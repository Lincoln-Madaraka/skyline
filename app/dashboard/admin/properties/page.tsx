import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AdminPropertyActions from "./AdminPropertyActions";

export const dynamic = "force-dynamic";

export default async function AdminPropertiesPage() {
  const list = await prisma.property.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      realtor: { select: { id: true, name: true, email: true } },
      _count: { select: { inquiries: true } },
    },
    take: 200,
  });

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>All Properties</h1>
          <p>Every listing on Skyline. Change visibility or contact the realtor.</p>
        </div>
      </div>

      <div className="panel">
        {list.length === 0 ? (
          <div className="empty-state"><strong>No properties</strong></div>
        ) : (
          <table className="dash-table">
            <thead>
              <tr><th></th><th>Title</th><th>Realtor</th><th>Area</th><th>Price</th><th>Status</th><th>Inquiries</th><th>Views</th><th></th></tr>
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
                  <td>
                    <div><strong>{p.title}</strong></div>
                    <div style={{ fontSize: "0.78rem", color: "rgba(28,27,25,0.55)" }}>{p.propertyType} · {p.beds} bd · {p.baths} ba</div>
                  </td>
                  <td>
                    <div><strong>{p.realtor.name}</strong></div>
                    <div style={{ fontSize: "0.78rem", color: "rgba(28,27,25,0.55)" }}>{p.realtor.email}</div>
                  </td>
                  <td>{p.area}</td>
                  <td>{p.priceLabel}</td>
                  <td><span className={`tag tag-${p.status.toLowerCase()}`}>{p.status}</span></td>
                  <td>{p._count.inquiries}</td>
                  <td>{p.views}</td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <div style={{ display: "flex", gap: "0.35rem", alignItems: "center" }}>
                      <AdminPropertyActions id={p.id} status={p.status} />
                      <Link className="btn-sm ghost" href={`/listings/${p.slug}`} target="_blank">View</Link>
                    </div>
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
