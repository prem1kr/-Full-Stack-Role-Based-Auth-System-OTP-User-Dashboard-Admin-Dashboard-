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
            return res.status(409).json({ success: false, message: `Email Alredy Exist , Please Use Differet Email` });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await authModel.create({
            role,
            userName,
            email,
            password: hashPassword
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

        const user = await authModel.findOne({ email });
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

        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: "none", maxAge: 7 * 24 * 60 * 60 * 1000 });
        console.log(req.cookies);
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
        const hashOtp = await bcrypt.hash(otp, 10);
        user.otp = hashOtp;
        user.otpExpire = Date.now() + 10 * 60 * 1000;
        await user.save();

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


export const resetPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;
        if (!password) {
            return res.status(400).json({ success: false, message: "Password filled required" });
        }

        const user = await authModel.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "user not found, Signup first" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ success: true, message: "password reset successfull" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }

}


export const sendOtpEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await authModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "user not found" });
        }

        const otp = (Math.floor(100000 + Math.random() * 900000)).toString();
        const hashOtp = await bcrypt.hash(otp, 10);
        user.otp = hashOtp;
        user.otpExpire = Date.now() + 10 * 60 * 1000;
        await user.save();

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


export const verifyOtpemail = async (req, res) => {
    try {
        const { email } = req.body;
        const { otp } = req.body;
        if (!otp) {
            return res.status(400).json({ success: false, message: "OTP required" });
        }

        const user = await authModel.findOne({ email });
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


export const resetPasswordemail = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!password) {
            return res.status(400).json({ success: false, message: "Password filled required" });
        }

        const user = await authModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "user not found, Signup first" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ success: true, message: "password reset successfull" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }

}


export const userData = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await authModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "user not found" });
        }
        const saferData = {
            userName: user.userName,
            email: user.email
        }

        return res.status(200).json({ success: true, message: "user fetched successfully", user: saferData });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
}


export const AllUser = async (req, res) => {
    try {
        const users = await authModel.find();
        if (!users) {
            return res.status(404).json({ success: false, message: "users not found" });
        }
        return res.status(200).json({ success: true, message: "users fetched successfully", users });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error", error: error.message })
    }
}