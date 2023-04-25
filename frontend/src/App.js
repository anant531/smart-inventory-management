import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./Components/SignUp/SignUp";
import SignIn from "./Components/SignIn/SignIn";
import Godown from "./Components/Godown/Godown";
import Product from "./Components/MasterProduct/Product";
import AddGodown from "./Components/Godown/AddGodown/AddGodown";
import Home from "./Components/Home/Home";
import UserPage from "./Components/UserPage/UserPage";

function App() {
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
        <Route path={"/userpage"} element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;
