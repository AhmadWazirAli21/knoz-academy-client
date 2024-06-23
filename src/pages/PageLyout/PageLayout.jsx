import React from 'react'
import {useNavigate,Link} from 'react-router-dom'
import { Outlet } from 'react-router-dom';
import { useState,useEffect } from 'react';
import logo from '../../assets/logo.png'
import { IoMdClose } from 'react-icons/io'
import { IoIosMenu } from 'react-icons/io'
import {FaCircleUser} from 'react-icons/fa6'
import './pageLayout.css'

function PageLayout() {

    const navigate = useNavigate()
    const [windowSize, setWindowSize] = useState(0);
    useEffect(() => {
      setWindowSize(window.screen.width);
    });
    
    const isRegistered = () => {
      return localStorage.getItem('knoz-user') ? true : false;
    }

   function closeMenu () {
        document.querySelector(".mob-screen-links").style.display = 'none'
        document.querySelector(".mob-screen-links").style.transition = '0.3s';
   } 
   function openMenu() {
     document.querySelector(".mob-screen-links").style.display = "flex";
   } 
  return (
    <>
      {windowSize > 670 ? (
        <header className="header">
          <div className="left-side">
            <img src={logo} alt="" className="logo" />
            <ul className="links">
              <li className="link">
                <Link to={"/"}>Home</Link>
              </li>
              <li className="link">
                <Link to="/courses">Courses</Link>
              </li>
              <li className="link">
                <Link>Kids-Courses</Link>
              </li>
              <li className="link">
                <Link to={"/contact"}>Contact-us</Link>
              </li>
            </ul>
          </div>
          {isRegistered() ? (
            <FaCircleUser
              color="#2b447c"
              size={18}
              onClick={() => navigate("/profile")}
              className="profile-icon"
            />
          ) : (
            <button
              className="login-btn"
              onClick={() => navigate("/account/login")}
            >
              Login
            </button>
          )}
        </header>
      ) : (
        <header className="mob-screen">
          <img src={logo} alt="" className="logo" />
          <ul className="mob-screen-links">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to="/courses">Courses</Link>
            </li>
            <li>
              <Link>Kids courses</Link>
            </li>
            <li>
              <Link to={"/contact"}>Contact us</Link>
            </li>
            {!isRegistered() ? (
              <Link to={"/account/login"} className="login-btn">
                Login
              </Link>
            ) : (
              <Link to={"/profile"} className="login-btn">
                Profile
              </Link>
            )}
            <button className="close-mob-menu" onClick={closeMenu}>
              <IoMdClose size={18} color="gray" />
            </button>
          </ul>
          <button onClick={openMenu} className="open-menu">
            <IoIosMenu size={30} color="gray" />
          </button>
        </header>
      )}
      <Outlet />
    </>
  );}

export default PageLayout
