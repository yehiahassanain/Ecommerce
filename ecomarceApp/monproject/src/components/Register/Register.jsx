import React, { useState, useEffect, useContext } from "react";
import Style from "./Register.module.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";
export default function Register() {
  const { setUserLoggedIn } = useContext(UserContext);
  // const [counter, setCounter] = React.useState(0);

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, "Name must be at least 4 characters")
      .max(10, "Name must be at most 10 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid phone number")
      .required("Phone is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z]{5,10}$/, "Invalid password")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  useEffect(() => {}, []);
  let navigate = useNavigate();
  const [apiRessponse, setApiRessponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister(FormValues) {
    setIsLoading(true);
    console.log("Form Values : ", FormValues);
    await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, FormValues)
      .then((response) => {
        if (response.data.message === "success") {
          localStorage.setItem("userToken", response.data.token);
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
          error?.response?.data?.message ||
            "An error occurred during registration",
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
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: handleRegister,
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

        <h2 className="text-3xl font-bold text-green-600 mb-6">Register Now</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-10 group">
            <input
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              name="name"
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="name"
              className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Enter Your Name :
            </label>

            {formik.errors.name && formik.touched.name ? (
              <div
                className="p-4 my-1 text-sm text-fg-danger-strong rounded-2xl bg-red-100"
                role="alert"
              >
                {formik.errors.name}
              </div>
            ) : null}
          </div>

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
              type="tel"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="phone"
              className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Enter Your Phone Number :
            </label>
            {formik.errors.phone && formik.touched.phone ? (
              <div
                className="p-4 my-1 text-sm text-fg-danger-strong rounded-2xl bg-red-100"
                role="alert"
              >
                {formik.errors.phone}
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

          <div className="relative z-0 w-full mb-10 group">
            <input
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rePassword}
              name="rePassword"
              id="rePassword"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="rePassword"
              className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Re-enter Your Password :
            </label>
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div
                className="p-4 my-1 text-sm text-fg-danger-strong rounded-2xl bg-red-100"
                role="alert"
              >
                {formik.errors.rePassword}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="text-white bg-green-600 box-border border-2 border-transparent hover:bg-green-600-strong focus:ring-4 focus:ring-green-600-medium shadow-xs font-medium leading-5 rounded-2xl text-sm px-4 py-2.5 focus:outline-none"
          >
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
}
