import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from "./routers/authRouter";
import router from "./routers/router";
import {
  initializePassport,
  initializePassportSession,
  sessionConfig,
} from "./passport-setup";

const app = express();
const port = process.env.PORT || 3001;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());

app.use(initializePassport()); // Use the initialize function here
app.use(sessionConfig());
app.use(initializePassportSession());

app.use(authRouter);
app.use(router);

app.listen(port, () => {
  console.log(`Сервер слухає на порту ${port}`);
});
