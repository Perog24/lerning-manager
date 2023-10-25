import express from 'express';
import cors from 'cors';
import session from 'express-session';
import bodyParser from 'body-parser';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';

import authRouter from './routers/authRouter';
import router from './routers/router';

const app = express();
const port = process.env.PORT || 3001;
// const prisma = new PrismaClient();
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());

app.use(authRouter);
app.use(router);

app.listen(port, () => {
  console.log(`Сервер слухає на порту ${port}`);
});
