import jwt from 'jsonwebtoken';
import authModel from '../models/authModel.js';

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.header('Authorization')?.replace('Bearer', '') || req.body.token;
        if (!token) {
            return res.status(401).json({ success: false, message: "Token not found" });
            req.user = null;
            return next();
        }

        let payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await authModel.findById(payload.id || payload._id).select('password');
        console.log(user);
        if(!user){
            return res.status(404).json({success:false, message:"user not found"});
            req.user = user;
            next();
        }

    } catch (error) {
        console.log(error);
    }
}