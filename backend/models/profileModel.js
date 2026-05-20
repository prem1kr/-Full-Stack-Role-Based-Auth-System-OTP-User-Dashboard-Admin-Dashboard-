import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({

    // IMPORTANT
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'auth',
        required: true,
        unique: true
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

    phone: {
        type: String,
        required: true,
        trim: true
    },

    address: {
        type: String,
        required: true,
        trim: true
    },

    pincode: {
        type: String,
        required: true,
        trim: true
    },

    course: {
        type: String,
        required: true,
        trim: true
    },

    branch: {
        type: String,
        required: true,
        trim: true
    },

    semester: {
        type: Number,
        required: true
    },

    rollNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }

}, { timestamps: true });

export default mongoose.model('profile', profileSchema);