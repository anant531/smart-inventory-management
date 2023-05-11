import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setToken } from "../../Redux/reducer";
import { blue } from "@nextui-org/react";
import "./Logout.css";

const Logout = () => {
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
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
        dispatch(setToken(null));
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {authUser ? (
        <>
          <p>{`Signed In as ${authUser.email}`}</p>
          <button className="sinout" onClick={userSignOut}>
            Sign Out
          </button>
        </>
      ) : (
        navigate("/")
      )}
    </div>
  );
};

export default Logout;
