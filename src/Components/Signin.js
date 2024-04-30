import React, { useState } from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import auth from "../Db/Sdk";
import db from "../Db/Db";
import { createUserWithEmailAndPassword } from "firebase/auth";
export default function Signin() {
    const signUpUser = (e) => {
        createUserWithEmailAndPassword(auth, e.email, e.password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                console.log(user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMsg = error.message;
                // ..
                console.log("Code :" + errorCode);
                console.log("Msg :" + errorMsg);
            });
    };

    return (
        <>
            <div className="wrapper _s0h13">
                <Link to="/">
                    <i className="fa-solid fa-arrow-left  back" id="back"></i>
                </Link>
                <div className="icon">
                    <i className="fa-solid fa-user sign-user"></i>
                </div>
                <div className="inner-wrapper">
                    <div className="inputs _s0h23">
                        <Formik
                            initialValues={{
                                username: "",
                                email: "",
                                password: "",
                            }}
                            validate={(values) => {
                                const errors = {};
                                if (!values.email) {
                                    errors.email = "Email Required";
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                        values.email
                                    )
                                ) {
                                    errors.email = "Invalid email address";
                                }
                                if (!values.password) {
                                    errors.password = "Password Required";
                                } else if (values.password.length < 6) {
                                    errors.password =
                                        "password must be 6 letters";
                                }

                                if (!values.username) {
                                    errors.username = "Username Requried";
                                }

                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                    signUpUser(
                                        JSON.parse(
                                            JSON.stringify(values, null, 2)
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
                                    <div className="username">
                                        <label htmlFor="name">Username</label>
                                        <input
                                            type="text"
                                            name="username"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.username}
                                        />
                                    </div>
                                    <div className="email">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                        />
                                    </div>
                                    <div className="password">
                                        <label htmlFor="password">
                                            Password
                                        </label>
                                        <input
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
                                            : errors.password}
                                        {/* {errors.password} */}
                                    </div>
                                    <button
                                        className="register"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        Sign Up
                                    </button>
                                </form>
                            )}
                        </Formik>
                    </div>
                    <div className="media">
                        <h3>Or</h3>
                        <i className="fa-brands fa-google options"></i>
                        <i
                            className="fa-brands fa-facebook options"
                            style={{ color: "#100dce" }}
                        ></i>
                        <i className="fa-brands fa-x-twitter options"></i>
                        <i className="fa-solid fa-phone options"></i>
                        <h5>
                            Already have an account?{" "}
                            <Link className="link" to="/Login">
                                Login
                            </Link>
                        </h5>
                    </div>
                </div>
            </div>
        </>
    );
}
