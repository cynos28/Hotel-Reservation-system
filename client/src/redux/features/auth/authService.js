import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/users`;

// Validate email
export const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// Register user
const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data.error === "User already exists with this email.") {
            // Handle specific error for existing user
            throw new Error("User already exists with this email.");
        } else {
            // Handle other errors
            console.error("Error registering user:", error);
            throw new Error("Registration failed. Please try again.");
        }
    }
};


// Login User
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};
  
  // Logout User
  const logout = async () => {
    try {
      const response = await axios.get(`${API_URL}logout`);
      return response.data.message;
    } catch (error) {
      throw error.response.data.message;
    }
  };
  
  // Get Login Status
  const getLoginStatus = async () => {
    try {
      const response = await axios.get(`${API_URL}loginStatus`);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };
  
  // GetUser
  const getUser = async () => {
    try {
      const response = await axios.get(`${API_URL}getUser`);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };
  
  // Update profile
  const updateUser = async (userData) => {
    try {
      const response = await axios.patch(`${API_URL}updateUser`, userData);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };
  
  // Send Verification Email
  const sendVerificationEmail = async () => {
    try {
      const response = await axios.post(`${API_URL}sendVerificationEmail`);
      return response.data.message;
    } catch (error) {
      throw error.response.data.message;
    }
  };
  
  // Verify User
  const verifyUser = async (verificationToken) => {
    try {
      const response = await axios.patch(`${API_URL}verifyUser/${verificationToken}`);
      return response.data.message;
    } catch (error) {
      throw error.response.data.message;
    }
  };
  
  // Change Password
  const changePassword = async (userData) => {
    try {
      const response = await axios.patch(`${API_URL}changePassword`, userData);
      return response.data.message;
    } catch (error) {
      throw error.response.data.message;
    }
  };
  
  // Reset Password
  const resetPassword = async (userData, resetToken) => {
    try {
      const response = await axios.patch(`${API_URL}resetPassword/${resetToken}`, userData);
      return response.data.message;
    } catch (error) {
      throw error.response.data.message;
    }
  };
  
  // Forgot Password
  const forgotPassword = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}forgotPassword`, userData);
      return response.data.message;
    } catch (error) {
      throw error.response.data.message;
    }
  };
  
  // Get Users
  const getUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}getUsers`);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };
  
  // Delete User
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}${id}`);
      return response.data.message;
    } catch (error) {
      throw error.response.data.message;
    }
  };
  
  // Upgrade User
  const upgradeUser = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}upgradeUser`, userData);
      return response.data.message;
    } catch (error) {
      throw error.response.data.message;
    }
  };
  
  // Send Login Code
  const sendLoginCode = async (email) => {
    try {
      const response = await axios.post(`${API_URL}sendLoginCode/${email}`);
      return response.data.message;
    } catch (error) {
      throw error.response.data.message;
    }
  };
  
  // Login With Code
  const loginWithCode = async (code, email) => {
    try {
      const response = await axios.post(`${API_URL}loginWithCode/${email}`, code);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };
  
  // Login With Google
  const loginWithGoogle = async (userToken) => {
    try {
      const response = await axios.post(`${API_URL}google/callback`, userToken);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };
  

const authService = {
    register,
    login,
    logout,
    getLoginStatus,
    getUser,
    updateUser,
    sendVerificationEmail,
    verifyUser,
    changePassword,
    forgotPassword,
    resetPassword,
    getUsers,
    deleteUser,
    upgradeUser,
    sendLoginCode,
    loginWithCode,
    loginWithGoogle,
};

export default authService;
