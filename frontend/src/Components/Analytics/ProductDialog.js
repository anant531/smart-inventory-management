import React, { useContext } from "react";
import {
  Dialog,
  DialogActions,
  Button,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

import GodownContext from "../../contexts/GodownContext";

export function ProductDialog({ receipt, onClose }) {
  //   function renderProductRows() {

  //     return receipt.product.map((product) => (

  //       <TableRow key={product.id}>
  //         <TableCell>{product.id}</TableCell>
  //         <TableCell>{product.quantity}</TableCell>
  //       </TableRow>
  //     ));
  //   }

  const navigate = useNavigate();

  const { product } = useContext(GodownContext);
  console.log(product);

  return (
    <Dialog open={!!receipt} onClose={onClose}>
      <DialogTitle>Products</DialogTitle>
      <DialogContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {receipt.product.map((selectedProduct) => {
                const { id, quantity } = selectedProduct;
                const { ItemName } = product.find((p) => p.id === id) || {};
                return (
                  <tr key={id}>
                    <td> {ItemName}</td>
                    <td>X {quantity}</td>
                  </tr>
                );
              })}
            </TableBody>
          </Table>
          <p
            className="center"
            style={{
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            Total Amount: ₹{receipt.Amount}
          </p>
        </TableContainer>
        <DialogActions>
          {/* <Button
            onClick={() => {
              navigate("/analytics");
            }}
            style={{ color: "red" }}
          >
            Cancel
          </Button> */}
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
