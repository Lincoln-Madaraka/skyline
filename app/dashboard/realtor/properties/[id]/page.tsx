import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import PropertyForm from "../PropertyForm";
import DeletePropertyButton from "./DeletePropertyButton";

export default async function EditPropertyPage({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const property = await prisma.property.findUnique({
    where: { id: params.id },
    include: { images: { orderBy: { position: "asc" } } },
  });
  if (!property) notFound();
  if (session.user.role !== "ADMIN" && property.realtorId !== session.user.id) notFound();

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>Edit Property</h1>
          <p>{property.title}</p>
        </div>
        <div className="dash-actions">
          <Link className="btn-sm ghost" href={`/listings/${property.slug}`} target="_blank">View public page</Link>
          <DeletePropertyButton id={property.id} />
        </div>
      </div>
      <PropertyForm
        initial={{
          id: property.id,
          title: property.title,
          area: property.area,
          propertyType: property.propertyType,
          status: property.status,
          saleStatus: property.saleStatus,
          priceLabel: property.priceLabel,
          beds: property.beds,
          baths: property.baths,
          parking: property.parking,
          plotSize: property.plotSize,
          yearBuilt: property.yearBuilt,
          summary: property.summary,
          quickFact: property.quickFact,
          about: property.about,
          amenities: property.amenities,
          highlights: property.highlights,
          coverImage: property.coverImage,
          images: property.images.map((im) => ({ id: im.id, url: im.url, alt: im.alt })),
        }}
      />
    </>
  );
}
