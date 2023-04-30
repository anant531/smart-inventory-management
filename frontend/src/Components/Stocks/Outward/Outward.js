// import { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { Table } from "react-bootstrap";

// import SelectGodown from "../Inward/selectGodown";

// import GodownContext from "../../../contexts/GodownContext";

// function Outward() {
//   const { product } = useContext(GodownContext);
//   const [godownData, setGodownData] = useState(null);
//   const [Godown, selectedGodown] = useState("");
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [productList, setProductlist] = useState([]);

//   const selectGodown = (selGod) => {
//     selectedGodown(selGod);
//   };

//   console.log(selectedProducts);
//   console.log(productList);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3030/godown/${Godown}`)
//       .then((response) => setGodownData(response.data))
//       .catch((error) => console.log(error));
//   }, [Godown]);
//   console.log(godownData);

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

//   const SearchProductHandler = async (e) => {
//     try {
//       e.preventDefault();
//       const products = godownData.products.map((item) => {
//         const { id, quantity } = item;
//         const productMatch = product.find((p) => p.id === id);
//         const { ItemName } = productMatch ? productMatch : { ItemName: "" };

//         return { id, ItemName, quantity };
//       });

//       setProductlist(products);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // console.log(productList);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(productList);
//     console.log(selectedProducts);

//     selectedProducts.forEach((order) => {
//       const item = productList.find((item) => item.id === order.id);
//       if (item && item.quantity >= order.quantity) {
//         item.quantity -= order.quantity;
//       }
//     });
//   };

//   return (
//     <div style={{ marginTop: "2rem" }} className="container">
//       <div className="container">
//         <div className="col-3"></div>
//         <div>
//           <SelectGodown selectGodown={selectGodown} />
//         </div>
//         <div>
//           <button onClick={SearchProductHandler}>Search Product</button>
//         </div>
//       </div>
//       <form>
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th></th>
//               <th>Product Name </th>
//               <th>Avaible Quantity</th>
//               <th>Quantity</th>
//             </tr>
//           </thead>
//           <tbody>
//             {productList.map((product) => (
//               <tr key={product.id}>
//                 <td>
//                   <input
//                     type="checkbox"
//                     name={product.id}
//                     onChange={handleProductSelection}
//                   />
//                 </td>
//                 <td>{product.ItemName}</td>
//                 <td>{product.quantity}</td>
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
//         <button
//           type="submit"
//           className="btn btn-primary"
//           onClick={handleSubmit}
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Outward;

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

import SelectGodown from "../Inward/selectGodown";

import GodownContext from "../../../contexts/GodownContext";

function Outward() {
  const { product } = useContext(GodownContext);
  const [godownData, setGodownData] = useState(null);
  const [Godown, selectedGodown] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productList, setProductlist] = useState([]);
  const [updatedProduct, setUpdatedProduct] = useState([]);

  const selectGodown = (selGod) => {
    selectedGodown(selGod);
  };

  console.log(selectedProducts);
  console.log(productList);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/godown/${Godown}`)
      .then((response) => setGodownData(response.data))
      .catch((error) => console.log(error));
  }, [Godown]);
  console.log(godownData);

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

  const SearchProductHandler = async (e) => {
    try {
      e.preventDefault();
      const products = godownData.products.map((item) => {
        const { id, quantity } = item;
        const productMatch = product.find((p) => p.id === id);
        const { ItemName } = productMatch ? productMatch : { ItemName: "" };

        return { id, ItemName, quantity };
      });
      const updatedProduct = godownData.products.map((item) => {
        const { id, quantity } = item;

        return { id, quantity };
      });

      setProductlist(products);
      setUpdatedProduct(updatedProduct);
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(productList);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Product List", productList);
    console.log("Selected", selectedProducts);
    console.log("Updated", updatedProduct);
    console.log("godown updated", godownData.products);

    selectedProducts.forEach((order) => {
      const item = productList.find((item) => item.id === order.id);
      if (item && item.quantity >= order.quantity) {
        item.quantity -= order.quantity;
      }
    });
    selectedProducts.forEach((order) => {
      const item = updatedProduct.find((item) => item.id === order.id);
      if (item && item.quantity >= order.quantity) {
        item.quantity -= order.quantity;
      }
    });
    godownData.products = updatedProduct;
    console.log(godownData.products);
    console.log(godownData);

    axios
      .put(`http://localhost:3030/godown/${Godown}`, godownData)
      .then((response) => {
        console.log("Product array updated successfully");
      })
      .catch((error) => {
        console.error("Error updating product array:", error);
      });
  };

  return (
    <div style={{ marginTop: "2rem" }} className="container">
      <div className="container">
        <div className="col-3"></div>
        <div>
          <SelectGodown selectGodown={selectGodown} />
        </div>
        <div>
          <button onClick={SearchProductHandler}>Search Product</button>
        </div>
      </div>
      <form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>Product Name </th>
              <th>Avaible Quantity</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product) => (
              <tr key={product.id}>
                <td>
                  <input
                    type="checkbox"
                    name={product.id}
                    onChange={handleProductSelection}
                  />
                </td>
                <td>{product.ItemName}</td>
                <td>{product.quantity}</td>
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
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Outward;
