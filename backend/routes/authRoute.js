import express from 'express';
import { Login, resetPassword, resetPasswordemail, sendOtp, sendOtpEmail, Signup, verifyOtp, verifyOtpemail } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/signup', Signup);
authRouter.post('/login', Login);
authRouter.post('/send-otp/:id', sendOtp);
authRouter.post('/verify-otp/:id', verifyOtp);
authRouter.post('/reset-password/:id', resetPassword);
authRouter.post('/sendemail-otp', sendOtpEmail);
authRouter.post('/verifyemail-otp', verifyOtpemail);
authRouter.post('/reset-password-email', resetPasswordemail);


export default authRouter;