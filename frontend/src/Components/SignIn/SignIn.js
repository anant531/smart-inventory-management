import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import "./SignIn.css";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase";
import ForgotPassword from "./ForgotPassword";
import { useNavigate } from "react-router-dom";
import App from "../../App";
import { setToken } from "../../Redux/reducer";

const SignIn = () => {
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      console.log(user, "users");
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const signIn = (e) => {
    // e.preventDefault();
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential, "user Cred");
        let authUser = userCredential.user;
        if (authUser) {
          navigate("/home");
          console.log(authUser, "authuser");
          console.log(authUser?.accessToken);
          const token = authUser?.accessToken;

          dispatch(setToken(token));
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setTimeout(() => {
      setIsLoading(false); // Set the state variable back to false once login process is complete
    }, 2000);
  };

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
      />

      <div className="wrapper">
        <div className="login">
          <p class="title">SMART INVENTORY SYSTEM</p>
          <input
            wrapperClass="mb-4"
            label="Email address"
            id="form1"
            placeholder="Enter your Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <i class="fas fa-user"></i>
          <input
            wrapperClass="mb-4"
            label="Password"
            placeholder="Enter your Password"
            id="form2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i className="fas fa-key"></i>
          <a href="#">Forgot your password?</a>

          <div className="text-center pt-1 mb-5 pb-1">
            <button
              class="btn btn-success"
              onClick={signIn}
              disabled={isLoading}
            >
              {isLoading ? ( // Show the spinner if the login process is in progress
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                // Show the "Log in" text otherwise
                <span className="state">Log in</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
