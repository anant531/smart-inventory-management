import React, { useEffect, useState } from "react";
import { Text, Modal, Card } from "@nextui-org/react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Product.css";
import SearchProduct from "./SearchProduct";
import { Button } from "@material-ui/core";
import AddProduct from "./AddProduct/AddProduct";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditProduct from "./EditProduct";
import EditIcon from "@mui/icons-material/Edit";
// import { useNavigate } from "react-router-dom";

const Product = () => {
  const [products, setProduct] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [category, selectedcat] = useState("Chocolate");

  const [editOpen, setEditOpen] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [selectedId, setSelectedId] = useState();

  const filteredProducts = products.filter((cat) => cat.category === category);

  const handleSelectedCategory = (selectedCategory) => {
    // Perform actions with the selectedCategory value
    console.log("Selected category:", selectedCategory);
    selectedcat(selectedCategory);
    // You can add your custom logic here based on the selectedCategory value
  };

  const query = new URLSearchParams(location.search);
  const isAdded = query.get("added");
  const isDeleted = query.get("delete");

  useEffect(() => {
    fetchData();
  }, [isDeleted, isAdded]);

  const fetchData = () => {
    axios
      .get("http://localhost:8080/items")
      .then((response) => {
        setProduct(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    navigate("/product");
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/items/${id}`)
      .then((response) => {
        console.log("Resource deleted successfully");
        // remove deleted resource from state
      })
      .catch((error) => {
        console.log("Error deleting resource: " + error);
      });
    navigate("/product?delete=true");
  };

  const handleEdit = (id) => {
    console.log("edit clicked " + id);
    <EditProduct id={id} />;
  };

  return (
    <div className="product-outer-container">
      <h1 style={{ marginBottom: "25px", marginTop: "-21px" }}>Product List</h1>
      <div className="product-container">
        <div className="col-3">
          <SearchProduct
            handleSelectedCategory={handleSelectedCategory}
            category={category}
          />
        </div>
        <div className="">
          <AddProduct />
        </div>
      </div>

      <div
        className="product-inner-container"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {filteredProducts.map((product) => (
          <Card
            key={product.itemId}
            isHoverable
            variant="bordered"
            css={{
              mw: "200px",
              mr: "20px",
              mb: "20px",
              mt: "20px",
            }}
          >
            <Card.Body>
              <div
                className="col "
                style={{ display: "flex", "flex-direction": "row" }}
              ></div>
              <div>
                <Text className="pro-id">
                  {" "}
                  <b>Name:</b> {product.itemName}
                </Text>
              </div>

              <div
              // style={{
              //   display: "flex",
              //   "flex-direction": "row",
              >
                <Text className="pro-id mb-3">
                  <b>Price:</b> {product.amount}
                </Text>
              </div>
              <div
              // style={{
              //   display: "flex",
              //   "flex-direction": "row",
              >
                <Text className="pro-id mb-3">
                  <b>Price:</b> {product.category}
                </Text>
              </div>

              <div key={product.id}>
                {/* <button onClick={() => handleDelete(product.id)}>❌</button> */}
                <DeleteTwoToneIcon
                  className="DeleteTwoToneIcon"
                  fontSize="medium"
                  color="action"
                  onClick={() => handleDelete(product.itemId)}
                  sx={{ color: "#ff1744" }}
                />
                {/* <DeleteTwoToneIcon
                  className="DeleteTwoToneIcon"
                  fontSize="medium"
                  color="action"
                  onClick={() => navigate(`/edit-product/?id=${product.id}`)}
                  sx={{ color: "#ff1744" }}
                /> */}
                <EditIcon
                  className="EditIcon"
                  fontSize="medium"
                  color="action"
                  alignItems="center"
                  onClick={() => {
                    setEditOpen(true);
                    setSelectedData(product);
                    setSelectedId(product?.itemId);
                  }}
                />
              </div>
            </Card.Body>
            <Outlet />
          </Card>
        ))}
      </div>
      <EditProduct
        dialogOpen={editOpen}
        onCancel={() => setEditOpen(false)}
        data={selectedData}
        id={selectedId}
        fetchData={fetchData}
      />
    </div>
  );
};

export default Product;
