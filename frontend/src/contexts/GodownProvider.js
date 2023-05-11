import React, { useState, useEffect } from "react";
import GodownContext from "./GodownContext";
import axios from "axios";

const GodownProvider = ({ children }) => {
  const [godown, setGodown] = useState([]);
  const [product, setProduct] = useState([]);
  const [inward, setInward] = useState([]);
  const [supplier, setSupplier] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/godown")
      .then((response) => setGodown(response.data))
      .catch((error) => console.log(error));

    axios
      .get("http://localhost:8080/items")
      .then((response) => setProduct(response.data))
      .catch((error) => console.log(error));

    axios
      .get("http://localhost:8080/supplier")
      .then((response) => setSupplier(response.data))
      .catch((error) => console.log(error));
  }, []);

  const addGodown = async (newGodown) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/godown",
        newGodown
      );
      setGodown([...godown, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteGodown = async (id) => {
    try {
      await axios.delete(`http://localhost:3030/godown/${id}`);
      setGodown(godown.filter((godown) => godown.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const addProduct = async (newProduct) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/items",
        newProduct
      );
      setProduct([...product, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const addInward = async (newInward) => {
    try {
      const response = await axios.post(
        "http://localhost:3030/inward",
        newInward
      );
      setInward([...inward, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditGodown = async (editableGodown) => {
    try {
      const response = await axios.put(
        `http://localhost:3030/godown`,
        editableGodown
      );
      const updatedGodown = response.data;
      setGodown(
        godown.map((row) =>
          row.godownId === updatedGodown.godownId ? updatedGodown : row
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GodownContext.Provider
      value={{
        godown,
        product,
        supplier,
        addGodown,
        deleteGodown,
        addProduct,
        addInward,
        handleEditGodown,
      }}
    >
      {children}
    </GodownContext.Provider>
  );
};

export default GodownProvider;
