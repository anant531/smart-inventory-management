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
    if (!categories.includes(product.Category)) {
      return [...categories, product.Category];
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
