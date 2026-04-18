import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { listings as hardcoded } from "../lib/listings";

const prisma = new PrismaClient();

const users = [
  {
    email: "admin@skyline.co.ke",
    name: "Skyline Admin",
    password: "Skyline@Admin2026",
    role: "ADMIN" as const,
    realtorApproved: true,
  },
  {
    email: "realtor@skyline.co.ke",
    name: "Mwangi Realtor",
    password: "Skyline@Realtor2026",
    role: "REALTOR" as const,
    realtorApproved: true,
    phone: "+254 700 000 001",
    bio: "Senior property consultant covering Nairobi and its suburbs.",
  },
  {
    email: "buyer@skyline.co.ke",
    name: "Amina Buyer",
    password: "Skyline@Buyer2026",
    role: "BUYER" as const,
    realtorApproved: true,
    phone: "+254 700 000 002",
  },
];

function priceValueFromLabel(label: string): number | null {
  const m = label.replace(/,/g, "").match(/([\d.]+)\s*(K|M|B)?/i);
  if (!m) return null;
  const n = Number(m[1]);
  if (!isFinite(n)) return null;
  const mult = m[2]?.toUpperCase() === "M" ? 1_000_000 : m[2]?.toUpperCase() === "B" ? 1_000_000_000 : m[2]?.toUpperCase() === "K" ? 1_000 : 1;
  return n * mult;
}

async function main() {
  console.log("Seeding users...");
  for (const u of users) {
    const passwordHash = await bcrypt.hash(u.password, 10);
    await prisma.user.upsert({
      where: { email: u.email },
      update: { name: u.name, role: u.role, realtorApproved: u.realtorApproved, passwordHash },
      create: {
        email: u.email,
        name: u.name,
        passwordHash,
        role: u.role,
        realtorApproved: u.realtorApproved,
        phone: "phone" in u ? u.phone : null,
        bio: "bio" in u ? u.bio : null,
      },
    });
    console.log(`  ✓ ${u.email} (${u.role})`);
  }

  const realtor = await prisma.user.findUniqueOrThrow({ where: { email: "realtor@skyline.co.ke" } });

  console.log("Seeding properties from hardcoded list...");
  for (const l of hardcoded) {
    await prisma.property.upsert({
      where: { slug: l.id },
      update: {},
      create: {
        realtorId: realtor.id,
        title: l.title,
        slug: l.id,
        area: l.area,
        propertyType: l.propertyType,
        status: "PUBLISHED",
        saleStatus: l.status,
        priceLabel: l.price,
        priceValue: priceValueFromLabel(l.price)?.toString() ?? null,
        beds: l.beds,
        baths: l.baths,
        parking: l.parking ?? null,
        plotSize: l.plotSize ?? null,
        yearBuilt: l.yearBuilt ?? null,
        summary: l.summary,
        quickFact: l.quickFact ?? null,
        about: l.about ? JSON.stringify(l.about) : null,
        amenities: l.amenities ? JSON.stringify(l.amenities) : null,
        highlights: l.highlights ? JSON.stringify(l.highlights) : null,
        coverImage: l.image,
        images: {
          create: [
            { url: l.image, alt: l.alt, position: 0 },
          ],
        },
      },
    });
    console.log(`  ✓ ${l.id}`);
  }

  console.log("\nSeed complete.\n");
  console.log("Default logins:");
  users.forEach((u) => console.log(`  ${u.role.padEnd(8)} ${u.email}  /  ${u.password}`));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
