import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import GodownContext from "../../contexts/GodownContext";
import { useContext, useState } from "react";

const SelectSupplier = (props) => {
  const { handleChange, selectedSupplier } = props;
  const { supplier } = useContext(GodownContext);
  const handleOptionChange = (event) => {
    handleChange(event?.target?.value);
  };

  console.log(supplier);

  return (
    <FormControl fullWidth sx={{ marginRight: 4 }}>
      <InputLabel id="category-select-label">Select a Supplier</InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        value={selectedSupplier}
        label="Select a category"
        onChange={handleOptionChange}
        // style={{
        //   minWidth: "20%",
        //   width: "10%",
        //   background: "#f5f5f5",
        //   boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        //   borderRadius: "4px",
        // }}
      >
        {supplier.map((item) => (
          <MenuItem key={item.supplierId} value={item.supplierName}>
            {item.supplierName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectSupplier;
