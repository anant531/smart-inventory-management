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
import UserPage from "./Components/UserPage/UserPage";
import Analytics from "./Components/Analytics/Analytics";
import { ProductDialog } from "./Components/Analytics/ProductDialog";
import AccessDeniedPage from "./Components/AccessDeniedPage/AccessDeniedPage";
import EditProduct from "./Components/MasterProduct/EditProduct";

function App() {
  const { token } = useSelector((state) => state.tokenReducer);
  const { role } = useSelector((state) => state.tokenReducer);
  console.log(token, "token");
  console.log(role, "role");

  return (
    <Box sx={{ display: "flex" }}>
      {token && <Sidebar />}
      <Box component="main" sx={{ flexGrow: 1, p: 3, background: "#ffffff" }}>
        <div>
          <Routes>
            <Route path={"/signup"} element={<SignUp />} />
            <Route path={"/users"} element={<UserPage />} />
            <Route path={"/"} element={<SignIn />} />
            <Route path={"/edit-product"} element={<EditProduct />} />
            <Route path={"/home"} element={token ? <Home /> : <SignIn />} />
            <Route path={"/godown/*"} element={token ? <Godown /> : <SignIn />}>
              <Route path="add-godown" element={<AddGodown />} />
            </Route>
            <Route path={"/analytics/*"} element={<Analytics />}>
              <Route path="inward-data" element={<ProductDialog />} />
            </Route>
            <Route
              path={"/inward"}
              element={
                token && role === "manager" ? <Inward /> : <AccessDeniedPage />
              }
            />
            <Route
              path={"/outward"}
              element={
                token && role === "manager" ? <Outward /> : <AccessDeniedPage />
              }
            />

            <Route path={"/product/*"} element={<Product />}>
              <Route path="add-product" element={<AddProduct />} />
            </Route>
          </Routes>
        </div>
      </Box>
    </Box>
  );
}

export default App;
