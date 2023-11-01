//@ts-nocheck
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Створіть користувача "Alice"
  const alice = await prisma.user.create({
    data: {
      username: "Alice",
      email: "alice@example.com",
      password: "$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm", // secret42
    },
  });

  // Створіть опитування для користувача "Alice"
  const survey = await prisma.survey.create({
    data: {
      title: "Alice seed survey",
      creatorId: alice.id,
      questions: {
        create: [
          {
            text: "Question 1",
            responses: {
              create: [
                { text: "Answer 1.1" },
                { text: "Answer 1.2" },
              ],
            },
          },
          {
            text: "Question 2",
            responses: {
              create: [
                { text: "Answer 2.1" },
                { text: "Answer 2.2" },
              ],
            },
          },
        ],
      },
    },
  });

  console.log({ alice, survey });
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
