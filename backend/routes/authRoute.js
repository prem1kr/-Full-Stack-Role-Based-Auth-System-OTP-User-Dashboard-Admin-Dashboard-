import express from 'express';
import { Login, resetPassword, sendOtp, Signup, verifyOtp } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/signup', Signup);
authRouter.post('/login', Login);
authRouter.post('/send-otp/:id', sendOtp);
authRouter.post('/verify-otp/:id', verifyOtp);
authRouter.post('/reset-password/:id', resetPassword);


export default authRouter;