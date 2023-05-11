// import React, { useState } from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { NavLink, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// const theme = createTheme();

// export default function SignUp() {
//   const navigate = useNavigate();

//   const SigninClickHandler = () => {
//     navigate("/");
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const userData = {
//       name: name,
//       email: email,
//       password: password,
//       role: role,
//       phoneNumber: phoneNumber,
//     };
//     if (validateForm()) {
//       // Form is valid, proceed with signup
//       createUserWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//           console.log(userCredential);
//           // You can make an API request to save the additional user data (name, role, phoneNumber) here
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }
//   };

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [role, setRole] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     let formIsValid = true;
//     const newErrors = {};

//     // Validate name
//     if (!name) {
//       newErrors.name = "Name is required";
//       formIsValid = false;
//     }

//     // Validate email
//     if (!email) {
//       newErrors.email = "Email is required";
//       formIsValid = false;
//     } else {
//       // Regular expression to validate email format
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(email)) {
//         newErrors.email = "Invalid email address";
//         formIsValid = false;
//       }
//     }

//     // Validate password
//     if (!password) {
//       newErrors.password = "Password is required";
//       formIsValid = false;
//     }

//     // Validate confirm password
//     if (!confirmPassword) {
//       newErrors.confirmPassword = "Confirm Password is required";
//       formIsValid = false;
//     } else if (password !== confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//       formIsValid = false;
//     }

//     // Validate role
//     if (!role) {
//       newErrors.role = "Role is required";
//       formIsValid = false;
//     }

//     // Validate phone number
//     if (!phoneNumber) {
//       newErrors.phoneNumber = "Phone Number is required";
//       formIsValid = false;
//     }

//     // Set the validation errors
//     setErrors(newErrors);

//     return formIsValid;
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign up
//           </Typography>
//           <Box
//             component="form"
//             noValidate
//             onSubmit={handleSubmit}
//             sx={{ mt: 3 }}
//           >
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   autoComplete="given-name"
//                   name="Name"
//                   required
//                   fullWidth
//                   id="Name"
//                   label="Employee Name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   autoFocus
//                   error={errors.name}
//                   helperText={errors.name}
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="email"
//                   label="Email Address"
//                   name="email"
//                   autoComplete="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   error={errors.email}
//                   helperText={errors.email}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControl fullWidth>
//                   <InputLabel id="role-label">Role</InputLabel>
//                   <Select
//                     labelId="role-label"
//                     id="role"
//                     value={role}
//                     onChange={(e) => setRole(e.target.value)}
//                     error={errors.role}
//                     helperText={errors.role}
//                   >
//                     <MenuItem value="admin">Admin</MenuItem>
//                     <MenuItem value="manager">Manager</MenuItem>
//                     <MenuItem value="superAdmin">Super Admin</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   name="phoneNumber"
//                   label="Phone Number"
//                   id="phoneNumber"
//                   value={phoneNumber}
//                   onChange={(e) => setPhoneNumber(e.target.value)}
//                   error={errors.phoneNumber}
//                   helperText={errors.phoneNumber}
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   name="password"
//                   label="Password"
//                   type="password"
//                   id="password"
//                   autoComplete="new-password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   error={errors.name}
//                   helperText={errors.name}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   name="confirmPassword"
//                   label="Confirm Password"
//                   type="password"
//                   id="confirmPassword"
//                   autoComplete="new-password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   error={errors.confirmPassword}
//                   helperText={errors.confirmPassword}
//                 />
//               </Grid>
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//               onClick={handleSubmit}
//             >
//               Sign Up
//             </Button>

//             <Grid container justifyContent="flex-end">
//               <Grid item>
//                 <Button onClick={SigninClickHandler}>
//                   Already have an account? Sign in
//                 </Button>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//         <Copyright sx={{ mt: 5 }} />
//       </Container>
//     </ThemeProvider>
//   );
// }

import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./SignUp.css";

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();

  const SigninClickHandler = () => {
    navigate("/");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: name,
      email: email,
      phone: parseInt(phoneNumber),

      location: location,
      imgUrl:
        "https://previews.123rf.com/images/captainvector/captainvector1601/captainvector160107847/51389236-employee.jpg",
      role: role,
    };
    console.log(userData);

    axios
      .post("http://localhost:8080/user", userData)
      .then((response) => {
        console.log("Data successfully posted:", response.data);
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      });
    if (validateForm()) {
      // Form is valid, proceed with signup
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          // You can make an API request to save the additional user data (name, role, phoneNumber) here
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    // Validate name
    if (!name) {
      newErrors.name = "Name is required";
      formIsValid = false;
    }

    // Validate email
    if (!email) {
      newErrors.email = "Email is required";
      formIsValid = false;
    } else {
      // Regular expression to validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Invalid email address";
        formIsValid = false;
      }
    }

    // Validate password
    if (!password) {
      newErrors.password = "Password is required";
      formIsValid = false;
    }

    // Validate confirm password
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
      formIsValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      formIsValid = false;
    }

    // Validate role
    if (!role) {
      newErrors.role = "Role is required";
      formIsValid = false;
    }

    // Validate phone number
    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
      formIsValid = false;
    }

    // Set the validation errors
    setErrors(newErrors);

    return formIsValid;
  };

  return (
    <div className="wrapper-signup">
      <table className="table">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="mt-5 p-4 bg-light">
                <div className="text-center">
                  <i className="bi bi-shield-lock-fill"></i>
                </div>
                <h1 className="h5 mt-3 text-center">Sign up</h1>
                <form noValidate onSubmit={handleSubmit} className="mt-3">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Employee Name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="given-name"
                      required
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="role" className="form-label">
                      Role
                    </label>
                    <select
                      className={`form-select ${
                        errors.role ? "is-invalid" : ""
                      }`}
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                    >
                      <option value="">Select role</option>
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="Godown Supervisor">Supervisor</option>
                    </select>
                    {errors.role && (
                      <div className="invalid-feedback">{errors.role}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.phoneNumber ? "is-invalid" : ""
                      }`}
                      id="phoneNumber"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                    {errors.phoneNumber && (
                      <div className="invalid-feedback">
                        {errors.phoneNumber}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Employee Name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      id="name"
                      name="name"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      autoComplete="given-name"
                      required
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                      required
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className={`form-control ${
                        errors.confirmPassword ? "is-invalid" : ""
                      }`}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    {errors.confirmPassword && (
                      <div className="invalid-feedback">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>

                  <button type="submit" className="btn btn-primary w-100 mt-3">
                    Sign Up
                  </button>

                  <div className="text-center mt-3">
                    <button
                      className="btn btn-link"
                      onClick={SigninClickHandler}
                    >
                      Already have an account? Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </table>
    </div>
  );
}
