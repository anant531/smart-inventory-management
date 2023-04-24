import React from "react";

const SearchProduct = (props) => {
  const handleOptionChange = (event) => {
    props.selectedCategory(event.target.value);
  };

  return (
    <div>
      <select onChange={handleOptionChange}>
        <option value="">Select an option</option>
        <option value="Mineral Water">Mineral Water</option>
        <option value="Snacks">Snacks</option>
        <option value="Chocolates">Chocolates</option>
        <option value="Toothpaste">Toothpaste</option>
      </select>
    </div>
  );
};

export default SearchProduct;
