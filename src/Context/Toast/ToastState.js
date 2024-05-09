import React, { useState } from "react";
import ToastContext from "./ToastContext";
export default function ToastState(props) {
    const [msg, setMsg] = useState({
        class: "",
        msg: "",
        color: "",
    });
    const changeMsg = (e) => {
        setMsg(e);
    };
    return (
        <ToastContext.Provider value={{ changeMsg, msg }}>
            {props.children}
        </ToastContext.Provider>
    );
}
