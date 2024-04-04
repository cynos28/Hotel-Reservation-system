import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/users`;

// Register user
const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        if (error.response &&  "User already exists with this email.") {
            // Handle specific error for existing user
            throw new Error("User already exists with this email.");
        } else {
            // Handle other errors
            console.error("Error registering user:", error);
            throw new Error("Registration failed. Please try again.");
        }
    }
};

const authService = {
    register
};

export default authService;
