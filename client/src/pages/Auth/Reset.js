import React, { useEffect, useState } from 'react';
import Styles from '../Auth/auth.module.css';
import Card from '../../components/card/Card';
import Header from '../../components/header/header';
import Footer from '../../components/footer/Footer';
import { Link, useNavigate, useParams } from "react-router-dom";

import PasswordInput from '../../components/passwordInput/PasswordInput';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RESET, resetPassword } from "../../redux/features/auth/authSlice";


const initialState = {
  password: '',
  password2: '',
};

function Reset() {
  const [formData, setFormData] = useState(initialState);
  const { password, password2 } = formData;
  const { resetToken } = useParams();
  console.log(resetToken);

  const { isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Password Strength Calculation
  const calculatePasswordStrength = (password) => {
    // Check length
   if (password.length < 8) {
     setPasswordStrength("Password is too short");
     return;
   }
 
   // Uppercase letters
   if (/[A-Z]/.test(password)) {
     // Lowercase letters
     if (/[a-z]/.test(password)) {
       // Numbers
       if (/\d/.test(password)) {
         // Special characters
         if (/[^A-Za-z0-9]/.test(password)) {
           setPasswordStrength("Strong password!");
         } else {
           setPasswordStrength("Include special characters");
         }
       } else {
         setPasswordStrength("Include numbers");
       }
     } else {
       setPasswordStrength("Include lowercase letters");
     }
   } else {
     setPasswordStrength("Include uppercase letters");
   }
 
   };

   const reset = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return toast.error("Password must be up to 6 characters");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      password,
    };

    await dispatch(resetPassword({ userData, resetToken }));
  };

  useEffect(() => {
    if (isSuccess && message.includes("Reset Successful")) {
      navigate("/login");
    }

    dispatch(RESET());
  }, [dispatch, navigate, message, isSuccess]);
   

  return (
    <>
      <Header />
      <div className={`container ${Styles.auth}`}>
        <Card>
          <p className="title">Reset Password</p>

          <form className="form" onSubmit={reset}>
            <PasswordInput
              placeholder="New Password"
              name="password"
              required
              value={password}
              onChange={handleInputChange}
              
            />

            <PasswordInput
              placeholder="Confirm password"
              name="password2"
              required
              value={password2}
              onChange={handleInputChange}
            />

            <button type="submit" className="form-btn">
              Reset Password
            </button>
          </form>

          <div className="logina" style={{ textAlign: 'right', display: 'flex', justifyContent: 'center', gap: '200px' }}>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
          </div>
        </Card>
      </div>
      <Footer />
    </>
  );
}

export default Reset;
