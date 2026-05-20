import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({

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
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

},{timestamps:true});

export default mongoose.model('profile',profileSchema);