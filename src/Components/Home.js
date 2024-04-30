import React, { useRef, useState } from "react";
export default function Login() {
    const [username, setUsername] = useState("User");
    const [user, setUser] = useState("");
    const [enable, setEnable] = useState(false);
    const [opt, setOpt] = useState("Edit");
    const update = useRef();
    const edit = useRef();
    const toggle = () => {
        if (enable) {
            setEnable(false);
            setOpt("Edit");
            edit.current.disabled = true;
            update.current.disabled = true;
            console.log(edit);
        } else {
            setEnable(true);
            setOpt("Cancel");
            edit.current.disabled = false;
            update.current.disabled = false;
            console.log(edit);
        }
    };
    const updateUser = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <div className="wrapper _s0h13">
                <i class="fa-solid fa-right-from-bracket back" id="back"></i>

                <div className="icon">
                    <i class="fa-solid fa-user" id="login-user"></i>
                </div>
                <div className="inner-wrapper" id="home-wrapper">
                    <div className="username">Welcome, {username}</div>
                    <div className="inputs _s0h23">
                        <form action="post">
                            <div className="username">
                                <div className="opt">
                                    <label htmlFor="name">Username</label>
                                    <h5 onClick={toggle}>{opt}</h5>
                                </div>
                                <input
                                    type="text"
                                    onChange={(e) => setUser(e.target.value)}
                                    ref={edit}
                                />
                            </div>
                            <div className="error" id="error">
                                {/* this is error */}
                            </div>
                            <button
                                className="register"
                                ref={update}
                                onClick={updateUser}
                            >
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
