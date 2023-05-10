import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import SelectSupplier from "../Stocks/selectSupplier";

const Home = () => {
  const [inwardData, setInwardData] = useState([]);
  const [supplier, selectSupplier] = useState("");

  const filteredinward = inwardData.filter(
    (cat) => cat.SupplierName === supplier
  );

  useEffect(() => {
    axios
      .get("http://localhost:3030/inward")
      .then((response) => {
        setInwardData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h1>Welcome to Smart Inventory</h1>
      <h5>Inward data</h5>
      <SelectSupplier
        selectedSupplier={supplier}
        handleChange={(val) => selectSupplier(val)}
      />
      <LineChart width={500} height={300} data={inwardData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="id" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Amount" stroke="#8884d8" />
      </LineChart>
    </>
  );
};

export default Home;
