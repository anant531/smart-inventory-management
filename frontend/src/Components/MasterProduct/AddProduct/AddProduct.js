import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GodownContext from "../../../contexts/GodownContext";

const useStyles = makeStyles({
  button: {
    background: "#000080",
    height: "auto-flex",
    color: "white",
    "&:hover": {
      background: "#000080",
    },
  },
  dialog: {
    "& .MuiDialog-paper": {
      minWidth: 400,
      maxWidth: 600,
      borderRadius: 10,
      overflow: "hidden",
    },
  },
  title: {
    background: "#000080",
    color: "white",
    padding: "20px 30px",
    fontWeight: "bold",
  },
  content: {
    padding: "20px",
  },
  input: {
    marginBottom: "20px",
    "& label.Mui-focused": {
      color: "#000080",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#000080",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#000080",
      },
    },
  },
  actions: {
    padding: "20px 30px",
  },
});

const AddProduct = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [total, setTotal] = useState(1);
  const { product, addProduct } = useContext(GodownContext);

  const uniqueCategories = product.reduce((categories, product) => {
    if (!categories.includes(product.Category)) {
      return [...categories, product.Category];
    }
    return categories;
  }, []);

  const [price, setPrice] = useState("");
  const [Weight, setWeight] = useState("");
  const [category, setCategory] = useState("");
  const [isCustomCategory, setIsCustomCategory] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddProduct = async () => {
    let newProduct = {
      itemName: name,
      supplier: supplierName,
      category: category,
      amount: price,
      weight: Weight,
    };
    console.log(newProduct);
    try {
      await addProduct(newProduct);
    } catch (error) {
      console.log(error);
    }
    navigate("/product?added=true");
    handleClose();
  };

  return (
    <>
      <Button
        size="small"
        variant="outlined"
        className={classes.button}
        onClick={handleClickOpen}
      >
        Add Product
      </Button>
      <Dialog open={open} onClose={handleClose} className={classes.dialog}>
        <DialogTitle className={classes.title}>Add Product</DialogTitle>
        <DialogContent className={classes.content}>
          <TextField
            className={classes.input}
            label="Product Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            className={classes.input}
            label="Supplier Name"
            variant="outlined"
            fullWidth
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={isCustomCategory}
                onChange={(e) => setIsCustomCategory(e.target.checked)}
              />
            }
            label="Custom Category"
          />
          <TextField
            className={classes.input}
            label="Category"
            variant="outlined"
            fullWidth
            disabled={!isCustomCategory}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          {!isCustomCategory && (
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                className={classes.input}
                label="category"
                variant="outlined"
                value={category}
                fullWidth
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {uniqueCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <TextField
            className={classes.input}
            label="Price"
            variant="outlined"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            className={classes.input}
            label="Weight"
            variant="outlined"
            fullWidth
            value={Weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleAddProduct}
            color="primary"
            variant="contained"
            type="submit"
          >
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddProduct;
