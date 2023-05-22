import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function main() {
  const c = await prisma.provinces.findMany();
  console.log(c);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
