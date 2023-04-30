import React, { useState, useEffect } from "react";
import GodownContext from "./GodownContext";
import axios from "axios";

const GodownProvider = ({ children }) => {
  const [godown, setGodown] = useState([]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3030/godown")
      .then((response) => setGodown(response.data))
      .catch((error) => console.log(error));

    axios
      .get("http://localhost:3030/product")
      .then((response) => setProduct(response.data))
      .catch((error) => console.log(error));
  }, []);

  const addGodown = async (newGodown) => {
    try {
      const response = await axios.post(
        "http://localhost:3030/godown",
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

  return (
    <GodownContext.Provider
      value={{ godown, product, addGodown, deleteGodown }}
    >
      {children}
    </GodownContext.Provider>
  );
};

export default GodownProvider;
