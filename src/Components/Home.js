import React, { useRef, useState, useEffect, useContext } from "react";
import auth from "../Db/Sdk";
import { signOut, updateCurrentUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import db from "../Db/Db";
import { get, child, ref, set } from "firebase/database";
import { update as upd } from "firebase/database";
import { Formik } from "formik";
import authContext from "../Context/Authentication/AuthContext";
export default function Login(props) {
    const authOp = useContext(authContext);
    const { intiUserName, logOutUser, successNav, failedNav, changeName } =
        authOp;

    const navigate = useNavigate();
    const [enable, setEnable] = useState(true);
    const [opt, setOpt] = useState("Edit");
    const update = useRef();
    const edit = useRef();
    useEffect(() => {
        setTimeout(() => {
            changeName(localStorage.getItem("Username"));
        }, 1000);
        toggle();
        if (edit) {
            console.log(edit);
            edit.current.value = localStorage.getItem("Username");
        }
    }, [changeName, edit]);
    const changeEnable = (e) => {
        setEnable(e);
    };
    const changeOpt = (e) => {
        setOpt(e);
    };
    const toggle = () => {
        if (enable) {
            edit.current.disabled = true;
            update.current.disabled = true;
            edit.current.value = localStorage.getItem("Username");
            changeOpt("Edit");
            changeEnable(false);
        } else {
            edit.current.disabled = false;
            update.current.disabled = false;
            changeEnable(true);
            changeOpt("Cancel");
        }
    };

    const updateUser = (e) => {
        // A post entry.
        if (e.username) {
            upd(ref(db, `Users/${localStorage.getItem("uid")}`), {
                Username: e.username,
            })
                .then(() => {
                    // Data saved successfully!
                    setOpt("Edit");
                    edit.current.disabled = true;
                    update.current.disabled = true;
                    localStorage.setItem("Username", e.username);
                    successNav("Updated Successfully");
                })
                .catch((error) => {
                    // The write failed...
                    failedNav("Try again");
                });
        }
    };

    return (
        <>
            <div className="wrapper _s0h13">
                <i
                    class="fa-solid fa-right-from-bracket back"
                    id="back"
                    onClick={logOutUser}
                ></i>

                <div className="icon">
                    <i class="fa-solid fa-user" id="login-user"></i>
                </div>
                <div className="inner-wrapper" id="home-wrapper">
                    <div className="username">
                        Welcome, {localStorage.getItem("Username")}
                    </div>
                    <div className="inputs _s0h23">
                        <Formik
                            initialValues={{
                                username: localStorage.getItem("Username"),
                            }}
                            validate={(values) => {
                                const errors = {};
                                if (!values.username) {
                                    errors.username = "Username Required";
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                    updateUser(
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
                                touched,
                                isSubmitting,
                                /* and other goodies */
                            }) => (
                                <form action="post" onSubmit={handleSubmit}>
                                    <div className="username">
                                        <div className="opt">
                                            <label htmlFor="name">
                                                Username
                                            </label>
                                            <h5 onClick={toggle}>{opt}</h5>
                                        </div>
                                        <input
                                            type="text"
                                            name="username"
                                            ref={edit}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.username}
                                        />
                                    </div>
                                    <div className="error" id="error">
                                        {errors.username && errors.username}
                                    </div>
                                    <button
                                        className="register"
                                        type="submit"
                                        ref={update}
                                        onClick={updateUser}
                                        disabled={isSubmitting}
                                    >
                                        Update
                                    </button>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
}
