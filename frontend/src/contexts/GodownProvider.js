import React, { useState, useEffect } from "react";
import GodownContext from "./GodownContext";

const GodownProvider = ({ children }) => {
  const [godown, setGodown] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3030/godown")
      .then((response) => response.json())
      .then((data) => setGodown(data))
      .catch((error) => console.log(error));
  }, []);
  console.log(godown);

  return (
    <GodownContext.Provider value={{ godown }}>
      {children}
    </GodownContext.Provider>
  );
};

export default GodownProvider;
