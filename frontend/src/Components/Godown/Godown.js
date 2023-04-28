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

import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Godown.css";

const Godown = () => {
  const [godowns, setGodowns] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const isAdded = query.get("added");
  const isDeleted = query.get("delete");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:3030/godown");
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

    navigate("/godown?delete=true");
  };

  return (
    <div className="container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Godown ID</th>
            <th>Location</th>
            <th>Capacity</th>
            <th>Supervisor</th>
            <th>Date Established</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {godowns.map((godown) => (
            <tr key={godown.id}>
              <td>{godown.id}</td>
              <td>{godown.location}</td>
              <td>{godown.Capacity}</td>
              <td>{godown.GodownSupervisor}</td>
              <td>{godown.createdAt}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(godown.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button">
        <div className="">
          <button
            type="button"
            className="btn btn-success add-godown-btn"
            onClick={() => navigate("/godown/add-godown")}
          >
            Add Godown
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Godown;
