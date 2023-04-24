import React, { useEffect, useState } from "react";
import { Text, Modal, Card } from "@nextui-org/react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Product = () => {
  const [products, setProduct] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

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
      <Text h1>Product List</Text>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((product) => (
          <Card
            key={product.id}
            isHoverable
            variant="bordered"
            css={{ mw: "400px", mr: "20px", mb: "20px" }}
          >
            <Card.Body>
              <Text>Product ID: {product.id}</Text>
              <Text>Name: {product.ItemName}</Text>
              <Text>Brand: {product.Supplier}</Text>
              <Text>Amount: ${product.Amount}</Text>
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
