import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({message:'Сервер працює'});
});
app.get('/data', (req, res) => {
  res.status(200).json({message:'Це данні'});
});

app.listen(port, () => {
  console.log(`Сервер слухає на порту ${port}`);
});
