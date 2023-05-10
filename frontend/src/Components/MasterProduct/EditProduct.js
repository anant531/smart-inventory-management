import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core";

const EditProduct = (props) => {
  const { dialogOpen, onCancel, id, fetchData } = props;

  const [product, setProduct] = useState({
    itemId: "",
    itemName: "",
    category: "",
    amount: "",
    weight: "",
  });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const product_id = query.get("id");

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  const fetchProduct = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/items/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8080/items/${id}`, product);
      fetchData();
      onCancel();
      // handle successful update, navigate or perform other actions
    } catch (error) {
      console.log(error);
    }
    navigate("/product");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={dialogOpen}
        onClose={onCancel}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="itemName"
            name="itemName"
            label="Item Name"
            type="text"
            fullWidth
            value={product.itemName}
            onChange={handleInputChange}
          />

          <TextField
            margin="dense"
            id="category"
            name="category"
            label="Category"
            type="text"
            fullWidth
            value={product.category}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="amount"
            name="amount"
            label="Amount"
            type="text"
            fullWidth
            value={product.amount}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="weight"
            name="weight"
            label="Weight"
            type="text"
            fullWidth
            value={product.weight}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditProduct;
