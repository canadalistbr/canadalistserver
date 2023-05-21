import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function main() {
    const c = await prisma.provinces.findMany()
    console.log(c);
    
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })