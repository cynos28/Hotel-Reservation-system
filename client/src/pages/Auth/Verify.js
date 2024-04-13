import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams ,useNavigate } from "react-router-dom";
// import Loader from "../../components/loader/Loader";
import { RESET, verifyUser } from "../../redux/features/auth/authSlice";

const Verify = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { verificationToken } = useParams();

  const { isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const verifyAccount = async () => {
    await dispatch(verifyUser(verificationToken));
    
  };

  useEffect(() => {
    if (isSuccess && message.includes("Verification Successful")) {
      navigate("/profile");
    }

  }, [dispatch, navigate, message, isSuccess]);

  return (
    <section>
      {/* {isLoading && <Loader />} */}
      <div className="--center-all">
        <h2>Account Verification</h2>
        <p>To verify your account, click the button below...</p>
        <br />
        <button onClick={verifyAccount} className="--btn --btn-primary">
          Verify Account
        </button>
      </div>
    </section>
  );
};

export default Verify;
