import { PrismaClient } from "@prisma/client";
import { seedDatabase } from "./seeder";
import { env, Environments } from "../env";

export function getDatabase() {
  const db = new PrismaClient();

  console.log("Seeding database...");

  if (env.NODE_ENV !== Environments.Enum.production) {
    seedDatabase({ db });
  } else {
    console.warn("Refusing to seed database in production environment.");
  }

  return db;
}
