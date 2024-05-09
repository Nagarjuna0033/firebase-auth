import React, { useContext, useEffect } from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Otp from "./Otp";
import authContext from "../Context/Authentication/AuthContext";
export default function Login(props) {
    const authOp = useContext(authContext);

    const {
        loginUserWithEmailAndPassword,
        onSignInSubmit,
        signInWithGoogle,
        signInWithFacebook,
        signInWithX,
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
    }, []);
    const toggle = () => {
        if (props.fieldOpt.type === "email") {
            props.changeFieldOpt({
                palceholder: "Enter your Phone number",
                class: "fa-envelope",
                type: "tel",
                value: "values.tel",
            });
            props.changeFieldInit({
                tel: "",
            });
            changePhone({
                isPhone: true,
                buttonText: "Send OTP",
            });
        } else {
            props.changeFieldOpt({
                palceholder: "Enter your Email",
                class: "fa-phone",
                type: "email",
                value: "values.email",
            });
            props.changeFieldInit({
                email: "",
                password: "",
            });
            changePhone({
                isPhone: false,
                buttonText: "Log In",
            });
        }
    };
    const goto = () => {
        navigate("/Login");
        enableOtp(false);
    };

    return (
        <>
            <div className="wrapper _s0h13">
                {showOtp ? (
                    <Link to="/Login">
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
                    <i class="fa-solid fa-user" id="login-user"></i>
                </div>
                <div className="inner-wrapper" id="login-wrapper">
                    <div
                        className="inputs _s0h23"
                        style={
                            showOtp ? { display: "none" } : { display: "block" }
                        }
                    >
                        <Formik
                            initialValues={props.fieldInit}
                            validate={(values) => {
                                const errors = {};
                                if (props.fieldOpt.type === "email") {
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
                                if (props.fieldOpt.type === "tel") {
                                    if (!values.tel) {
                                        errors.tel = "Phone Required";
                                    } else if (
                                        values.tel.length > 10 ||
                                        values.tel.length < 10
                                    ) {
                                        errors.tel = "Invalid phone number";
                                    }
                                }
                                if (props.fieldOpt.type === "email") {
                                    if (!values.password) {
                                        errors.password = "Password Required";
                                    } else if (values.password.length < 6) {
                                        errors.password =
                                            "password must be 6 letters";
                                    }
                                }

                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                    !phone.isPhone
                                        ? loginUserWithEmailAndPassword(
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
                                    <div className="email">
                                        <label htmlFor="email">
                                            {props.fieldOpt.type === "tel"
                                                ? "Phone"
                                                : "Email"}
                                        </label>
                                        <input
                                            placeholder={
                                                props.fieldOpt.type === "tel"
                                                    ? "Enter your Phone"
                                                    : "Enter your Email"
                                            }
                                            type={props.fieldOpt.type}
                                            name={props.fieldOpt.type}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values[props.fieldOpt.type]}
                                        />
                                    </div>
                                    <div
                                        className="password"
                                        style={
                                            props.fieldOpt.type === "tel"
                                                ? { display: "none" }
                                                : { display: "flex" }
                                        }
                                    >
                                        <label htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            placeholder="Enter your Password"
                                            type="password"
                                            name="password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="forgot-password">
                                        <Link
                                            to="/Forgot Password"
                                            className="link"
                                        >
                                            Forgot password
                                        </Link>
                                    </div>

                                    <div className="error">
                                        {errors.email
                                            ? errors.email
                                            : errors.tel
                                            ? errors.tel
                                            : errors.password}
                                    </div>
                                    <button
                                        className="register"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        {phone.isPhone ? "Send otp" : "Log In"}
                                    </button>
                                </form>
                            )}
                        </Formik>
                    </div>
                    <div
                        className="media"
                        id="media"
                        style={
                            showOtp ? { display: "none" } : { display: "block" }
                        }
                    >
                        <h3>Or</h3>
                        <i
                            class="fa-brands fa-google options"
                            onClick={signInWithGoogle}
                        ></i>
                        <i
                            class="fa-brands fa-facebook options"
                            style={{ color: "#100dce" }}
                            onClick={signInWithFacebook}
                        ></i>
                        <i
                            class="fa-brands fa-x-twitter options"
                            onClick={signInWithX}
                        ></i>
                        <i
                            class={`fa-solid ${props.fieldOpt.class}  options`}
                            onClick={toggle}
                        ></i>
                        <h5>
                            Don't have an account?
                            <Link className="link" to="/Signin">
                                {" "}
                                Signup
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
