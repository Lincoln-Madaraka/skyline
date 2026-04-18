import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      property: { select: { id: true, slug: true, title: true, area: true, realtor: { select: { name: true, email: true } } } },
    },
    take: 300,
  });

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>All Inquiries</h1>
          <p>Every message buyers have sent across listings.</p>
        </div>
      </div>

      <div className="panel">
        {inquiries.length === 0 ? (
          <div className="empty-state"><strong>No inquiries yet</strong></div>
        ) : (
          <table className="dash-table">
            <thead>
              <tr><th>Date</th><th>Buyer</th><th>Property</th><th>Realtor</th><th>Message</th><th>Status</th></tr>
            </thead>
            <tbody>
              {inquiries.map((iq) => (
                <tr key={iq.id}>
                  <td>{new Date(iq.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div><strong>{iq.name}</strong></div>
                    <div style={{ fontSize: "0.78rem", color: "rgba(28,27,25,0.55)" }}>{iq.email}{iq.phone ? ` · ${iq.phone}` : ""}</div>
                  </td>
                  <td><Link href={`/listings/${iq.property.slug}`}>{iq.property.title}</Link><br /><span style={{ fontSize: "0.78rem", color: "rgba(28,27,25,0.55)" }}>{iq.property.area}</span></td>
                  <td>{iq.property.realtor.name}<br /><span style={{ fontSize: "0.78rem", color: "rgba(28,27,25,0.55)" }}>{iq.property.realtor.email}</span></td>
                  <td style={{ maxWidth: 340 }}>{iq.message}</td>
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
