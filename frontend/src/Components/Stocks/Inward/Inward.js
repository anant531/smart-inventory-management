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

function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [Godown, selectedGodown] = useState("");
  const [godownData, setGodownData] = useState(null);
  const selectGodown = (selGod) => {
    selectedGodown(selGod);
  };

  useEffect(() => {
    fetch(`http://localhost:3030/godown/${Godown}`)
      .then((response) => response.json())
      .then((data) => setGodownData(data));
  }, [Godown]);
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
      const newSelectedProducts = [...prevState, { id: productId, quantity }];

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

      godown.products.push(selectedProducts);
      // godown.Capacity -= newProduct.quantity;
      const updateResponse = await axios.put(
        `http://localhost:3030/godown/${Godown}`,
        godown
      );

      return updateResponse.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ marginTop: "2rem" }} className="container">
      <div>
        <SelectGodown selectGodown={selectGodown} />
      </div>
      <form onSubmit={handleSubmit}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <input
                    type="checkbox"
                    name={product.id}
                    onChange={handleProductSelection}
                  />
                </td>
                <td>{product.ItemName}</td>
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
