import axios from "axios";
import React from "react";

const Test = () => {
  const response = axios.get(`http://localhost:3030/godown`);
  const godown = response.data;
  console.log("API", godown);

  return (
    <div>
      <h1>HIIII</h1>
    </div>
  );
};

export default Test;
