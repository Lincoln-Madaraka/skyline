import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function BuyerInquiriesPage() {
  const session = await auth();
  const inquiries = await prisma.inquiry.findMany({
    where: { buyerId: session!.user.id },
    orderBy: { createdAt: "desc" },
    include: { property: { select: { id: true, slug: true, title: true, area: true } } },
  });

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>My Inquiries</h1>
          <p>Messages you&apos;ve sent to realtors, and their status.</p>
        </div>
      </div>

      <div className="panel">
        {inquiries.length === 0 ? (
          <div className="empty-state">
            <strong>No inquiries yet</strong>
            Reach out on any listing page to send a viewing request.
          </div>
        ) : (
          <table className="dash-table">
            <thead>
              <tr><th>Date</th><th>Property</th><th>Message</th><th>Status</th></tr>
            </thead>
            <tbody>
              {inquiries.map((iq) => (
                <tr key={iq.id}>
                  <td>{new Date(iq.createdAt).toLocaleDateString()}</td>
                  <td><Link href={`/listings/${iq.property.slug}`}>{iq.property.title}</Link></td>
                  <td style={{ maxWidth: 360 }}>{iq.message}</td>
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
