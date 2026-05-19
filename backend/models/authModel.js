import mongoose from 'mongoose';

const authSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    userName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
        default: null
    },
<<<<<<< HEAD
    otpExpire: {
=======
   otpExpire: {
>>>>>>> 23a7191f0bbae5bf523d691da255b0af7e0ec229
        type: Date,
        default: null
    },
    resetOtp: {
        type: String,
        default: null
    },
    restOtpExpire: {
        type: Date,
        default: null
    }

}, { timestamps: true });

export default mongoose.model('auth', authSchema);
