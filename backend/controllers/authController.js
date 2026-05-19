import authModel from "../models/authModel.js";
import bcrypt from 'bcryptjs';

export const Signup = async (req, res) => {
    try {
        const { userName, email, password, role } = req.body;

        if (!userName || !email || !password || !role) {
            console.log("All field required");
            return res.status(400).json({ success: false, message: "All field required" });
        }

        const ExistingUser = await authModel.findOne({ email });
        if (ExistingUser) {
            console.log("User Already Exist");
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
        return res.status(500).json({ success: true, message: "Signup successfully", error: error.message });
    }
}
