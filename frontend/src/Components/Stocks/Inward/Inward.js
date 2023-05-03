// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Table } from "react-bootstrap";
// import "./Inward.css";
// import SelectGodown from "./selectGodown";

// function ProductList() {
//   const [products, setProducts] = useState([]);
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [Godown, selectedGodown] = useState("");
//   const [godownData, setGodownData] = useState(null);
//   const selectGodown = (selGod) => {
//     selectedGodown(selGod);
//   };

//   useEffect(() => {
//     fetch(`http://localhost:3030/godown/${Godown}`)
//       .then((response) => response.json())
//       .then((data) => setGodownData(data));
//   }, [Godown]);
//   console.log(godownData);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3030/product`)
//       .then((response) => setProducts(response.data))
//       .catch((error) => console.log(error));
//   }, []);

//   const handleProductSelection = (event) => {
//     const productId = event.target.name;
//     const isChecked = event.target.checked;
//     if (isChecked) {
//       setSelectedProducts((prevState) => [
//         ...prevState,
//         { id: productId, quantity: 1 },
//       ]);
//     } else {
//       setSelectedProducts((prevState) =>
//         prevState.filter((product) => product.id !== productId)
//       );
//     }
//   };

//   const handleQuantityChange = (event) => {
//     const productId = event.target.name.split("-")[0];
//     const quantity = parseInt(event.target.value);
//     setSelectedProducts((prevState) => {
//       const productIndex = prevState.findIndex(
//         (product) => product.id === productId
//       );
//       const newSelectedProducts = [...prevState];
//       newSelectedProducts[productIndex] = { id: productId, quantity };
//       return newSelectedProducts;
//     });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     axios
//       .post("http://localhost:3030/todos", selectedProducts)
//       .then((response) => console.log(response.data))
//       .catch((error) => console.log(error));
//   };

//   return (
//     <div style={{ marginTop: "2rem" }} className="container">
//       <div>
//         <SelectGodown selectGodown={selectGodown} />
//       </div>
//       <form onSubmit={handleSubmit}>
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th></th>
//               <th>Product Name</th>
//               <th>Quantity</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <tr key={product.id}>
//                 <td>
//                   <input
//                     type="checkbox"
//                     name={product.id}
//                     onChange={handleProductSelection}
//                   />
//                 </td>
//                 <td>{product.ItemName}</td>
//                 <td>
//                   <input
//                     type="number"
//                     min="1"
//                     name={`${product.id}-quantity`}
//                     defaultValue={1}
//                     onChange={handleQuantityChange}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//         <button type="submit" className="btn btn-primary">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

// export default ProductList;

import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import "./Inward.css";
import SelectGodown from "./selectGodown";
import SearchProduct from "../../MasterProduct/SearchProduct";
import { useLocation, useNavigate } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [Godown, selectedGodown] = useState("");
  const [godownData, setGodownData] = useState(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const isAdded = query.get("added");
  const [category, selectedcat] = useState("Snacks");
  const navigate = useNavigate();

  const selectedCategory = (selCat) => {
    selectedcat(selCat);
  };
  console.log(category);

  const filteredProducts = products.filter((cat) => cat.Category === category);

  const selectGodown = (selGod) => {
    selectedGodown(selGod);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3030/godown/${Godown}`)
      .then((response) => setGodownData(response.data))
      .catch((error) => console.log(error));
  }, [isAdded]);
  console.log(godownData);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/product`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleProductSelection = (event) => {
    const productId = event.target.name;
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedProducts((prevState) => [
        ...prevState,
        { id: productId, quantity: 1 },
      ]);
    } else {
      setSelectedProducts((prevState) =>
        prevState.filter((product) => product.id !== productId)
      );
    }
  };

  const handleQuantityChange = (event) => {
    const productId = event.target.name.split("-")[0];
    const quantity = parseInt(event.target.value);
    setSelectedProducts((prevState) => {
      const productIndex = prevState.findIndex(
        (product) => product.id === productId
      );
      const newSelectedProducts = [...prevState];
      newSelectedProducts[productIndex] = { id: productId, quantity };
      return newSelectedProducts;
    });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.get(
        `http://localhost:3030/godown/${Godown}`
      );
      const godown = response.data;

      const updatedProducts = [];

      //reducing the capacity and adding
      const totalQuantity = selectedProducts.reduce(
        (acc, product) => acc + product.quantity,
        0
      );
      godown.Capacity -= totalQuantity;
      // abc
      for (const selectedProduct of selectedProducts) {
        const existingProductIndex = godown.products.findIndex(
          (product) => product.id === selectedProduct.id
        );

        if (existingProductIndex !== -1) {
          // Update the quantity of the existing product
          const existingProduct = godown.products[existingProductIndex];
          const updatedProduct = {
            id: existingProduct.id,
            quantity: existingProduct.quantity + selectedProduct.quantity,
          };
          godown.products[existingProductIndex] = updatedProduct;
          updatedProducts.push(updatedProduct);
        } else {
          // Add the new product to the array
          godown.products.push(selectedProduct);
          updatedProducts.push(selectedProduct);
        }
      }

      const updateResponse = await axios.put(
        `http://localhost:3030/godown/${Godown}`,
        godown
      );

      console.log("Updated products:", updatedProducts);
      navigate("/inward?added=true");
      return updateResponse.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ marginTop: "2rem" }} className="container">
      <div className="container">
        <div className="col-3">
          <SearchProduct selectedCategory={selectedCategory} />
        </div>
        <div>
          <SelectGodown selectGodown={selectGodown} />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>Product Name </th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <input
                    type="checkbox"
                    name={product.id}
                    onChange={handleProductSelection}
                  />
                </td>
                <td>{product.ItemName}</td>
                <td>{product.Amount}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    name={`${product.id}-quantity`}
                    defaultValue={1}
                    onChange={handleQuantityChange}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ProductList;
