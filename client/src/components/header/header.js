import React from 'react';
import "./header.css";
import { FaHotel } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { RESET, logout } from '../../redux/features/auth/authSlice';
import { ShowOnLogin, ShowOnLogout } from '../protect/hiddenLink';
import { UserName } from '../../pages/Profile/Profile';
import { useDispatch } from "react-redux";
const activeLink = ({ isActive }) => (isActive ? "active" : "");

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const goHome = () => {
        navigate("/");
    };


    const logoutUser = async () => {
        dispatch(RESET());
        await dispatch(logout());
        navigate("/login");
    }
    return (
        <header className='header'>
            <nav>
                <div className="logo" onClick={goHome}>
                    <FaHotel size={35} color='#17D7A0' /> <span>The Heritage</span>
                </div>

                
                <ul className="home-links">
                    
                <div style={{ marginTop: "-10px" }}> <Link to="/" > <span>Home</span> </Link></div>
                <div style={{ marginTop: "-10px" }}> <Link to="/" > <span>Rooms</span> </Link></div>
                <div style={{ marginTop: "-10px" }}> <Link to="/" > <span>Services</span> </Link></div>
                <div style={{ marginTop: "-10px" }}> <Link to="/Gallery" > <span>Gallery</span> </Link></div>
                <div style={{ marginTop: "-10px" }}> <Link to="/contactUs" > <span>Contact Us</span> </Link></div>
                


                    <ShowOnLogout>
                        <li>
                            <Link to="/login" >
                                <button className="button-login">
                                    <svg className="svg-icon" fill="none" height="20" viewBox="0 0 20 20" width="20" >
                                        <g stroke="#206a5d" stroke-linecap="round" stroke-width="1.5">
                                            <path d="m3.33337 10.8333c0 3.6819 2.98477 6.6667 6.66663 6.6667 3.682 0 6.6667-2.9848 6.6667-6.6667 0-3.68188-2.9847-6.66664-6.6667-6.66664-1.29938 0-2.51191.37174-3.5371 1.01468"></path>
                                            <path d="m7.69867 1.58163-1.44987 3.28435c-.18587.42104.00478.91303.42582 1.0989l3.28438 1.44986"></path>
                                        </g>
                                    </svg>
                                    <span className="label"> Login </span>
                                </button>
                            </Link>
                        </li>
                    </ShowOnLogout>

                    <ShowOnLogin>
                        <li className='user'>
                            <FaCircleUser size={30} />
                            <UserName />
                        </li>
                    </ShowOnLogin>


                    <ShowOnLogin>
                        <li className='profile-button'>
                            <NavLink to="/profile" activeClassName={activeLink}>Profile</NavLink>
                        </li>
                    </ShowOnLogin>

                    <ShowOnLogin>
                        <li>
                            <button onClick={logoutUser} className='button-logout'>
                                Logout
                            </button>
                        </li>
                    </ShowOnLogin>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
