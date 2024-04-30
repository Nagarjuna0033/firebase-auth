import "./App.css";
// import Navbar from "./Components/Navbar";
import Starter from "./Components/Starter";
import Signin from "./Components/Signin";
import Login from "./Components/Login";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./Components/Home";
import Toast from "./Components/Toast";
function App() {
    return (
        <>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Starter />} />
                    <Route path="/Signin" element={<Signin />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Home" element={<Home />} />
                </Routes>
            </div>
            <Toast />
        </>
    );
}

export default App;

// fb: 790720316319019
// fbs: 1faaec4ee8636ab283097b521f34207a
// fbu: https://fir-auth-e8369.firebaseapp.com/__/auth/handler

// X: 28715265  U2NiMkhTYXBhQ29uQkVRS2l3b2U6MTpjaQ
// Xs: zuYTW_ZOkb8UI_Heihtfynvg4_Z1LdP139uKl_YnAcSLHjkXMz
