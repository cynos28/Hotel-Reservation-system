import React, { useEffect, useState } from 'react';
import Styles from '../Auth/auth.module.css';
import Card from '../../components/card/CardR';
import Header from '../../components/header/header';
import Footer from '../../components/footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/passwordInput/PasswordInput';
import { toast } from 'react-toastify';
import { register, RESET, sendVerificationEmail } from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from '../../components/loader/Loader';
import { validateEmail } from "../../redux/features/auth/authService";

const initialState = {
  name: '',
  email: '',
  password: '',
  password2: '',
};

function Register() {
  const [formData, setFormData] = useState(initialState);
  const [passwordStrength, setPasswordStrength] = useState('');

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isLoggedIn, isSuccess, message } = useSelector((state) => state.auth);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
    setFormData({ ...formData, [name]: value });
  };

  const registerUser = async (e) => {
    e.preventDefault(); 
    console.log('Registering...', { name, email, password, password2 });

    if (!name || !email || !password || !password2) {
      return toast.error("All fields are required");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email"); }


    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }

    const userData = {
      name, email, password
    };

    await dispatch(register(userData));
    await dispatch(sendVerificationEmail());
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate('/profile');
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate]);

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

  return (
    <>
      <Header />
      <div className={`container ${Styles.auth}`}>
        {isLoading && <Loader />}
        <Card>
          <p className="title">Create an account</p>
          <form className="form" onSubmit={registerUser}>
            <input
              type="text"
              className="input"
              placeholder="Name"
              name="name"
              required
              value={name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              className="input"
              placeholder="Email"
              name="email"
              required
              value={email}
              onChange={handleInputChange}
            />
            <PasswordInput
              placeholder="Password"
              name="password"
              required
              value={password}
              onChange={handleInputChange}
              strength={passwordStrength}
            />
            <PasswordInput
              placeholder="Confirm password"
              name="password2"
              required
              value={password2}
              onChange={handleInputChange}
              onPaste={(e) => {
                e.preventDefault();
                toast.error("Cannot paste into input field");
              }}
            />
            <p className="page-link"></p>
            <button type="submit" className="form-btn">
              Sign up
            </button>
          </form>
          <p className="sign-up-label">
            Already have an account?
            <span className="sign-up-link">
              <Link to="/login">Log in</Link>
            </span>
          </p>
          <div><br /></div>
          <Link to="/">Home</Link>
        </Card>
      </div>
      <Footer />
    </>
  );
}

export default Register;
