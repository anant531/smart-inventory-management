import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import GodownContext from "../../contexts/GodownContext";
import { useContext } from "react";

const SearchProduct = (props) => {
  const { product } = useContext(GodownContext);
  const handleOptionChange = (event) => {
    props.selectedCategory(event.target.value);
    console.log(product);
  };

  const uniqueCategories = product.reduce((categories, product) => {
    if (!categories.includes(product.category)) {
      return [...categories, product.category];
    }
    return categories;
  }, []);

  return (
    <FormControl fullWidth>
      <InputLabel id="category-select-label">Select a category</InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        value={props.category}
        label="Select a category"
        onChange={handleOptionChange}
        style={{
          minWidth: "200px",
          width: "100%",
          minWidth: "200px",
          width: "auto",
          background: "#f5f5f5",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "4px",
        }}
      >
        {uniqueCategories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SearchProduct;
