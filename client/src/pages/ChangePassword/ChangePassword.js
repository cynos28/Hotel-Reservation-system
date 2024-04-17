import React, { useState } from 'react';

import Card from '../../components/card/Card';
import PasswordInput from '../../components/passwordInput/PasswordInput';
import './ChangePassword.css';
import PageMenu from '../../components/pageMenu/PageMenu';
import { changePassword, RESET, logout } from '../../redux/features/auth/authSlice';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";

import { sendAutomatedEmail } from "../../redux/features/email/emailSlice";

const initialState = {
    oldPassword: '',
    password: '',
    password2: '',
};

function ChangePassword() {
    useRedirectLoggedOutUser("/login");
    const [formData, setFormData] = useState(initialState);
    const { oldPassword, password, password2 } = formData;

    const { isLoading, user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        // You should update the state here based on the input changes
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const updatePassword = async (e) => {
        e.preventDefault();

        if (!oldPassword || !password || !password2) {
            return toast.error("All fields are required");
        }

        if (password !== password2) {
            return toast.error("Passwords do not match");
        }

        const userData = {
            oldPassword,
            password,
        };

        const emailData = {
            subject: "Password Changed - The Heritage",
            send_to: user.email,
            reply_to: "noreply@heritage.com",
            template: "changePassword",
            url: "/forgot",
        };


        // After updating password and sending email, clear the form and navigate to login page
        await dispatch(changePassword(userData));
        await dispatch(sendAutomatedEmail(emailData));
        await dispatch(logout());
        await dispatch(RESET(userData));
        navigate("/login");
    };
    return (
        <>
            <section>
                <PageMenu />

                <h2 style={{ marginLeft: "300px" }}>Change Password</h2>
                <div className="container " style={{ width: "500px", marginTop: "20px", justifyContent: "center" }}>
                    <div className="profile">
                        <Card cardClass={'card'} style={{}}>
                            <>
                                <form style={{ marginLeft: "-30px" }} onSubmit={updatePassword}>
                                    <p>
                                        <label>Current Password:</label>
                                        <PasswordInput
                                            placeholder="Current password"
                                            name="oldPassword"
                                            required
                                            value={oldPassword}
                                            onChange={handleInputChange}
                                        />
                                    </p>

                                    <p>
                                        <label>New Password:</label>
                                        <PasswordInput
                                            placeholder="New password"
                                            name="password"
                                            required
                                            value={password}
                                            onChange={handleInputChange}
                                        />
                                    </p>

                                    <p>
                                        <label>Confirm Password:</label>
                                        <PasswordInput
                                            placeholder="Confirm password"
                                            name="password2"
                                            required
                                            value={password2}
                                            onChange={handleInputChange}
                                        />
                                    </p>

                                    <button
                                        type="submit"
                                        className="form-btn"
                                        style={{ display: 'block', marginLeft: '40px', width: '280px' }}
                                    >
                                        Update
                                    </button>
                                </form>
                            </>
                        </Card>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ChangePassword;
