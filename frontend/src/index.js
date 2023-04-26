import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { FirebaseAppProvider } from "reactfire";

const firebaseConfig = {
  apiKey: "AIzaSyCdyXuoTZyqaTovj5kZlbz9cYh-OYg1v9Q",
  authDomain: "react-auth-c5aeb.firebaseapp.com",
  projectId: "react-auth-c5aeb",
  storageBucket: "react-auth-c5aeb.appspot.com",
  messagingSenderId: "768820425713",
  appId: "1:768820425713:web:11ae25a75b01d1a2e08a50",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FirebaseAppProvider>
);
