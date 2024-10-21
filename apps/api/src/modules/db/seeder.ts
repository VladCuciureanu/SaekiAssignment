import { PrismaClient } from "@prisma/client";

export async function seedDatabase({ db }: { db: PrismaClient }) {
  console.info("Seeding database...");

  const usersCount = await db.user.count();
  if (usersCount > 0) {
    console.log("Database already seeded. Winding down seeding process...");
    return;
  }

  console.info("Seeding materials...");
  await db.material.createMany({
    data: [
      {
        name: "Material 1",
        price: 100,
        default: true,
      },
      {
        name: "Material 1",
        price: 50,
        archived: true,
      },
      {
        name: "Material 2",
        price: 200,
      },
    ],
  });

  console.info("Seeding service packages...");
  await db.servicePackage.createMany({
    data: [
      {
        name: "Service Package 1",
        price: 100,
        default: true,
      },
      {
        name: "Service Package 1",
        price: 50,
        archived: true,
      },
      {
        name: "Service Package 2",
        price: 200,
      },
    ],
  });

  console.info("Seeding admin user...");
  await db.user.create({
    data: {
      email: "admin@saeki.ch",
      passwordHash:
        "$argon2d$v=19$m=12,t=3,p=1$OWhtYjJwNm1yYW0wMDAwMA$jCrpfZCxx8TCc9nHRwx+dw", // SaekiRules!
      isAdmin: true,
    },
  });
}
