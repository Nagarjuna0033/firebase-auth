import React from "react";

import { Link } from "react-router-dom";
export default function Login() {
    return (
        <>
            <div className="wrapper _s0h13">
                <Link to="/">
                    <i class="fa-solid fa-arrow-left  back" id="back"></i>
                </Link>
                <div className="icon">
                    <i class="fa-solid fa-user" id="login-user"></i>
                </div>
                <div className="inner-wrapper" id="login-wrapper">
                    <div className="inputs _s0h23">
                        <form action="post">
                            {/* <div className="username">
                                <label htmlFor="name">Username</label>
                                <input type="text" />
                            </div> */}
                            <div className="email">
                                <label htmlFor="email">Email</label>
                                <input type="email" />
                            </div>
                            <div className="password">
                                <label htmlFor="password">Password</label>
                                <input type="password" />
                            </div>
                            <div className="error" id="error">
                                {/* this is error */}
                            </div>
                            <button className="register">Log In</button>
                        </form>
                    </div>
                    <div className="media" id="media">
                        <h3>Or</h3>
                        <i class="fa-brands fa-google options"></i>
                        <i
                            class="fa-brands fa-facebook options"
                            style={{ color: "#100dce" }}
                        ></i>
                        <i class="fa-brands fa-x-twitter options"></i>
                        <i class="fa-solid fa-phone options"></i>
                        <h5>
                            Don't have an account?
                            <Link className="link" to="/Signin">
                                {" "}
                                Signup
                            </Link>
                        </h5>
                    </div>
                </div>
            </div>
        </>
    );
}
