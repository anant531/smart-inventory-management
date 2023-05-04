import React, { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import axios from "axios";

function Analytics() {
  const [inward, setInward] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3030/inward")
      .then((response) => setInward(response.data))
      .catch((error) => console.log(error));
  }, []);
  console.log(inward);
  return (
    <div className="container">
      <Table>
        <thead>
          <tr>
            <th>Add</th>
            <th>Product Name </th>
            <th>Quantity (kg)</th>
            <th>Amount/Unit</th>
          </tr>
        </thead>
      </Table>

      {/* <form onSubmit={handleSubmit}>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th></th>
          <th>Product Name </th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {filteredProducts.map((product) => (
          <tr key={product.id}>
            <td>
              <input
                type="checkbox"
                name={product.id}
                onChange={handleProductSelection}
              />
            </td>
            <td>{product.ItemName}</td>
            <td>{product.Amount}</td>
            <td>
              <input
                type="number"
                min="1"
                name={`${product.id}-quantity`}
                defaultValue={1}
                onChange={handleQuantityChange}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    <button type="submit" className="btn btn-primary">
      Submit
    </button>
  </form> */}
    </div>
  );
}

export default Analytics;
