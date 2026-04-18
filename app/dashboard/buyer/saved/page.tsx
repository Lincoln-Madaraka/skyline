import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function BuyerSavedPage() {
  const session = await auth();
  const saved = await prisma.savedListing.findMany({
    where: { userId: session!.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      property: {
        select: {
          id: true, slug: true, title: true, area: true, priceLabel: true, propertyType: true, beds: true, baths: true, coverImage: true, status: true,
        },
      },
    },
  });

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>Saved Listings</h1>
          <p>Everything you&apos;ve bookmarked so far.</p>
        </div>
      </div>

      <div className="panel">
        {saved.length === 0 ? (
          <div className="empty-state">
            <strong>No saved listings</strong>
            Tap the save icon on a property to add it here.
          </div>
        ) : (
          <table className="dash-table">
            <thead>
              <tr><th></th><th>Title</th><th>Area</th><th>Type</th><th>Beds/Baths</th><th>Price</th><th></th></tr>
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
                  <td>{s.property.propertyType}</td>
                  <td>{s.property.beds} / {s.property.baths}</td>
                  <td>{s.property.priceLabel}</td>
                  <td><Link className="btn-sm ghost" href={`/listings/${s.property.slug}`}>View</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
