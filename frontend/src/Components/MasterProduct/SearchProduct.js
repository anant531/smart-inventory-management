// import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
// import GodownContext from "../../contexts/GodownContext";
// import { useContext, useEffect, useState } from "react";
// import axios from "axios";

// const SearchProduct = (props) => {
//   const { product } = useContext(GodownContext);

//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get("http://localhost:8080/category");
//       setCategories(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleOptionChange = (event) => {
//     props.selectedCategory(event.target.value);
//   };

//   console.log(categories);

//   // const uniqueCategories = product.reduce((categories, product) => {
//   //   if (!categories.includes(product.Category)) {
//   //     return [...categories, product.Category];
//   //   }
//   //   return categories;
//   // }, []);

//   return (
//     <FormControl fullWidth>
//       <InputLabel id="category-select-label">Select a category</InputLabel>
//       <Select
//         labelId="category-select-label"
//         id="category-select"
//         value={props.category}
//         label="Select a category"
//         onChange={handleOptionChange}
//         // style={{
//         //   minWidth: "20%",
//         //   width: "fit-content",

//         //   background: "#f5f5f5",
//         //   // boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
//         //   borderRadius: "4px",
//         // }}
//       >
//         {categories.category.map((category) => (
//           <MenuItem key={category} value={category}>
//             {category}
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   );
// };

// export default SearchProduct;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const SearchProduct = ({ handleSelectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (event) => {
    const selectedCategoryValue = event.target.value;
    setSelectedCategory(selectedCategoryValue);
    // Pass the selected category value to the function prop
    handleSelectedCategory(selectedCategoryValue);
  };

  return (
    <FormControl>
      <InputLabel>Category</InputLabel>
      <Select value={selectedCategory} onChange={handleCategoryChange}>
        {categories.map((category) => (
          <MenuItem key={category.categoryId} value={category.category}>
            {category.category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SearchProduct;
