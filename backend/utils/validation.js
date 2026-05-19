export const validateName = (name) => {

    if (!name.trim()) {
        return { success: false, message: "Name is required" };
    }

    if (name.length < 3) {
        return { success: false, message: "Name must be at least 3 characters" };
    }

    return { success: true };
};


export const validateEmail = (email) => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
        return { success: false, message: "Email is required" };
    }

    if (!emailRegex.test(email)) {
        return { success: false, message: "Invalid email format" };
    }

    return { success: true };
};


export const validatePassword = (password) => {

    if (!password.trim()) {
        return { success: false, message: "Password is required" };
    }

    if (password.length < 6) {
        return { success: false, message: "Password must be at least 6 characters" };
    }

    return { success: true };
};

