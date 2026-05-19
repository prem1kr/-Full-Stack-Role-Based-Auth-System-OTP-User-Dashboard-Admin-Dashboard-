import express from 'express';
import { Login, sendOtp, Signup, verifyOtp } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/signup', Signup);
authRouter.post('/login', Login);
authRouter.post('/send-otp/:id', sendOtp);
authRouter.post('/verify-otp/:id', verifyOtp);


export default authRouter;