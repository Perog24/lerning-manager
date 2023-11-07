import { Router } from "express";
import passport from "passport";
import { PrismaClient } from "@prisma/client"; 
import bcrypt from "bcryptjs";

const authRouter = Router();
const prisma = new PrismaClient();

// додавання нового користувача
authRouter.post('/register', async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    // Перевірка, чи користувач з таким email вже існує в базі даних
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(403).json({ message: 'Користувач з цим email вже існує' });
    }
    // Хешування паролю перед збереженням у базу даних
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);    
    // Створення нового користувача
    const newUser = await prisma.user.create({
      data: {
        username: userName,
        email,
        password: hashedPassword,
      },
    });

    // Автентифікація нового користувача
    req.login(newUser, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Помилка автентифікації' });
      }

      return res.status(201).json(newUser);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});


authRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", (err: any, user: Express.User) => {
    if (err) console.error(err);
    req.login(user, () => {
      return res.json(user);
    });
  })(req, res);
});

export default authRouter;
