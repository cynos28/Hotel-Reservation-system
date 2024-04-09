import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../redux/features/auth/authService";

const useRedirectLoggedOutUser = (path) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const redirectLoggedOutUser = async () => {
      try {
        const loggedIn = await authService.getLoginStatus();
        setIsLoggedIn(loggedIn);
      } catch (error) {
        console.log(error);
        toast.error("An error occurred while checking login status");
      }
    };

    redirectLoggedOutUser();
  }, []);

  useEffect(() => {
    if (isLoggedIn === false) {
      toast.info("Session expired, please login to continue");
      navigate(path);
    }
  }, [isLoggedIn, navigate, path]);
};

export default useRedirectLoggedOutUser;
