import React, { useContext, useState } from "react";
import OtpInput from "react-otp-input";
import authContext from "../Context/Authentication/AuthContext";
export default function Otp() {
    const authOp = useContext(authContext);
    const { showOtp, verifyOtp } = authOp;
    const [otp, setOtp] = useState("");
    const sendOtpVal = (e) => {
        verifyOtp(otp);
    };
    return (
        <>
            <div style={showOtp ? { display: "block" } : { display: "none" }}>
                <h3>Enter OTP</h3>
                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    shouldAutoFocus={true}
                    inputStyle="otp-container"
                    renderInput={(props) => <input {...props} />}
                />
                <button className="register" type="submit" onClick={sendOtpVal}>
                    Sign Up
                </button>
            </div>
        </>
    );
}
