//@ts-nocheck
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  const alice = await prisma.user.create({
    data: {
      username: "Alice",
      email: "bob@example.com",
      password: "$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm", // secret42
    },
  });

  console.log({ alice });
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
