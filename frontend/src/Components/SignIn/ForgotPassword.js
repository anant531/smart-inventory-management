import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import firebase from "firebase/compat/app";
import "firebase/auth";
import { useFirebaseApp } from "reactfire";
import { sendPasswordResetEmail } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCdyXuoTZyqaTovj5kZlbz9cYh-OYg1v9Q",
  authDomain: "react-auth-c5aeb.firebaseapp.com",
  projectId: "react-auth-c5aeb",
  storageBucket: "react-auth-c5aeb.appspot.com",
  messagingSenderId: "768820425713",
  appId: "1:768820425713:web:11ae25a75b01d1a2e08a50",
};

export default function ForgotPassword() {
  const firebaseApp = useFirebaseApp();
  firebase.initializeApp(firebaseConfig);

  const [resetemail, setResetemail] = useState("");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().sendPasswordResetEmail(resetemail);
      alert("Password reset email sent!");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div>
      <Button className="btn btn-danger" onClick={handleClickOpen}>
        Forgot Password
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Password Reset</DialogTitle>
        <DialogContent>
          <DialogContentText>To Reset your password</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={resetemail}
            onChange={(e) => setResetemail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleResetPassword}>Send</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
