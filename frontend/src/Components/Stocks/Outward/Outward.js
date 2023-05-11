import { useState, useEffect, useContext } from "react";
import axios from "axios";

import SelectGodown from "../Inward/selectGodown";
import DatePicker from "react-datepicker";
import Box from "@mui/material/Box";

import GodownContext from "../../../contexts/GodownContext";
import { useNavigate } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { v4 as uuid } from "uuid";
import "./Outward.css";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
} from "@mui/material";
import Table from "@mui/material/Table";
import SelectSupplier from "../selectSupplier";
import moment from "moment";

function Outward() {
  const navigate = useNavigate();
  const { product, updateGodown } = useContext(GodownContext);
  const [products, setProducts] = useState([]);
  const [godownData, setGodownData] = useState(null);
  const [Godown, selectedGodown] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productList, setProductlist] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [customer, setCustomer] = useState("");
  const [formattedDate, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [weight, setWeight] = useState("");
  const [location, setLocation] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [outward, setOutward] = useState();

  const [open, setOpen] = useState(false);

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

  const handleCustomerChange = (event) => {
    setCustomer(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const selectGodown = (selGod) => {
    selectedGodown(selGod);
  };

  const handleCustomerNameChange = (event) => {
    setCustomerName(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  console.log(selectedProducts);
  console.log(productList);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/items`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetchData();
  }, [Godown, outward]);
  console.log(godownData);

  const fetchData = async () => {
    const result = await axios.get(`http://localhost:8080/godown/${Godown}`);
    setGodownData(result.data);
  };

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
  const SearchProductHandler = async (e) => {
    try {
      e.preventDefault();
      const products = godownData.godownItems.map((item) => {
        const { itemId, quantity } = item;
        const productMatch = product.find((p) => p.itemId === itemId);
        const { itemName } = productMatch ? productMatch : { itemName: "" };

        return { itemId, itemName, quantity };
      });
      const updatedProduct = godownData.godownItems.map((item) => {
        const { id, quantity } = item;

        return { id, quantity };
      });

      setProductlist(products);
      setUpdatedProduct(updatedProduct);
    } catch (error) {
      console.error(error);
    }
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
      console.log("Total Amount:", totalAmount);
    } catch (error) {
      console.error(error);
    }

    console.log("Selected", selectedProducts);
  };

  // console.log(productList);
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Product List", productList);

    console.log("Updated", updatedProduct);
    console.log("godown updated", godownData.products);

    // selectedProducts.forEach((order) => {
    //   const item = productList.find((item) => item.id === order.id);
    //   if (item && item.quantity >= order.quantity) {
    //     item.quantity -= order.quantity;
    //   }
    // });
    // selectedProducts.forEach((order) => {
    //   const item = updatedProduct.find((item) => item.id === order.id);
    //   if (item && item.quantity >= order.quantity) {
    //     item.quantity -= order.quantity;
    //   }
    // });
    // godownData.products = updatedProduct;
    // godownData.Capacity += weight;
    // console.log(godownData.products);
    // console.log(godownData);

    // updateGodown(Godown, godownData);

    let newOutward = {
      godownId: Godown,
      outwardItem: selectedProducts,
      deliveredTo: customerName,
      billCheckedBy: godownData.supervisor,
      destination: location,
      billNumber: amount,
    };

    // OUTWARD POST :

    // {

    //     "godownId" : 164,

    //     "outwardItem" : [

    //         {

    //             "itemId": 72,

    //             "quantity" : 20

    //         }

    //     ],

    //     "deliveredTo" : "Pikachu",

    //     "billCheckedBy" : "Anant",

    //     "destination" : "Chennai",

    //     "billNumber" : 12983

    // }
    console.log("Outward", newOutward);
    axios
      .post("http://localhost:8080/outward", newOutward)
      .then((response) => {
        console.log(response);
        setOutward(newOutward);
      })
      .catch((error) => {
        console.log(error);
      });

    setSubmitting(true);
    handleClose();
    setSelectedProducts([]);
  };

  return (
    <>
      <h1>Deliveries</h1>
      <div className="outward-container">
        <div
          className="outward-head-container"
          style={{ display: "flex", alignItems: "center" }}
        >
          <SelectGodown selectGodown={selectGodown} />
          &nbsp; &nbsp;
          <TextField
            id="outlined-basic"
            label="Customer Name"
            variant="outlined"
            style={{ marginRight: "5px" }}
            value={customerName}
            onChange={handleCustomerNameChange}
          />
          <TextField
            id="outlined-basic"
            label="Location"
            variant="outlined"
            style={{ marginRight: "5px", marginLeft: "5px" }}
            value={location}
            onChange={handleLocationChange}
          />
          <Button
            variant="contained"
            size="small"
            className="browse-button"
            onClick={SearchProductHandler}
            sx={{ backgroundColor: "#574AC0" }}
            style={{ marginLeft: "5px" }}
          >
            Browse Godown
          </Button>
        </div>

        <div className="table-container">
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
                  <td>{product.quantity}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      name={`${product.itemId}-quantity`}
                      defaultValue={1}
                      onChange={handleQuantityChange}
                      disabled={
                        !selectedProducts.some(
                          (p) => p.itemId === product.itemId
                        )
                      }
                    />
                  </td>
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
            value={`Total Weight: ${weight} (in qq)`}
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
              <thead>
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
      </div>
    </>
  );
}

export default Outward;
