import "./App.css";
import React, { useState } from "react";
// import Navbar from "./Components/Navbar";
import Starter from "./Components/Starter";
import Signin from "./Components/Signin";
import Login from "./Components/Login";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./Components/Home";
import Toast from "./Components/Toast";
import AuthState from "./Context/Authentication/AuthState";
import ToastState from "./Context/Toast/ToastState";
import ForgotPassword from "./Components/ForgotPassword";
function App() {
    // const [msg, setMsg] = useState({
    //     class: "",
    //     msg: "",
    //     color: "",
    // });
    // const changeMsg = (e) => {
    //     setMsg(e);
    // };
    const [name, setName] = useState("");
    const changeName = (e) => {
        setName(e);
    };
    const [loginOpt, setLogInOpt] = useState({
        palceholder: "Enter your email",
        class: "fa-phone",
        type: "email",
        value: "values.email",
    });

    const [init, setInit] = useState({
        username: "",
        email: "",
        password: "",
    });
    const changeInit = (e) => {
        setInit(e);
    };

    const [fieldOpt, setFieldOpt] = useState({
        palceholder: "Enter your email",
        class: "fa-phone",
        type: "email",
        value: "values.email",
    });
    const [filedInit, setFieldInit] = useState({
        email: "",
        password: "",
    });
    const changeFieldInit = (e) => {
        setFieldInit(e);
    };
    const changeFieldOpt = (e) => {
        setFieldOpt(e);
    };

    const changeOpt = (e) => {
        setLogInOpt(e);
    };
    return (
        <>
            <ToastState>
                <AuthState>
                    <div className="App">
                        <Routes>
                            <Route path="/" element={<Starter />} />
                            <Route
                                path="/Signin"
                                element={
                                    <Signin
                                        // msg={msg}
                                        // changeMsg={changeMsg}
                                        changeOpt={changeOpt}
                                        loginOpt={loginOpt}
                                        init={init}
                                        changeInit={changeInit}
                                    />
                                }
                            />
                            <Route
                                path="/Login"
                                element={
                                    <Login
                                        // msg={msg}
                                        // changeMsg={changeMsg}
                                        // changeName={changeName}
                                        fieldOpt={fieldOpt}
                                        changeFieldOpt={changeFieldOpt}
                                        fieldInit={filedInit}
                                        changeFieldInit={changeFieldInit}
                                    />
                                }
                            />
                            <Route
                                path="/Home"
                                element={
                                    <Home
                                        // msg={msg}
                                        // changeMsg={changeMsg}
                                        name={name}
                                    />
                                }
                            />
                            <Route
                                path="/Forgot Password"
                                element={<ForgotPassword />}
                            />
                        </Routes>
                    </div>
                    <Toast />
                </AuthState>
            </ToastState>
        </>
    );
}

export default App;

// fb: 790720316319019
// fbs: 1faaec4ee8636ab283097b521f34207a
// fbu: https://fir-auth-e8369.firebaseapp.com/__/auth/handler

// X: 28715265  U2NiMkhTYXBhQ29uQkVRS2l3b2U6MTpjaQ
// Xs: zuYTW_ZOkb8UI_Heihtfynvg4_Z1LdP139uKl_YnAcSLHjkXMz
