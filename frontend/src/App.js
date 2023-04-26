import { Route, Routes } from "react-router-dom";

import SignUp from "./Components/SignUp/SignUp";
import SignIn from "./Components/SignIn/SignIn";
import Godown from "./Components/Godown/Godown";
import Product from "./Components/MasterProduct/Product";
import AddGodown from "./Components/Godown/AddGodown/AddGodown";
import Home from "./Components/Home/Home";
import "./App.css";
import Inward from "./Components/Inward/Inward";
import Analytics from "./Components/Analytics/Analytics";
import Account from "./Components/Account/Account";
import Outward from "./Components/Outward/Outward";
import Employee from './Components/Employee/Employee'
function App(props) {
  return (
    <div>
      <Routes>
        <Route path={"/signup"} element={<SignUp />} />
        <Route path={"/"} element={<SignIn />} />
        <Route path={"/home"} element={<Home />} />
        <Route path={"/godown/*"} element={<Godown />}>
          <Route path="add-godown" element={<AddGodown />} />
        </Route>
        <Route path={"/products"} element={<Product />} />
        <Route path={"/inwards"} element={<Inward />} />
        <Route path={"/outward"} element={<Outward />} />
        <Route path={"/userpage"} element={<UserPage />} />
        <Route path={"/analytics"} element={<Analytics />} />
        <Route path={"/account"} element={<Account />} />
        <Route path={"/employees"} element={<Employee />} />
      </Routes>
    </div>
  );
}

export default App;

