import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import SignUp from "./Components/SignUp/SignUp";
import SignIn from "./Components/SignIn/SignIn";
import Godown from "./Components/Godown/Godown";
import Product from "./Components/MasterProduct/Product";
import AddGodown from "./Components/Godown/AddGodown/AddGodown";
import Home from "./Components/Home/Home";
import Box from "@mui/material/Box";
import Sidebar from "./Components/Sidebar/Sidebar";

import Inward from "./Components/Stocks/Inward/Inward";
import AddProduct from "./Components/MasterProduct/AddProduct/AddProduct";
import Outward from "./Components/Stocks/Outward/Outward";

function App() {
  const { token } = useSelector((state) => state.tokenReducer);
  console.log(token, "token");

  return (
    <Box sx={{ display: "flex" }}>
      {token && <Sidebar />}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <div>
          <Routes>
            <Route path={"/signup"} element={<SignUp />} />
            <Route path={"/"} element={<SignIn />} />
            <Route path={"/home"} element={token ? <Home /> : <SignIn />} />
            <Route path={"/godown/*"} element={token ? <Godown /> : <SignIn />}>
              <Route path="add-godown" element={<AddGodown />} />
            </Route>
            <Route path={"/inward"} element={<Inward />} />
            <Route path={"/outward"} element={<Outward />} />
            <Route
              path={"/product/*"}
              element={token ? <Product /> : <SignIn />}
            >
              <Route path="add-product" element={<AddProduct />} />
            </Route>
          </Routes>
        </div>
      </Box>
    </Box>
  );
}

export default App;
