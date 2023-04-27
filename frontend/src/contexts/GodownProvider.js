import React, { useState, useEffect } from "react";
import GodownContext from "./GodownContext";

const GodownProvider = ({ children }) => {
  const [godown, setGodown] = useState([]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3030/godown")
      .then((response) => response.json())
      .then((data) => setGodown(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3030/product")
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <GodownContext.Provider value={{ godown, product }}>
      {children}
    </GodownContext.Provider>
  );
};

export default GodownProvider;
