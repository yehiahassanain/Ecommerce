import React, { useState, useEffect, useContext } from "react";
import Style from "./Login.module.css";
import { useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
  const { setUserLoggedIn } = useContext(UserContext);
  // const [counter, setCounter] = React.useState(0);

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z]{5,10}$/, "Invalid password")
      .required("Password is required"),
  });

  useEffect(() => {}, []);
  let navigate = useNavigate();
  const [apiRessponse, setApiRessponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(FormValues) {
    setIsLoading(true);
    console.log("Form Values : ", FormValues);
    await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, FormValues)
      .then((response) => {
        if (response.data.message === "success") {
          localStorage.setItem("token", response.data.token);
          setUserLoggedIn(response.data.token);
          setIsLoading(false);
          setApiRessponse(response.data.message);
          navigate("/");
        }

        // console.log("Response : ", response.data.message);
      })
      .catch((error) => {
        setIsLoading(false);
        setApiRessponse(
          error?.response?.data?.message || "An error occurred during login",
        );
        // console.log("Error : ", error?.response?.data?.message);
      });
  }

  // function myvalidate(FormValues) {
  //   let errors = {};
  //   if (!FormValues.name) {
  //     errors.name = "Name is required";
  //   } else if (!/^[A-Z][a-z]{3,5}$/.test(FormValues.name)) {
  //     errors.name =
  //       "Name must start with capital letter and be 4-6 characters long";
  //   }
  //   if (!FormValues.email) {
  //     errors.email = "Email is required";
  //   } else if (
  //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(FormValues.email)
  //   ) {
  //     errors.email = "Invalid email address";
  //   }
  //   return errors;
  // }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: handleLogin,
  });
  return (
    <>
      <div className="max-w-xl mx-auto py-6">
        {apiRessponse ? (
          <div
            className="p-4 my-1 text-sm text-fg-danger-strong rounded-2xl bg-red-100"
            role="alert"
          >
            {apiRessponse}
          </div>
        ) : null}

        <h2 className="text-3xl font-bold text-green-600 mb-6">Login Now</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-10 group">
            <input
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Enter Your Email Address :
            </label>

            {formik.errors.email && formik.touched.email ? (
              <div
                className="p-4 my-1 text-sm text-fg-danger-strong rounded-2xl bg-red-100"
                role="alert"
              >
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          <div className="relative z-0 w-full mb-10 group">
            <input
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Enter Your Password :
            </label>
            {formik.errors.password && formik.touched.password ? (
              <div
                className="p-4 my-1 text-sm text-fg-danger-strong rounded-2xl bg-red-100"
                role="alert"
              >
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div className="flex items-center">
            <button
              type="submit"
              className="text-white bg-green-600 box-border border-2 border-transparent hover:bg-green-600-strong focus:ring-4 focus:ring-green-600-medium shadow-xs font-medium leading-5 rounded-2xl text-sm px-4 py-2.5 focus:outline-none"
            >
              {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
            </button>
            <p className="pl-4">
              didn't have account yet ?{" "}
              <span className="font-semibold">
                <NavLink to="/register">Register Now</NavLink>
              </span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
