import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

const router = Router();
const prisma = new PrismaClient();

// перевірка відповіді сервера
router.get('/', (req, res) => {
   res.json({message:'Сервер працює'});
 });
// пошук опитуваннь користувача
 router.get('/surveys/user/:id', async (req, res) => {
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

// пошук всіх опитувань
router.get('/surveys', async (req, res) => {
  try {
    const allSurveys = await prisma.survey.findMany();
    if (allSurveys) {
      res.status(200).json( {allSurveys: allSurveys});
    } else {
      res.status(404).json({message: 'Опитування не знайдені'});
    }
  } catch (error) {
      console.error('Помилка при отриманні інформації про опитування', error);
      res.status(500).json({ error: 'Помилка при отриманні інформації про опитування' });
  }
  });

// пошук опитування за id
router.get('/survey/:id', async (req, res) => {
   const id = parseInt(req.params.id);
   try {
     const survey = await prisma.survey.findFirst({
       where: { id: id },
       include: {
         questions: {
           include: {
             responses: true, 
           },
         },
       },
     });
 
     if (survey) {
       console.log(survey);
       
       res.status(200).json(survey);
     } else {
       res.status(404).json({ error: 'Опитування не знайдено' });
     }
   } catch (error) {
     console.error('Помилка при отриманні інформації про опитування', error);
     res.status(500).json({ error: 'Помилка при отриманні інформації про опитування' });
   }
 });
router.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json({users: users});
})
router.post('/users', (req, res) => {
   const newUser = req.body;
   console.log("newUser: ", newUser);
   
   res.status(200).json({message:'Completed',newUser: newUser});
 });

 //answers for test
 router.get('/answers', async (req, res) => {
  const answers = await prisma.response.findMany();
  res.status(200).json({answers: answers})
 });

 router.post('/surveys/:id', async (req, res) => {
   try {
     const { title, questions} = req.body;
     const {id} = req.params;
     const creatorId = parseInt(id, 10);
     console.log("id", id);
     console.log("title", title);
     console.log("questions", questions);
     
 
     const survey = await prisma.survey.create({
       data: {
         title,
         creatorId,
         questions: {
           create: questions.map((questionData: {options: string[]; text: string; 
 }) => {
             const questionText = questionData.text;
             const answers = questionData.options || [];
             return {
               text: questionText,
               responses: {
                 create: answers.map((answer) => {
                   return {
                     text: answer
                   }
                 })
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
 })

 export default router;