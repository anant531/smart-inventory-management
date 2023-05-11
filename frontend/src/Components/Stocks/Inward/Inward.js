import { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import "./Inward.css";
import FormControl from "@mui/material/FormControl";
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
  const [submitting, setSubmitting] = useState(false);

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

  function generateInvoiceId() {
    const randomNum = Math.floor(Math.random() * 1000000000); // generate a random number between 0 and 999,999,999
    const paddedNum = String(randomNum).padStart(9, "0"); // pad the number with leading zeros to make it 9 digits long
    const uniqueId = parseInt(paddedNum);
    return uniqueId;
  }

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

  const handleSelectedCategory = (selectedCategory) => {
    // Perform actions with the selectedCategory value
    console.log("Selected category:", selectedCategory);
    selectedcat(selectedCategory);
    // You can add your custom logic here based on the selectedCategory value
  };

  const filteredProducts = products.filter((cat) => cat.category === category);

  const selectGodown = (selGod) => {
    selectedGodown(selGod);
    console.log(Godown);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/godown/${Godown}`)
      .then((response) => {
        setGodownData(response.data);
        console.log("Godwn in use effect -->", response.data);
      })
      .catch((error) => console.log(error));
  }, [isAdded, Godown]);
  console.log(godownData);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/items`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleProductSelection = (event) => {
    const productId = parseInt(event.target.name);
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedProducts((prevState) => [
        ...prevState,
        { itemId: productId, quantity: 0 },
      ]);
    } else {
      setSelectedProducts((prevState) =>
        prevState.filter((product) => product.id !== productId)
      );
    }
  };

  const handleQuantityChange = (event) => {
    const productId = parseInt(event.target.name.split("-")[0]);
    const quantity = parseInt(event.target.value);
    setSelectedProducts((prevState) => {
      const productIndex = prevState.findIndex(
        (product) => product.itemId === productId
      );
      const newSelectedProducts = [...prevState];
      newSelectedProducts[productIndex] = { itemId: productId, quantity };
      return newSelectedProducts;
    });
  };

  const handleCalculate = async (event) => {
    try {
      event.preventDefault();
      let totalAmount = 0;
      let totalWeight = 0;
      selectedProducts.forEach((product) => {
        const { itemId, quantity } = product;
        const { amount, weight } = products.find(
          (price) => price.itemId === itemId
        );
        totalAmount += amount * quantity;
        totalWeight += quantity * weight;
        setWeight(totalWeight / 100);
        setAmount(totalAmount);
      });
      console.log("Total Amount:", selectedProducts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    // try {
    //   event.preventDefault();
    //   const response = await axios.get(
    //     `http://localhost:8080/godown/${Godown}`
    //   );
    //   const godown = response.data;

    //reducing the capacity and adding
    // godown.Capacity -= weight;
    // // abc
    // for (const selectedProduct of selectedProducts) {
    //   const existingProductIndex = godown.products.findIndex(
    //     (product) => product.id === selectedProduct.id
    //   );

    //   if (existingProductIndex !== -1) {
    //     // Update the quantity of the existing product
    //     const existingProduct = godown.products[existingProductIndex];
    //     const updatedProduct = {
    //       id: existingProduct.id,
    //       quantity: existingProduct.quantity + selectedProduct.quantity,
    //     };
    //     godown.products[existingProductIndex] = updatedProduct;
    //     updatedProducts.push(updatedProduct);
    //   } else {
    //     // Add the new product to the array
    //     godown.products.push(selectedProduct);
    //     updatedProducts.push(selectedProduct);
    //   }
    // }

    // const updateResponse = await axios.put(
    //   `http://localhost:8080/godown/${Godown}`,
    //   godown
    // );
    // handleClose();

    // navigate("/inward?added=true");
    let newInward = {
      godownId: Godown,
      inwardItem: selectedProducts,
      supplier: supplier,
      billCheckedBy: godownData.supervisor,
      invoiceNo: amount,
      receiptNo: generateInvoiceId(),
      receivedBy: godownData.godownLocation,
    };
    console.log("Inwrad", newInward);
    addInward(newInward);
    // axios
    //   .post("http://localhost:8080/inward", newInward)
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    setSubmitting(true);
    handleClose();
    setSelectedProducts([]); // Reset selectedProducts to an empty array

    //   return updateResponse.data;
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <>
      <h1 style={{ marginBottom: "25px", marginTop: "-21px" }}>
        Inward Request
      </h1>

      <div className="inward-container">
        <div className="inward-head-container">
          <SearchProduct
            handleSelectedCategory={handleSelectedCategory}
            category={category}
          />
          <SelectGodown selectGodown={selectGodown} />
          <SelectSupplier
            selectedSupplier={supplier}
            handleChange={(val) => selectSupplier(val)}
          />

          {!formattedDate && (
            <div className="invalid-feedback">Date is required</div>
          )}
        </div>

        {/* <div className="row justify-content-end mb-3">
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
        </div> */}
        <div className="inward-table-container">
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
                <tr key={product.itemId}>
                  <td>
                    <input
                      type="checkbox"
                      name={product.itemId}
                      onChange={handleProductSelection}
                      disabled={submitting}
                    />
                  </td>
                  <td>{product.itemName}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      name={`${product.itemId}-quantity`}
                      defaultValue={0}
                      onChange={handleQuantityChange}
                    />
                  </td>
                  <td>₹{product.amount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="footer-container">
          <button
            onClick={handleCalculate}
            className="btn btn-primary mb-3 col-auto"
          >
            Calculate
          </button>
          <input
            className="Amount col-auto mt-4 narrow-input"
            type="text"
            value={`Total Amount: ₹${amount}`}
            readOnly
            style={{
              margin: "0px 10px 0px 5px",
              fontSize: "20px",
              width: "auto",
            }}
          />
          <input
            className="Amount col-auto mt-4 narrow-input"
            type="text"
            value={`Total Weight: ${weight} (in q)`}
            readOnly
            style={{
              margin: "0px 10px 0px 5px",
              fontSize: "20px",
              width: "auto",
            }}
          />

          <button
            onClick={handleOpen}
            className="btn btn-primary mb-3 col-auto"
          >
            Submit
          </button>
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            Are you sure you want to add the following products?
            <Table>
              <thead style={{ color: "white" }}>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map((selectedProduct) => {
                  const { itemId, quantity } = selectedProduct;
                  const { itemName } =
                    products.find((p) => p.itemId === itemId) || {};
                  return (
                    <tr key={itemId}>
                      <td> {itemName}</td>
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
