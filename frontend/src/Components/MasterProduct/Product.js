import React, { useEffect, useState } from "react";
import { Text, Modal, Card } from "@nextui-org/react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./Product.css";
import SearchProduct from "./SearchProduct";

const Product = () => {
  const [products, setProduct] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [category, selectedcat] = useState("Snacks");

  const selectedCategory = (selCat) => {
    selectedcat(selCat);
  };
  console.log(category);

  const filteredProducts = products.filter((cat) => cat.Category === category);

  const query = new URLSearchParams(location.search);

  const isDeleted = query.get("delete");

  useEffect(() => {
    axios
      .get("http://localhost:3030/product")
      .then((response) => {
        setProduct(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    navigate("/product");
  }, [isDeleted]);
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3030/product/${id}`)
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
    <>
      <div>
        <SearchProduct selectedCategory={selectedCategory} />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            isHoverable
            variant="bordered"
            css={{ mw: "400px", mr: "20px", mb: "20px" }}
          >
            <Card.Body>
              <div style={{ display: "flex", "flex-direction": "row" }}>
                <Text className="pro-id">Product ID: </Text>
                <Text style={{ display: "inline" }}>{product.id}</Text>
              </div>
              <div style={{ display: "flex", "flex-direction": "row" }}>
                <Text className="pro-id">Name: </Text>
                <Text>{product.ItemName} </Text>
              </div>

              <Text className="pro-id">Brand: </Text>
              <Text>{product.Supplier}</Text>
              <Text className="pro-id">Amount:</Text>
              <Text> ${product.Amount}</Text>
              <div key={product.id}>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

 
    </>
  );
};

export default Product;
