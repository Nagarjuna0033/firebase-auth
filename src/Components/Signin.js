import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import auth from "../Db/Sdk";
import Otp from "./Otp";

import authContext from "../Context/Authentication/AuthContext";

export default function Signin(props) {
    const authOp = useContext(authContext);
    const username = useRef();

    const {
        signInWithX,
        signInWithFacebook,
        signUpUserWithEmailAndPassword,
        signInWithGoogle,
        onSignInSubmit,
        phone,
        changePhone,
        enableOtp,
        showOtp,
    } = authOp;
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("uid")) {
            navigate("/Home");
        }
        props.changeOpt({
            palceholder: "Enter your email",
            class: "fa-phone",
            type: "email",
            value: "values.email",
        });
    }, []);

    const changeLogInOpt = () => {
        username.current.disabled = true;

        if (props.loginOpt.type === "email") {
            props.changeOpt({
                palceholder: "Enter your Phone",
                class: "fa-envelope",
                type: "tel",
                value: "values.tel",
            });
            props.changeInit({
                tel: "",
            });
            changePhone({
                isPhone: true,
                buttonText: "Send otp",
            });
        } else {
            username.current.disabled = false;

            props.changeOpt({
                placeholder: "Enter your email",
                class: "fa-phone",
                type: "email",
                value: "values.email",
            });
            props.changeInit({
                username: "",
                email: "",
                password: "",
            });
            changePhone({
                isPhone: false,
                buttonText: "Sign Up",
            });
        }
    };

    // const sendOtp = (e) => {

    //     reCaptcheVerifier();
    // };
    const goto = () => {
        navigate("/Signin");
        enableOtp(false);
    };

    return (
        <>
            <div className="wrapper _s0h13">
                {showOtp ? (
                    <Link to="/Signin">
                        <i
                            className="fa-solid fa-arrow-left  back"
                            id="back"
                            onClick={goto}
                        ></i>
                    </Link>
                ) : (
                    <Link to="/">
                        <i
                            className="fa-solid fa-arrow-left  back"
                            id="back"
                        ></i>
                    </Link>
                )}

                <div className="icon">
                    <i className="fa-solid fa-user sign-user"></i>
                </div>
                <div className="inner-wrapper">
                    <div
                        className="inputs _s0h23"
                        style={
                            showOtp ? { display: "none" } : { display: "block" }
                        }
                    >
                        <Formik
                            initialValues={props.init}
                            validate={(values) => {
                                const errors = {};
                                if (props.loginOpt.type === "email") {
                                    if (!values.email) {
                                        errors.email = "Email Required";
                                    } else if (
                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                            values.email
                                        )
                                    ) {
                                        errors.email = "Invalid email address";
                                    }
                                }
                                if (props.loginOpt.type === "email") {
                                    if (!values.password) {
                                        errors.password = "Password Required";
                                    } else if (values.password.length < 6) {
                                        errors.password =
                                            "password must be 6 letters";
                                    }
                                }

                                if (username.current.disabled === false) {
                                    if (!values.username) {
                                        errors.username = "Username Requried";
                                    }
                                }
                                if (props.loginOpt.type === "tel") {
                                    if (!values.tel) {
                                        errors.tel = "Phone Required";
                                    } else if (
                                        values.tel.length > 10 ||
                                        values.tel.length < 10
                                    ) {
                                        errors.tel = "Invalid phone number";
                                    }
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                    !phone.isPhone
                                        ? signUpUserWithEmailAndPassword(
                                              JSON.parse(
                                                  JSON.stringify(
                                                      values,
                                                      null,
                                                      2
                                                  )
                                              )
                                          )
                                        : onSignInSubmit(
                                              JSON.parse(
                                                  JSON.stringify(
                                                      values,
                                                      null,
                                                      2
                                                  )
                                              )
                                          );
                                    setSubmitting(false);
                                }, 400);
                            }}
                        >
                            {({
                                errors,
                                values,
                                handleChange,
                                handleSubmit,
                                handleBlur,
                                isSubmitting,
                                /* and other goodies */
                            }) => (
                                <form method="post" onSubmit={handleSubmit}>
                                    <div
                                        className="username"
                                        id="username"
                                        style={
                                            props.loginOpt.type === "tel"
                                                ? { display: "none" }
                                                : { display: "flex" }
                                        }
                                    >
                                        <label htmlFor="name">Username</label>
                                        <input
                                            placeholder="Enter Username"
                                            type="text"
                                            name="username"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.username}
                                            ref={username}
                                        />
                                    </div>
                                    <div className="email">
                                        <label htmlFor={props.loginOpt.type}>
                                            {props.loginOpt.type === "tel"
                                                ? "Phone"
                                                : "Email"}
                                        </label>
                                        <input
                                            placeholder={
                                                props.loginOpt.type === "tel"
                                                    ? "Enter your Phone"
                                                    : "Enter your Email"
                                            }
                                            type={props.loginOpt.type}
                                            name={props.loginOpt.type}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values[props.loginOpt.type]}
                                        />
                                    </div>
                                    <div
                                        className="password"
                                        style={
                                            props.loginOpt.type === "tel"
                                                ? { display: "none" }
                                                : { display: "flex" }
                                        }
                                    >
                                        <label htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            placeholder="Enter password"
                                            type="password"
                                            name="password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div className="error">
                                        {errors.username
                                            ? errors.username
                                            : errors.email
                                            ? errors.email
                                            : errors.password
                                            ? errors.password
                                            : errors.tel}
                                        {/* {errors.password} */}
                                    </div>
                                    <button
                                        className="register"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        {phone.isPhone ? "Send otp" : "Sign Up"}
                                    </button>
                                </form>
                            )}
                        </Formik>
                    </div>
                    <div
                        className="media"
                        style={
                            showOtp ? { display: "none" } : { display: "block" }
                        }
                    >
                        <h3>Or</h3>
                        <i
                            className="fa-brands fa-google options"
                            onClick={signInWithGoogle}
                        ></i>
                        <i
                            className="fa-brands fa-facebook options"
                            style={{ color: "#100dce" }}
                            onClick={signInWithFacebook}
                        ></i>
                        <i
                            className="fa-brands fa-x-twitter options"
                            onClick={signInWithX}
                        ></i>
                        <i
                            className={`fa-solid  ${props.loginOpt.class} options`}
                            onClick={changeLogInOpt}
                        ></i>
                        <h5>
                            Already have an account?{" "}
                            <Link className="link" to="/Login">
                                Login
                            </Link>
                        </h5>
                    </div>
                    <Otp />
                </div>
            </div>
            <div id="recaptche-container"></div>
        </>
    );
}
