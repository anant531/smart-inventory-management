import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SearchProduct = (props) => {
  const handleOptionChange = (event) => {
    props.selectedCategory(event.target.value);
  };

  return (
    <FormControl>
      <InputLabel id="category-select-label">Select a category</InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        value={props.category}
        label="Select a category"
        onChange={handleOptionChange}
      >
        <MenuItem value="">
          <em>Select an option</em>
        </MenuItem>
        <MenuItem value="Mineral Water">Mineral Water</MenuItem>
        <MenuItem value="Snacks">Snacks</MenuItem>
        <MenuItem value="Chocolates">Chocolates</MenuItem>
        <MenuItem value="Toothpaste">Toothpaste</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SearchProduct;
