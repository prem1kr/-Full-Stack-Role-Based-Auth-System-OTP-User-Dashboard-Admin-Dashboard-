import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRouter from './routes/authRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());

app.use('/api/auth', authRouter);

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port: ${PORT}`);
});

