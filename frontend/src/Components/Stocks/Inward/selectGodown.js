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
  console.log(godown);

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel id="godown-select-label">Select a Godown</InputLabel>
        <Select
          labelId="godown-select-label"
          id="godown-select"
          value={selectedGodown}
          label="Select a Godown"
          onChange={handleGodownChange}
          style={{
            minWidth: "200px",
            width: "100%",
            minWidth: "200px",
            width: "auto",
            background: "#f5f5f5",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "4px",
          }}
          // <FormControl sx={{ m: 1, minWidth: 150 }}>
          //   <InputLabel id="godown-select-label"> Select a Godown</InputLabel>
          //   <Select
          //     labelId="godown-select-label"
          //     id="godown-select"
          //     value={selectedGodown}
          //     onChange={handleGodownChange}
          //     style={{
          //       minWidth: "200px",
          //       width: "100%",
          //       minWidth: "200px",
          //       width: "auto",
          //       background: "#f5f5f5",
          //       boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          //       borderRadius: "4px",
          //     }}
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
