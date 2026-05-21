import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export const adminAuth = async (req, res, next) => {
    try {

        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token found"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Admin access only"
            });
        }

        req.user = decoded;

        next();

    } catch (error) {


        console.log(error);

        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }
}