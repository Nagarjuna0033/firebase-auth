import React, { useContext } from "react";
import toastContext from "../Context/Toast/ToastContext";
export default function Toast() {
    const toastProps = useContext(toastContext);
    const { msg } = toastProps;
    console.log(msg);
    return (
        <>
            <div class={msg.class} style={{ backgroundColor: msg.color }}>
                <div class="toast-body">{msg.msg}</div>
            </div>
        </>
    );
}
