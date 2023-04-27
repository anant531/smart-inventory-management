import React, { useContext, useState } from "react";
import GodownContext from "../../../contexts/GodownContext";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const SelectGodown = (props) => {
  const { godown } = useContext(GodownContext);
  const [selectedGodown, setSelectedGodown] = useState("");

  const handleGodownChange = (event) => {
    setSelectedGodown(event.target.value);
    props.selectGodown(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="godown-select-label">Godown</InputLabel>
        <Select
          labelId="godown-select-label"
          id="godown-select"
          value={selectedGodown}
          onChange={handleGodownChange}
        >
          {godown.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.id}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectGodown;
