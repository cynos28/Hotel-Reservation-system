import React from "react";

import { NavLink, Navigate, useNavigate } from "react-router-dom";
import navLinks from "../../assets/dummy-data/navLinks";
import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { RESET ,logout} from "../../../redux/features/auth/authSlice";



const Sidebar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const logoutUser = async () => {
    dispatch(RESET());
    dispatch(logout());
    navigate("/login"); // Navigate to login page after logout
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h2>
          <span>
            <i class="ri-hotel-fill"></i>
          </span>{" "}
           Heritage
        </h2>
      </div>  

      <div className="sidebar__content">
        <div className="menu">
          <ul className="nav__list">
            {navLinks.map((item, index) => (
              <li className="nav__item" key={index}>
                <NavLink
                  to={item.path}
                  className={(navClass) =>
                    navClass.isActive ? "nav__active nav__link" : "nav__link"
                  }
                >
                  <i className={item.icon}></i>

                  {item.display}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar__bottom">

        <li>
            <button onClick={logoutUser} className="button-logout">
              <span>
                <i className="ri-logout-circle-r-line"></i> Logout
              </span>
            </button>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
