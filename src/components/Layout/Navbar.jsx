import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = ({ toggleSidebar }) => {
  const [roledata, setRoleData]= useState("")
    console.log(roledata)
  useEffect(()=>{
    const Role= localStorage.getItem("userRole")
     if(Role){
     setRoleData(Role)
     }else{
      setRoleData()
     }
  },[])

  return (
    <>
      <nav className="navbar pe-5 d-flex justify-content-end">
        <div className="navbar-left">
          <div className="navbar-logo">
            <span className="logo-text">Contruction</span>
          </div>
          <button onClick={toggleSidebar} className="toggle-button d-block d-md-none">
            <i className="fas fa-bars"></i>
          </button>
        </div>

        <div className="navbar-right">
          <div className="dropdown profile-dropdown d-none d-md-block">
            <div className="profile-trigger" data-bs-toggle="dropdown" aria-expanded="false">
              <div className="profile-info">
                <span className="profile-name">admin</span>
                <span className="profile-role">admin@gmail.com</span>
              </div>
              <div className="profile-avatar">
                <img src="https://i.ibb.co/6Jc9g6jF/user-11.jpg" alt="profile" />
              </div>
            </div>

            <ul className="dropdown-menu dropdown-menu-end profile-menu">
              <li>
                <Link  className="dropdown-item">
                  <i className="fas fa-user"></i>
                  <span>My Profile</span>
                </Link>
              </li>
              <li>
                <Link  className="dropdown-item">
                  <i className="fas fa-edit"></i>
                  <span>Update Profile</span>
                </Link>
              </li>
              <li>
                <Link  className="dropdown-item">
                  <i className="fas fa-lock"></i>
                  <span>Change Password</span>
                </Link>
              </li>
              <li><hr className="dropdown-divider"/></li>
              <li>
                <Link to="/" className="dropdown-item text-danger">
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;  