# smart-inventory-management

<!-- final -->

import React, { useState } from "react";
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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
button: {
background: "#000080",
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
padding: "30px",
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

const AddProductForm = () => {
const classes = useStyles();
const [open, setOpen] = useState(false);
const [name, setName] = useState("");
const [supplierName, setSupplierName] = useState("");

const [price, setPrice] = useState("");
const [category, setCategory] = useState("");

const handleClickOpen = () => {
setOpen(true);
};

const handleClose = () => {
setOpen(false);
};

const handleAddProduct = () => {
console.log(
`Adding product - name: ${name}, supplierName: ${supplierName}, category: ${category}, price: ${price}, `
);

    handleClose();

};

return (
<>
<Button className={classes.button} onClick={handleClickOpen}>
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
{/_ <TextField
className={classes.input}
label="category"
variant="outlined"
fullWidth
value={category}
onChange={(e) => setCategory(e.target.value)}
/> _/}

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
            <MenuItem value="electronics">Electronics</MenuItem>
            <MenuItem value="clothing">Clothing</MenuItem>
            <MenuItem value="books">Books</MenuItem>
          </Select>

          <TextField
            className={classes.input}
            label="Price"
            variant="outlined"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
          >
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
    </>

);
};

export default AddProductForm;
