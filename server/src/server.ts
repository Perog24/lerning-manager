import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({message:'Сервер працює'});
});
app.post('/users', (req, res) => {
  const newUser = req.body;
  console.log("newUser: ", newUser);
  
  res.status(200).json({message:'Completed',newUser: newUser});
});

app.listen(port, () => {
  console.log(`Сервер слухає на порту ${port}`);
});
