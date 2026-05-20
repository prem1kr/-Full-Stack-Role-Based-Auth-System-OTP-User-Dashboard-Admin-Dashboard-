import profileModel from "../models/profileModel.js";

export const createProfile = async (req, res) => {
    try {
        const { userName, email, phone, address, pincode, course, branch, semester, rollNumber } = req.body;

        if (!userName || !email || !phone || !address || !pincode || !course || !branch || !semester || !rollNumber) {
            return res.status(400).json({ success: false, message: "All fields required" });
        }

        const existingProfile = await profileModel.findOne({
            $or:
                [{ email }, { rollNumber }]
        });

        if (existingProfile) {
            return res.status(409).json({ success: false, message: "Profile already exists" });
        }

        const profile = await profileModel.create({
            userName,
            email,
            phone,
            address,
            pincode,
            course,
            branch,
            semester,
            rollNumber
        });

        return res.status(201).json({ success: true, message: "Profile created successfully", profile });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};



export const getAllProfiles = async (req, res) => {
    try {
        const profiles = await profileModel.find();
        if(!profile){
            return res.status(404).json({success:false, message:"profile data not found"});
        }
        return res.status(200).json({ success: true, total: profiles.length, profiles });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};



export const getProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await profileModel.findById(id);

        if (!profile) {
            return res.status(404).json({ success: false, message: "Profile not found" });
        }

        return res.status(200).json({ success: true, profile });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};



// UPDATE PROFILE
export const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { phone, address, pincode, course, branch, semester, rollNumber } = req.body;

        const profile = await profileModel.findById(id);
        if (!profile) {
            return res.status(404).json({ success: false, message: "Profile not found" });
        }

        const profiles = await findByIdAndUpdate(id,{
            phone,
            address,
            pincode,
            course,
            branch,
            semester,
            rollNumber
        },
        {new:true}
        )

        return res.status(200).json({ success: true, message: "Profile updated successfully", profiles });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};



// DELETE PROFILE
export const deleteProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await profileModel.findById(id);
        if (!profile) {
            return res.status(404).json({ success: false, message: "Profile not found" });
        }

        await profileModel.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Profile deleted successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};