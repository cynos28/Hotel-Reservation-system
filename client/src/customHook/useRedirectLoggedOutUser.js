import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getLoginStatus } from "../redux/features/auth/authSlice";

const useRedirectLoggedOutUser = (path) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isLoggedIn, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getLoginStatus());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error("An error occurred while checking login status: " + message);
    }
  }, [isError, message]);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      toast.info("Session expired, please login to continue");
      navigate(path);
    }
  }, [isLoading, isLoggedIn, navigate, path]);
};

export default useRedirectLoggedOutUser;
