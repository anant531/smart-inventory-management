import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import SignUp from "./Components/SignUp/SignUp";
import SignIn from "./Components/SignIn/SignIn";
import Godown from "./Components/Godown/Godown";
import Product from "./Components/MasterProduct/Product";
import AddGodown from "./Components/Godown/AddGodown/AddGodown";
import Home from "./Components/Home/Home";

import Inward from "./Components/Stocks/Inward/Inward";
import AddProduct from "./Components/MasterProduct/AddProduct/AddProduct";
import Outward from "./Components/Stocks/Outward/Outward";

function App() {
  const { token } = useSelector((state) => state.tokenReducer);
  console.log(token, "token");

  return (
    <div>
      <Routes>
        <Route path={"/signup"} element={<SignUp />} />
        <Route path={"/"} element={<SignIn />} />
        <Route path={"/home"} element={token ? <Home /> : <SignIn />} />
        <Route path={"/godown/*"} element={token ? <Godown /> : <SignIn />}>
          <Route path="add-godown" element={<AddGodown />} />
        </Route>
        <Route path={"/inward"} element={token ? <Inward /> : <SignIn />} />
        <Route path={"/outward"} element={token ? <Outward /> : <SignIn />} />
        <Route path={"/product/*"} element={token ? <Product /> : <SignIn />}>
          <Route path="add-product" element={<AddProduct />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
