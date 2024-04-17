import React, { useState } from 'react';
import Styles from '../Auth/auth.module.css'
import Card from '../../components/card/Card'
import Header from '../../components/header/header'
import Footer from '../../components/footer/Footer'
import { validateEmail } from "../../redux/features/auth/authService";
import { forgotPassword, RESET } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { Link } from 'react-router-dom'
import PasswordInput from '../../components/passwordInput/PasswordInput';

const Forgot = () => {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const { isLoading } = useSelector((state) => state.auth);

   
  const forgot = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Please enter an email");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
    };

    await dispatch(forgotPassword(userData));
    await dispatch(RESET(userData));
  };
  return (
        <>  <Header />
            <div className={`container ${Styles.auth}`}>

                <Card>
                    <p className="title">Forgot Password</p>


                    <form className="form" onSubmit={forgot}>

                        <input type="email" className="input" placeholder="Email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                        {/*<input type="password" className="input" placeholder="Password" name='password' required value={password} onChange={handleInputChange} /> */}
                    
                        <button type='submit' className="form-btn">Send an email</button>
                    </form>


                    <div className="logina" style={{ textAlign: 'right', display: 'flex', justifyContent: 'center', gap: '200px' }}>
                        <Link to="/" >Home</Link>
                        <Link to="/login" >Login</Link>
                    </div>


                </Card>
            </div>
            <Footer />
        </>
    )
}

export default Forgot