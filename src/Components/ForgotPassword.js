import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import authContext from "../Context/Authentication/AuthContext";
export default function ForgotPassword() {
    const authOp = useContext(authContext);
    const { sendResetPasswordLink } = authOp;
    return (
        <>
            <div className="wrapper _s0h13">
                <Link to="/Login">
                    <i className="fa-solid fa-arrow-left  back" id="back"></i>
                </Link>

                <div className="icon">
                    <i class="fa-solid fa-user" id="login-user"></i>
                </div>
                <div className="inner-wrapper" id="login-wrapper">
                    <div className="inputs _s0h23">
                        <Formik
                            initialValues={{
                                email: "",
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

                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                    sendResetPasswordLink(
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
                                    <div className="email">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            placeholder={"Enter your Email"}
                                            type="email"
                                            name="email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                        />
                                    </div>
                                    <div className="error">
                                        {errors.email && errors.email}
                                    </div>
                                    <button
                                        className="register"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        Send Link
                                    </button>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
            <div id="recaptche-container"></div>
        </>
    );
}
