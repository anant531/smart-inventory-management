import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import ReceiptIcon from "@mui/icons-material/Receipt";
import { ProductDialog } from "./ProductDialog";

import { useNavigate } from "react-router-dom";

function ReceiptTable() {
  const [receipts, setReceipts] = useState([]);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3030/inward")
      .then((response) => setReceipts(response.data))
      .catch((error) => console.log(error));
  }, []);
  function handleRowClick(receipt) {
    setSelectedReceipt(receipt);
    navigate(`inward-data/${receipt.id}`);
  }
  console.log(selectedReceipt);

  function handleClose() {
    setSelectedReceipt(null);
  }
  console.log(receipts);

  return (
    <div>
      <h1>Receipts</h1>
      <table>
        <thead>
          <tr>
            <th>Inward ID</th>
            <th>Godown ID</th>
            <th>DateOfSupply</th>

            <th>Supplier Name</th>

            <th>View Invoice</th>
          </tr>
        </thead>
        <tbody>
          {receipts.map((receipt) => (
            <tr key={receipt.id}>
              <td>{receipt.id}</td>
              <td>{receipt.GodownId}</td>
              <td>{receipt.DateOfSupply}</td>

              <td>{receipt.SupplierName}</td>

              <td>
                <ReceiptIcon
                  key={receipt.id}
                  onClick={() => handleRowClick(receipt)}
                ></ReceiptIcon>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedReceipt && (
        <ProductDialog receipt={selectedReceipt} onClose={handleClose} />
      )}
    </div>
  );
}

export default ReceiptTable;
