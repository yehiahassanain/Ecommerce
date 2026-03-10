import React, { useState, useEffect } from "react";
import Style from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function Layout() {
  const [counter, setCounter] = React.useState(0);
  useEffect(() => {}, []);
  return (
    <>
      <Navbar />
      <div className="container py-10 ">
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  );
}
