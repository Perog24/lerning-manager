import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
dotenv.config();
import { PrismaClient } from '@prisma/client';

const app = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({message:'Сервер працює'});
});

app.get('/surveys/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const surveys = await prisma.survey.findMany({
    where: {creatorId: id}
  })
if (surveys.length > 0) {
  res.status(200).json({surveys: surveys});
} else {
  res.status(204).json({message: 'Survey not found'});
}
});

app.post('/surveys', async (req, res) => {
  try {
    const { title, questions, creatorId } = req.body;

    const survey = await prisma.survey.create({
      data: {
        title,
        creatorId,
        questions: {
          create: questions.map((questionText: string) => {
            return {
              text: questionText,
              responses: { // Додайте порожній масив відповідей для кожного питання
                create: [],
              },
            };
          }),
        },
      },
      include: {
        questions: true, // Включаємо дані про питання в відповідь
      },
    });

    res.status(200).json(survey);
  } catch (error) {
    console.error('Помилка при створенні опитування', error);
    res.status(500).json({ error: 'Помилка при створенні опитування' });
  } finally {
    await prisma.$disconnect();
  }
});


app.post('/users/login', async (req, res) => {
  const {userName, email, password} = req.body;  
  const userInDB = await prisma.user.findUnique({
    where: {email: email}
  });
  console.log(userInDB, userName, email, password);
  
  if (userInDB?.username === userName && userInDB?.email === email && String(password) === userInDB?.password) {
      res.status(200).json({message: "User OK", data: userInDB?.id});
  } else {
    res.status(201).json({message: "User Not Found"});
  }
});

app.post('/users', (req, res) => {
  const newUser = req.body;
  console.log("newUser: ", newUser);
  
  res.status(200).json({message:'Completed',newUser: newUser});
});

app.listen(port, () => {
  console.log(`Сервер слухає на порту ${port}`);
});
