import React, { useEffect, useState } from "react";
import { Text, Modal, Card } from "@nextui-org/react";
import axios from "axios";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Product.css";
import SearchProduct from "./SearchProduct";
import { Button } from "@material-ui/core";
import AddProduct from "./AddProduct/AddProduct";

const Product = () => {
  const [products, setProduct] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [category, selectedcat] = useState("Chocolates");

  const selectedCategory = (selCat) => {
    selectedcat(selCat);
  };
  console.log(category);

  const filteredProducts = products.filter((cat) => cat.category === category);

  console.log("Filtered prods --->", filteredProducts);

  const query = new URLSearchParams(location.search);
  const isAdded = query.get("added");
  const isDeleted = query.get("delete");

  useEffect(() => {
    axios
      .get("http://localhost:8080/items")
      .then((response) => {
        setProduct(response.data);
        console.log("response...", response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    navigate("/product");
  }, [isDeleted, isAdded]);
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

  return (
    <div className="product-outer-container">
      <h1>Product List</h1>
      <div className="product-container">
        <div className="col-3">
          <SearchProduct
            selectedCategory={selectedCategory}
            category={category}
          />
        </div>
        <div className="">
          <AddProduct />
        </div>
      </div>

      <div
        className="product-container"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
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
              >
                <Text className="pro-id">
                  {" "}
                  <b>ID:</b> {product.id}
                </Text>
              </div>
              <div>
                <Text className="pro-id">
                  {" "}
                  <b>Name:</b> {product.ItemName}
                </Text>
              </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredProducts.map((product) => {
          return (
            <Card
              key={product.itemId}
              isHoverable
              variant="bordered"
              css={{ mw: "200px", mr: "20px", mb: "20px" }}
            >
              <Card.Body>
                <div
                  className="col "
                  style={{ display: "flex", "flex-direction": "row" }}
                >
                  <Text className="pro-id">
                    {" "}
                    <b>ID:</b> {product.itemId}
                  </Text>
                </div>
                <div>
                  <Text className="pro-id">
                    {" "}
                    <b>Name:</b> {product.itemName}
                  </Text>
                </div>

                <div>
                  <Text className="pro-id">
                    <b>Supplier:</b> {product.supplier}
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

                <div key={product.id}>
                  <button onClick={() => handleDelete(product.itemId)}>
                    ❌
                  </button>
                </div>
              </Card.Body>
              <Outlet />
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Product;
