// import { Table, Pane, Button } from "evergreen-ui";

// import { useState, useEffect } from "react";
// import React from "react";

// import axios from "axios";

// import { Outlet, useLocation, useNavigate } from "react-router-dom";

// import "./Godown.css";

// const Godown = () => {
//   const [godowns, setGodowns] = useState([]);

//   const navigate = useNavigate();

//   const location = useLocation();

//   const query = new URLSearchParams(location.search);

//   const isAdded = query.get("added");

//   const isDeleted = query.get("delete");

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await axios.get("http://localhost:3030/godown");

//       setGodowns(result.data);
//     };

//     fetchData();

//     navigate("/godown");
//   }, [isAdded, isDeleted]);

//   const handleDelete = (id) => {
//     axios

//       .delete(`http://localhost:3030/godown/${id}`)

//       .then((response) => {
//         console.log("Resource deleted successfully");

//         // remove deleted resource from state
//       })

//       .catch((error) => {
//         console.log("Error deleting resource: " + error);
//       });

//     navigate("/godown?delete=true");
//   };

//   return (
//     <div className="table-wrapper">
//       <Pane>
//         <Table>
//           <Table.Head>
//             <Table.TextHeaderCell>Godown ID</Table.TextHeaderCell>

//             <Table.TextHeaderCell>Location</Table.TextHeaderCell>

//             <Table.TextHeaderCell>Capacity</Table.TextHeaderCell>

//             <Table.TextHeaderCell>Supervisor</Table.TextHeaderCell>

//             <Table.TextHeaderCell>Date Established</Table.TextHeaderCell>

//             <Table.TextHeaderCell />
//           </Table.Head>

//           <Table.Body height={240}>
//             {godowns.map((godown) => (
//               <Table.Row key={godown.id}>
//                 <Table.TextCell>{godown.id}</Table.TextCell>

//                 <Table.TextCell>{godown.location}</Table.TextCell>

//                 <Table.TextCell>{godown.Capacity}</Table.TextCell>

//                 <Table.TextCell>{godown.GodownSupervisor}</Table.TextCell>

//                 <Table.TextCell>{godown.createdAt}</Table.TextCell>

//                 <Table.TextCell>
//                   <Button
//                     appearance="primary"
//                     intent="danger"
//                     onClick={() => handleDelete(godown.id)}
//                   >
//                     Delete
//                   </Button>
//                 </Table.TextCell>
//               </Table.Row>
//             ))}
//           </Table.Body>
//         </Table>

//         <div className="button">
//           <div className="">
//             <Button
//               appearance="primary"
//               intent="success"
//               className="add-godown-btn"
//               onClick={() => navigate("/godown/add-godown")}
//             >
//               Add Godown
//             </Button>
//           </div>
//         </div>

//         <Outlet />
//       </Pane>
//     </div>
//   );
// };

// export default Godown;

// import { useState, useEffect, useContext } from "react";
// import React from "react";
// import axios from "axios";

// import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import "./Godown.css";
// import GodownContext from "../../contexts/GodownContext";

// const Godown = () => {
//   const [godowns, setGodowns] = useState([]);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const query = new URLSearchParams(location.search);
//   const isAdded = query.get("added");
//   const isDeleted = query.get("delete");
//   const { godown, deleteGodown } = useContext(GodownContext);

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await axios.get("http://localhost:3030/godown");
//       setGodowns(result.data);
//     };

//     fetchData();
//     navigate("/godown");
//   }, [isAdded, isDeleted]);

//   const handleDelete = (id) => {
//     deleteGodown(id);

//     navigate("/godown?delete=true");
//   };

//   return (
//     <div className="container">
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>Godown ID</th>
//             <th>Location</th>
//             <th>Capacity</th>
//             <th>Supervisor</th>
//             <th>Date Established</th>
//             <th></th>
//           </tr>
//         </thead>
//         <tbody>
//           {godowns.map((godown) => (
//             <tr key={godown.id}>
//               <td>{godown.id}</td>
//               <td>{godown.location}</td>
//               <td>{godown.Capacity}</td>
//               <td>{godown.GodownSupervisor}</td>
//               <td>{godown.createdAt}</td>
//               <td>
//                 <button
//                   type="button"
//                   className="btn btn-danger"
//                   onClick={() => handleDelete(godown.id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="button">
//         <div className="">
//           <button
//             type="button"
//             className="btn btn-success add-godown-btn"
//             onClick={() => navigate("/godown/add-godown")}
//           >
//             Add Godown
//           </button>
//         </div>
//       </div>
//       <Outlet />
//     </div>
//   );
// };

// export default Godown;

import { Autocomplete, Button } from "evergreen-ui";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

import { useState, useEffect } from "react";
import React from "react";

import Box from "@mui/material/Box";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BsAlignStart } from "react-icons/bs";
import { red } from "@nextui-org/react";

import "./Godown.css";
import { Hidden } from "@mui/material";

const Godown = () => {
  const [godowns, setGodowns] = useState([]);

  const [editableGodown, setEditableGodown] = useState({});

  const [showPopup, setShowPopup] = useState(false);

  const [showPopupDel, setShowPopupDel] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  const query = new URLSearchParams(location.search);

  const isAdded = query.get("added");

  const isDeleted = query.get("delete");

  //Editable vars
  const [locationVar, setLocationVar] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:3030/godown");
      console.log("Godowns object -->", result?.data);
      setGodowns(result.data);
    };

    fetchData();

    navigate("/godown");
  }, [isAdded, isDeleted]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3030/godown/${id}`)
      .then((response) => {
        console.log("Resource deleted successfully");
        // remove deleted resource from state
      })
      .catch((error) => {
        console.log("Error deleting resource: " + error);
      });
    setShowPopupDel(true);

    setTimeout(() => {
      setShowPopupDel(false);
    }, 2000);
    navigate("/godown?delete=true");
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#333333",
      color: "#ffffff",
      fontWeight: 700,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const TableWrapper = styled(TableContainer)({
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem",
    marginLeft: "2rem",
    marginRight: "2rem",

    // width: "70%",
  });
  const tableStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };
  const AnimatingStyledTableCell = styled(StyledTableCell)({
    transition: "all 0.2s ease-in-out",
    "&:hover": {},
  });

  const AnimatedStyledTableRow = styled(StyledTableRow)({
    transition: "all 0.2s ease-in-out",
    "&:hover": {},
    "& .DeleteTwoToneIcon": {
      cursor: "pointer",
      color: "#ff1744",
      "&:hover": {
        color: "#d50000",
      },
    },
    "& .EditTwoToneIcon": {
      cursor: "pointer",
      color: "#ff1744",
      "&:hover": {
        color: "#d50000",
      },
    },
    "& .SaveIcon": {
      cursor: "pointer",
      color: "#ff1744",
      "&:hover": {
        color: "#d50000",
      },
    },
  });

  const handleEditGodown = (id) => {
    axios
      .put(`http://localhost:3030/godown/${id}`, editableGodown)
      .then((response) => {
        const updatedGodown = response.data;
        setGodowns(
          godowns.map((row) =>
            row.id === updatedGodown.id ? updatedGodown : row
          )
        );
        setEditableGodown({});
        setShowPopup(true);

        setTimeout(() => {
          setShowPopup(false);
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h1>Godowns</h1>
      <div>
        {showPopup && (
          <div className="popup">Godown Details updated successfully!</div>
        )}
        {showPopupDel && (
          <div className="popupDel">Godown Details Deleted successfully!</div>
        )}
        <div className="TableWrapper">
          <div style={{ tableStyles, BsAlignStart }}>
            {/* <TableWrapper component={Paper}> */}
            <TableContainer style={{ maxHeight: 400, overflowX: "hidden" }}>
              <Table stickyHeader sx={{ minWidth: 200 }}>
                <TableHead>
                  <TableRow>
                    <AnimatingStyledTableCell align="center">
                      Godown location
                    </AnimatingStyledTableCell>
                    <AnimatingStyledTableCell align="center">
                      Capacity (qq)
                    </AnimatingStyledTableCell>
                    <AnimatingStyledTableCell align="center">
                      Supervisor
                    </AnimatingStyledTableCell>
                    <AnimatingStyledTableCell align="center">
                      Date Established
                    </AnimatingStyledTableCell>
                    <AnimatingStyledTableCell align="center" colSpan={2}>
                      Actions
                    </AnimatingStyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {godowns.map((row, index) =>
                    isEditing && row.id === editableGodown.id ? (
                      <TableRow>
                        <TableCell>
                          {" "}
                          <TextField
                            name="location"
                            value={editableGodown.location}
                            style={{ width: "100%" }}
                            onChange={(e) => {
                              setEditableGodown({
                                ...editableGodown,
                                location: e.target.value,
                              });
                            }}
                            key={`Test-${index + 1}`}
                          />
                        </TableCell>
                        <TableCell>
                          {" "}
                          <TextField
                            type="text"
                            name="Capacity"
                            value={editableGodown.Capacity}
                            style={{ width: "100%" }}
                            onChange={(e) =>
                              setEditableGodown({
                                ...editableGodown,
                                Capacity: e.target.value,
                              })
                            }
                          />
                        </TableCell>
                        <TableCell>
                          {" "}
                          <TextField
                            type="text"
                            name="GodownSupervisor"
                            value={editableGodown.GodownSupervisor}
                            style={{ width: "100%" }}
                            onChange={(e) =>
                              setEditableGodown({
                                ...editableGodown,
                                GodownSupervisor: e.target.value,
                              })
                            }
                          />
                        </TableCell>
                        <TableCell>
                          {" "}
                          <TextField
                            type="text"
                            name="createdAt"
                            value={editableGodown.createdAt}
                            style={{ width: "100%" }}
                            onChange={(e) =>
                              setEditableGodown({
                                ...editableGodown,
                                createdAt: e.target.value,
                              })
                            }
                          />
                        </TableCell>
                        <AnimatingStyledTableCell>
                          {" "}
                          {/* <button type="submit" onClick={handleUpdate}>
                        update
                      </button> */}
                          <SaveIcon
                            className="SaveIcon"
                            fontSize="medium"
                            color="#ff1744"
                            alignItems="center"
                            onClick={() => handleEditGodown(row.id)}
                          ></SaveIcon>
                        </AnimatingStyledTableCell>
                        <AnimatingStyledTableCell colSpan={2} align="center">
                          <CancelIcon
                            className="CancelIcon"
                            fontSize="medium"
                            color="#ff1744"
                            alignItems="center"
                            onClick={() => setEditableGodown(false)}
                          ></CancelIcon>
                        </AnimatingStyledTableCell>
                      </TableRow>
                    ) : (
                      <AnimatedStyledTableRow key={index}>
                        <AnimatingStyledTableCell align="center">
                          {row.location}
                        </AnimatingStyledTableCell>
                        <AnimatingStyledTableCell align="center">
                          {row.Capacity}
                        </AnimatingStyledTableCell>
                        <AnimatingStyledTableCell align="center">
                          {row.GodownSupervisor}
                        </AnimatingStyledTableCell>
                        <AnimatingStyledTableCell align="center">
                          {row.createdAt}
                        </AnimatingStyledTableCell>
                        <AnimatingStyledTableCell align="right">
                          <DeleteTwoToneIcon
                            className="DeleteTwoToneIcon"
                            fontSize="medium"
                            color="action"
                            onClick={() => handleDelete(row.id)}
                          />
                        </AnimatingStyledTableCell>
                        <AnimatingStyledTableCell align="left">
                          <EditTwoToneIcon
                            className="EditTwoToneIcon"
                            fontSize="medium"
                            color="action"
                            alignItems="center"
                            onClick={() => {
                              setEditableGodown(row);
                              setIsEditing(true);
                            }}
                          />
                        </AnimatingStyledTableCell>
                      </AnimatedStyledTableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {/* </TableWrapper> */}
          </div>
        </div>
        <div className="button">
          <div className="">
            <Button
              appearance="primary"
              intent="primary"
              className="add-godown-btn"
              onClick={() => navigate("/godown/add-godown")}
            >
              Add Godown
            </Button>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Godown;
