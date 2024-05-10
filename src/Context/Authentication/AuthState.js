import React, { useContext, useState } from "react";
import auth from "../../Db/Sdk";
import { ref, get, child } from "firebase/database";
import db from "../../Db/Db";
import { useNavigate } from "react-router-dom";
import authContext from "./AuthContext";
import { saveIntoDb } from "../../auth/DbOp";
import toastContext from "../Toast/ToastContext";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    TwitterAuthProvider,
    sendPasswordResetEmail,
} from "firebase/auth";

// api key secret pypdF57xeFE9aVMVTeEdByupk1rAsTcsMr7kqF7E1h2JydwV4a
// api key  sXoHAFSJMzZaPmFCeJqMQQEp9
export default function AuthState(props) {
    const navigate = useNavigate();
    const toast = useContext(toastContext);
    const { changeMsg } = toast;
    const [phoneNumber, setPhoneNumber] = useState(1);
    const [phone, setPhone] = useState({
        isPhone: false,
        buttonText: "Sign up",
    });
    const [showOtp, setShowOtp] = useState(false);
    const [userName, setUserPhone] = useState("");
    const [isUser, setIsUser] = useState(false);
    const changeIsUser = (e) => {
        setIsUser(e);
    };
    const changeUserName = (e) => {
        setUserPhone(e);
    };
    const enableOtp = (e) => {
        setShowOtp(e);
    };
    const changePhone = (e) => {
        setPhone(e);
    };
    const getPhoneNumber = (e) => {
        setPhoneNumber(e);
    };
    // usernames

    const [intiUserName, setUserName] = useState("");
    const changeName = (e) => {
        setUserName(e);
    };
    // Toast Messages

    const showMsg = (e) => {
        changeMsg(e);
    };

    const successNav = (e) => {
        showMsg({
            class: "toast",
            msg: e,
            color: "green",
        });

        setTimeout(() => {
            showMsg({
                class: "",
                msg: "",
                color: "",
            });
        }, 5000);
    };

    const failedNav = (errorCode) => {
        if (errorCode === "auth/email-already-in-use") {
            showMsg({
                class: "toast",
                msg: "Email already in use",
                color: "red",
            });
        } else {
            showMsg({
                class: "toast",
                msg: errorCode,
                color: "red",
            });
        }
        setTimeout(() => {
            showMsg({
                class: "",
                msg: "",
                color: "",
            });
        }, 5000);
    };

    // Email and password authentication
    // SignUp user
    const signUpUserWithEmailAndPassword = (e) => {
        createUserWithEmailAndPassword(auth, e.email, e.password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                saveIntoDb(user, e.username);
                successNav("Login here");

                navigate("/Login");
            })
            .catch((error) => {
                const errorCode = error.code;
                // const errorMsg = error.message;
                // ..
                // console.log("Code :" + errorCode);
                // console.log("Msg :" + errorMsg);
                failedNav(errorCode);
            });
    };

    // Getting username

    const getUserName = (e) => {
        const dbRef = ref(db);

        get(child(dbRef, `Users/${e}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.val());
                    localStorage.setItem("Username", snapshot.val().Username);
                    setUserName(snapshot.val().Username);
                    changeIsUser(true);
                } else {
                    changeIsUser(false);
                    // console.log("in get data No data available");
                    localStorage.setItem("Username", "User");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const loadData = (e) => {
        const dbRef = ref(db);

        get(child(dbRef, `Users/${e}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    console.log("in login: ", snapshot.val());
                    localStorage.setItem("Username", snapshot.val().Username);
                    setUserName(snapshot.val().username);
                } else {
                    console.log("in load data No data available");
                    localStorage.setItem("Username", "User");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };
    // Signin User

    // Signing with google

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                getUserName(user.uid);
                // console.log(isUser);
                if (!isUser) {
                    saveIntoDb(user, user.displayName);
                    loadData(user.uid);
                }
                successNav("Logged in");
                localStorage.setItem("uid", user.uid);
                navigate("/Home");
                // console.log("token", token);
                // console.log("user", user);
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                // const errorMessage = error.message;
                // The email of the user's account used.
                // const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
                // ...
                // console.log("code", errorCode);
                // console.log("msg", errorMessage);
                // console.log("email", email);
                // console.log("cred", credential);
                if (errorCode !== "auth/popup-closed-by-user") {
                    failedNav(errorCode);
                }
            });
    };

    // Signing with facebook
    const signInWithFacebook = () => {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential =
                    FacebookAuthProvider.credentialFromResult(result);
                // const accessToken = credential.accessToken;

                // IdP data available using getAdditionalUserInfo(result)
                // ...

                getUserName(user.uid);
                // console.log(isUser);
                if (!isUser) {
                    saveIntoDb(user, user.displayName);
                    loadData(user.uid);
                }
                successNav("Logged in");
                localStorage.setItem("uid", user.uid);
                navigate("/Home");
                // console.log("token", accessToken);
                // console.log("user", user);
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                // const errorMessage = error.message;
                // The email of the user's account used.
                // const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential =
                    FacebookAuthProvider.credentialFromError(error);

                // ...
                // console.log("code", errorCode);
                // console.log("msg", errorMessage);
                // console.log("email", email);
                // console.log("cred", credential);
                // failedNav(errorCode);
                if (errorCode !== "auth/popup-closed-by-user") {
                    failedNav(errorCode);
                }
            });
    };
    // Sign in with X

    const signInWithX = () => {
        const provider = new TwitterAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
                // You can use these server side with your app's credentials to access the Twitter API.
                // const credential =
                // TwitterAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                // const secret = credential.secret;

                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                getUserName(user.uid);
                if (!isUser) {
                    saveIntoDb(user, user.displayName);
                    loadData(user.uid);
                }
                successNav("Logged in");
                localStorage.setItem("uid", user.uid);
                navigate("/Home");
                // console.log("token", token);
                // console.log("secret", secret);
                // console.log("user", user);
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                // const errorMessage = error.message;
                // The email of the user's account used.
                // const email = error.customData.email;
                // The AuthCredential type that was used.
                // const credential =
                // TwitterAuthProvider.credentialFromError(error);
                // ...
                // console.log("code", errorCode);
                // console.log("msg", errorMessage);
                // console.log("email", email);
                // console.log("cred", credential);
                // failedNav(errorCode);
                if (errorCode !== "auth/popup-closed-by-user") {
                    failedNav(errorCode);
                }
            });
    };

    // Signing with phone number

    const reCaptcheVerifier = () => {
        enableOtp(true);
        window.recaptchaVerifier = new RecaptchaVerifier(
            auth,
            "recaptche-container",
            {
                size: "invisible",
                callback: (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                    // onSignInSubmit();
                },
            }
        );
        window.recaptchaVerifier.render();
    };

    const onSignInSubmit = (e) => {
        console.log("into sign in");
        console.log("phone", e.tel);
        changeUserName(e.username);
        reCaptcheVerifier();
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, "+91" + e.tel, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).

                window.confirmationResult = confirmationResult;
                // ...
                console.log("confirmation result:", window.confirmationResult);
            })
            .catch((error) => {
                // Error; SMS not sent
                // ...
                console.log(error);
            });
    };

    const verifyOtp = (e) => {
        console.log("otp", e);
        const code = e;
        console.log("code", e);
        // eslint-disable-next-line no-undef
        confirmationResult
            .confirm(code)
            .then((result) => {
                // User signed in successfully.
                const user = result.user;
                // ...
                console.log("user: ", user);
                getUserName(user.uid);
                if (!isUser) {
                    saveIntoDb(user, "User");
                }
                loadData(user.uid);
                successNav("Logged in");
                navigate("/Home");
                localStorage.setItem("uid", user.uid);
                enableOtp(false);
            })
            .catch((error) => {
                // User couldn't sign in (bad verification code?)
                // ...
                console.log(error);
                failedNav("Invaild verification code");
            });
    };

    // Updating user

    // log out user

    const logOutUser = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                localStorage.removeItem("uid");
                localStorage.removeItem("Username");
                successNav("Logged out");
                navigate("/");
            })
            .catch((error) => {
                // An error happened.
                failedNav(error);
                // navigate("/");
            });
    };

    // login states

    //  login user

    const loginUserWithEmailAndPassword = (e) => {
        console.log(e);
        signInWithEmailAndPassword(auth, e.email, e.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...

                loadData(user.uid);
                // loadData(user.uid);

                localStorage.setItem("uid", user.uid);
                successNav("Logged in");
                navigate("/Home");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // failedNav("User not found. please sign in");
                failedNav("Invalid credentails");
            });
    };
    const sendResetPasswordLink = (e) => {
        console.log(e);
        console.log("Sending link...");

        sendPasswordResetEmail(auth, e.email)
            .then(() => {
                console.log("Password reset email sent");
                navigate("/Login");
                successNav("Link sent to mail");
            })
            .catch((error) => {
                // console.log(error.code);
                failedNav("User not exists");
            });
    };
    return (
        <authContext.Provider
            value={{
                signInWithGoogle,
                signInWithFacebook,
                signInWithX,
                signUpUserWithEmailAndPassword,
                loginUserWithEmailAndPassword,
                reCaptcheVerifier,
                getPhoneNumber,
                onSignInSubmit,
                verifyOtp,
                successNav,
                failedNav,
                intiUserName,
                changeName,
                logOutUser,
                phone,
                changePhone,
                showOtp,
                enableOtp,
                sendResetPasswordLink,
            }}
        >
            {props.children}
        </authContext.Provider>
    );
}
