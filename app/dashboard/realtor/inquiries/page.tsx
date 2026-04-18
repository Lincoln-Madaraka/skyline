import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import InquiryStatusControl from "./InquiryStatusControl";

export default async function RealtorInquiriesPage() {
  const session = await auth();
  const userId = session!.user.id;

  const inquiries = await prisma.inquiry.findMany({
    where: { property: { realtorId: userId } },
    orderBy: { createdAt: "desc" },
    include: { property: { select: { id: true, title: true } } },
    take: 200,
  });

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>Inquiries</h1>
          <p>Buyer messages for your listings. Mark them as contacted or closed when you follow up.</p>
        </div>
      </div>

      <div className="panel">
        {inquiries.length === 0 ? (
          <div className="empty-state">
            <strong>No inquiries yet</strong>
            Inquiries from buyers will show up here.
          </div>
        ) : (
          <table className="dash-table">
            <thead>
              <tr>
                <th>Date</th><th>Buyer</th><th>Property</th><th>Message</th><th>Status</th><th></th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((iq) => (
                <tr key={iq.id}>
                  <td>{new Date(iq.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div><strong>{iq.name}</strong></div>
                    <div style={{ fontSize: "0.8rem", color: "rgba(28,27,25,0.55)" }}>{iq.email}{iq.phone ? ` · ${iq.phone}` : ""}</div>
                  </td>
                  <td><Link href={`/dashboard/realtor/properties/${iq.property.id}`}>{iq.property.title}</Link></td>
                  <td style={{ maxWidth: 360 }}>{iq.message}</td>
                  <td><span className={`tag tag-${iq.status.toLowerCase()}`}>{iq.status}</span></td>
                  <td><InquiryStatusControl id={iq.id} current={iq.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
