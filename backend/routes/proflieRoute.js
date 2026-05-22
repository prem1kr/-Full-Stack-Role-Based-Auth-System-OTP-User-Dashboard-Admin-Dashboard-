import express from "express";
import { createProfile, deleteProfile, getAllProfiles, getProfile, updateProfile } from "../controllers/profileController.js";
import { adminAuth } from "../middleware/admin.js";

const profileRouter = express.Router();

profileRouter.post('/add-profile', createProfile);
profileRouter.get('/all-profile', adminAuth, getAllProfiles);
profileRouter.get("/get-profile/:id", getProfile);
profileRouter.put("/update-profile/:id", updateProfile);
profileRouter.delete("/delete-profile/:id", deleteProfile);

export default profileRouter;
