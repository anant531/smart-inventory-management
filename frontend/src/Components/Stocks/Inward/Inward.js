import { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import "./Inward.css";
import SelectGodown from "./selectGodown";
import SearchProduct from "../../MasterProduct/SearchProduct";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Table from "@mui/material/Table";
import { useLocation, useNavigate } from "react-router-dom";
import SelectSupplier from "../selectSupplier";
import { v4 as uuid } from "uuid";
import moment from "moment/moment";
import GodownContext from "../../../contexts/GodownContext";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [Godown, selectedGodown] = useState("");
  const [godownData, setGodownData] = useState(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const [category, selectedcat] = useState("Snacks");
  const [supplier, selectSupplier] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const isAdded = query.get("added");
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [formattedDate, setDate] = useState("");
  const [weight, setWeight] = useState("");
  const { addInward } = useContext(GodownContext);

  const uniqueId = uuid();
  const smallId = uniqueId.slice(0, 8);

  function handleDateChange(date) {
    const datestr = new Date(date);
    console.log("Date beforew format -->", date, datestr);
    const formated = moment(datestr).format("YYYY-MM-DD");
    setSelectedDate(date);
    console.log("date", formated);
    setDate(formated);
  }

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      .then((response) => {
        setGodownData(response.data);
        console.log("Godwn in use effect -->", response.data);
      })
      .catch((error) => console.log(error));
  }, [isAdded, Godown]);
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

  const handleCalculate = async (event) => {
    try {
      event.preventDefault();
      let totalAmount = 0;
      let totalWeight = 0;
      selectedProducts.forEach((product) => {
        const { id, quantity } = product;
        const { Amount, Weight } = products.find((price) => price.id === id);
        totalAmount += Amount * quantity;
        totalWeight += quantity * Weight;
        setWeight(totalWeight / 100);
        setAmount(totalAmount);
      });
      console.log("Total Amount:", totalAmount, totalWeight);
    } catch (error) {
      console.error(error);
    }
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
      godown.Capacity -= weight;
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
      handleClose();
      console.log("Updated products:", updatedProducts);
      // navigate("/inward?added=true");
      let newInward = {
        recieptNo: smallId,
        SupplierName: supplier,
        GodownId: Godown,
        DateOfSupply: formattedDate,
        RecievedBy: godownData.GodownSupervisor,
        Amount: amount,
        product: updatedProducts,
      };
      console.log(newInward);
      axios
        .post("http://localhost:3030/inward", newInward)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      return updateResponse.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Inward Request</h1>
      <div className="container">
        <div className="row justify-content-end mb-3">
          <div className="col-auto ml-auto">
            <SearchProduct
              selectedCategory={selectedCategory}
              category={category}
            />
          </div>
        </div>
        <div className="row justify-content-between align-items-center">
          <div className="col-auto">
            <SelectGodown selectGodown={selectGodown} />
          </div>
          <div className="col-auto">
            <SelectSupplier
              selectedSupplier={supplier}
              handleChange={(val) => selectSupplier(val)}
            />
          </div>
          <div className="col-auto">
            <label>Select a date:</label>
            <DatePicker
              className="form-control-sm"
              selected={selectedDate}
              onChange={handleDateChange}
              required
            />
            {!formattedDate && (
              <div className="invalid-feedback">Date is required</div>
            )}
          </div>
        </div>
        <Table>
          <thead>
            <tr>
              <th>Add</th>
              <th>Product Name </th>
              <th>Quantity (kg)</th>
              <th>Amount/Unit</th>
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
                <td>
                  <input
                    type="number"
                    min="1"
                    name={`${product.id}-quantity`}
                    defaultValue={1}
                    onChange={handleQuantityChange}
                  />
                </td>
                <td>₹{product.Amount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="container">
          <div className="row justify-content-between ">
            <button
              onClick={handleCalculate}
              className="btn btn-primary mb-3 col-auto"
            >
              Calculate
            </button>
            <p className="Amount col-auto mt-4">Total Amount : ₹{amount}</p>
            <p className="Amount col-auto mt-4">Total Weight : {weight} q</p>
            <button
              onClick={handleOpen}
              className="btn btn-primary mb-3 col-auto"
            >
              Submit
            </button>
          </div>
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            Are you sure you want to add the following products?
            <Table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map((selectedProduct) => {
                  const { id, quantity } = selectedProduct;
                  const { ItemName } = products.find((p) => p.id === id) || {};
                  return (
                    <tr key={id}>
                      <td> {ItemName}</td>
                      <td>X {quantity}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            {/* {selectedProducts.map((selectedProduct) => {
              const { id, quantity } = selectedProduct;
              const { ItemName } = products.find((p) => p.id === id) || {};

              return (
                <div key={id}>
                  <p>Product Name: {ItemName}</p>
                  <p>Quantity: {quantity}</p>
                </div>
              );
            })} */}
            <p
              className="center"
              style={{
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Total Amount: ₹{amount}
            </p>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} style={{ color: "red" }}>
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>

        {/* <form onSubmit={handleSubmit}>
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
      </form> */}
      </div>
    </>
  );
}

export default ProductList;
