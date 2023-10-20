//@ts-nocheck
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
async function main() {
  const alice = await prisma.user.create({
    data: { 
      username: 'Alice',
      email: 'alice@prisma.io',
      password: '12345'
    }
  })
  
  console.log({ alice })
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