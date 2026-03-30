import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import boardRouter from './router/board.router.js';
import pool from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'Trello PostgreSQL CRUD API ishlayapti' });
});

app.use('/api', boardRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Route topilmadi' });
});

const startServer = async () => {
  try {
    await pool.query('SELECT NOW()');
    console.log('PostgreSQL ga muvaffaqiyatli ulandi');

    app.listen(PORT, () => {
      console.log(`Server ${PORT}-portda ishga tushdi`);
    });
  } catch (error) {
    console.error('Database ulanishida xato:', error.message);
  }
};

startServer();
