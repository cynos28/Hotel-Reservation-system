import React, { useEffect, useState } from "react";
import { GrInsecure } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import {
  loginWithCode,
  RESET,
  sendLoginCode,
} from "../../redux/features/auth/authSlice";
import Styles from "./auth.module.css";

const LoginWithCode = () => {
  const [loginCode, setLoginCode] = useState("");
  const { email } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );

  const sendUserLoginCode = async () => {
    await dispatch(sendLoginCode(email));
    await dispatch(RESET());
  };

  const loginUserWithCode = async (e) => {
    e.preventDefault();

    if (loginCode === "") {
      return toast.error("Please fill in the login code");
    }
    if (loginCode.length !== 6) {
      return toast.error("Access code must be 6 characters");
    }

    const code = {
      loginCode,
    };

    await dispatch(loginWithCode({ code, email }));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/profile");
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate]);

  return (


    <>  <Header />
        <div className={`container ${Styles.auth}`}>

            <Card>
                <p className="title">Enter Verification Code</p>


                <form className="form" onSubmit={loginUserWithCode}>

                    <input type="text" className="input" placeholder="Verification Code" name="LoginCode" required value={LoginCode} onChange={(e) => setLoginCode(e.target.value)} />
                    {/*<input type="password" className="input" placeholder="Password" name='password' required value={password} onChange={handleInputChange} /> */}

                    <button type='submit' className="form-btn">Proceed to login</button>
                    <p style={{ fontSize: "10px", alignItems: "center", marginTop: "-10px" }}>&nbsp; &nbsp; Check your email for Verification code</p>
                </form>


                <div className="logina" style={{ textAlign: 'right', display: 'flex', justifyContent: 'center', gap: '200px' }}>
                    <Link to="/" >Home</Link>
                    <p onClick={sendUserLoginCode} style={{ color: "#3468C0", fontWeight: "bold" }} >
                        <b>Resend Code</b>
                    </p>
                    
                </div>


            </Card>
        </div>
        <Footer />
    </>
)
};

export default LoginWithCode;
