import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export const adminAuth = async (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        console.log(authHeader);

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        const token = authHeader.split(" ")[1];

        console.log(token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decoded);

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