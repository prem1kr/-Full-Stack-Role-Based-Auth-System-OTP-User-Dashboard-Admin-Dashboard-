import authModel from "../models/authModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendEmail } from "../utils/sendEmail.js";


export const Signup = async (req, res) => {
    try {
        const { userName, email, password, role } = req.body;

        if (!userName || !email || !password || !role) {
            return res.status(400).json({ success: false, message: "All field required" });
        }

        const ExistingUser = await authModel.findOne({ email });
        if (ExistingUser) {
            return res.status(409).json({ success: false, message: `Email - ${email} Alredy Exist , Please Use Differet Email` });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await authModel.create({
            role,
            userName,
            email,
            password :hashPassword
        });

        const saferData = {
            role: user.role,
            userName: user.userName,
            email: user.email,
            id: user._id
        }

        return res.status(201).json({ success: true, message: "user successfully created", user: saferData });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: true, message: "Server Error", error: error.message });
    }
}


export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All field required" });
        }

        const user = await authModel.findOne({ email }).select('password');
        if (!user) {
            return res.status(404).json({ success: false, message: `${email} not found, Signup first` });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invailed password" });
        }

        if (!user.isVerified) {
            return res.status(403).json({ success: false, message: "user not verified" });
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        const saferData = {
            id: user._id,
            email: user.email,
            role: user.role,
            userName: user.userName
        }

        return res.status(200).json({ success: true, message: "Login successfull", user: saferData, token });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
}


export const sendOtp = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await authModel.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "user not found" });
        }

        const otp = (Math.floor(100000 + Math.random() * 900000)).toString();
        // const hashOtp = await bcrypt.hash(otp, 10);

        user.otp = otp;
        user.optExpire = Date.now() + 10 * 60 * 1000;
        await user.save();

        // send otp service with await
        await sendEmail({
            to: user.email,
            subject: "Yout Verification Code",
            text: `Yout OTP is ${otp}. Its expire in 10 minutes.`
        });

        return res.status(200).json({ success: true, message: "opt successfully sended" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
}


export const verifyOtp = async (req, res) => {
    try {
        const { id } = req.params;
        const { otp } = req.body;
        if (!otp) {
            return res.status(400).json({ success: false, message: "OTP required" });
        }

        const user = await authModel.findById(id);
        if (!user || !user.otp) {
            return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
        }

        if (!user.otpExpire || user.otpExpire < Date.now()) {
            user.otp = null,
            user.otpExpire = null,
            await user.save();
            return res.status(400).json({ success: false, message: "OTP Expired" });
        }

        const isValid = await bcrypt.compare(otp, user.otp);
        if (!isValid) {
            return res.status(400).json({ success: false, message: "Invalid otp" });
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpire = null;
        await user.save();

        const saferData = {
            id: user._id,
            userName: user.userName,
            email: user.email,
            role: user.role
        }

        return res.status(200).json({ success: true, message: "Account verified", user: saferData });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
}
