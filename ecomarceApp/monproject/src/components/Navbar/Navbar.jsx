import React, { useState, useEffect, useContext, use } from "react";
import Style from "./Navbar.module.css";
import logo from "../../assets/images/freshcart-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Navbar() {
  const [counter, setCounter] = React.useState(0);
  const { userLoggedIn, setUserLoggedIn } = useContext(UserContext);
  let navigate = useNavigate();
  useEffect(() => {}, []);
  function logOut() {
    localStorage.removeItem("token");
    setUserLoggedIn(null);
    navigate("/login");
  }
  return (
    <>
      <nav className="bg-main-light z-50 static lg:fixed top-0 left-0 right-0">
        <div className="container flex justify-between items-center mx-auto py-4">
          <div className="flex flex-col xl:flex-row">
            <NavLink to="/"><img src={logo} width={120} alt="Logo" /></NavLink>
            <ul className="flex flex-col lg:flex-row items-center justify-around m-0 pl-10">
              
              {userLoggedIn !== null ?<>
              <li className="text-md mx-4 text-slate-900 font-normal ">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="text-md mx-4 text-slate-900 font-normal">
                <NavLink to="/cart">Cart</NavLink>
              </li>
              <li className="text-md mx-4 text-slate-900 font-normal">
                <NavLink to="/product">Products</NavLink>
              </li>
              <li className="text-md mx-4 text-slate-900 font-normal">
                <NavLink to="/categories">Categories</NavLink>
              </li>
              <li className="text-md mx-4 text-slate-900 font-normal">
                <NavLink to="/brands">Brands</NavLink>
              </li>
              </>:null }
              
              
            </ul>
          </div>
          <div>
            <ul className="flex flex-col lg:flex-row items-center justify-around m-0 pl-10">

            {userLoggedIn === null ?<>
            <li className="text-md mx-4 text-slate-900 font-normal">
                <NavLink to="/login">Login</NavLink>
              </li>
              <li className="text-lg mx-4 text-slate-900 font-normal">
                <NavLink to="/register">Register</NavLink>
              </li>
            </>: <li onClick={logOut} className="text-md mx-4 text-slate-900 font-normal">
                <NavLink to="/" >Logout</NavLink>
              </li>}

              
              
              <li className="text-md mx-4 text-slate-900 font-normal items-center">
                <i className="fab fa-facebook mx-2 fa-sm"></i>
                <i className="fab fa-twitter mx-2 fa-sm"></i>
                <i className="fab fa-instagram mx-2 fa-sm"></i>
                <i className="fab fa-tiktok mx-2 fa-sm"></i>
                <i className="fab fa-youtube mx-2 fa-sm"></i>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
