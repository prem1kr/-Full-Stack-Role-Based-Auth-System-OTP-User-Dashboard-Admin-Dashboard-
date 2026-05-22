export const validateLogin = ({ email, password, }) => {

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email?.trim()) {
        return { success: false, message: "Email is required" };
    }
    if (!emailRegex.test(email)) {
        return { success: false, message: "Invalid email format" };
    }


    // Password 
    if (!password?.trim()) {
        return { success: false, message: "Password is required" };
    }
    if (password.length < 6) {
        return { success: false, message: "Password must be at least 6 characters" };
    }

    return { success: true };
};