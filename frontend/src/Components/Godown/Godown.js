import { Table } from "evergreen-ui";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Godown.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Godown = () => {
  const [godown, setGodown] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const isAdded = query.get("added");
  const isDeleted = query.get("delete");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(" http://localhost:3030/godown");
      setGodown(result.data);
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
    <div>
      <h1>Godown</h1>

      <Table>
        <Table.Head>
          <Table.TextHeaderCell>Godown ID</Table.TextHeaderCell>
          <Table.TextHeaderCell>Location</Table.TextHeaderCell>
          <Table.TextHeaderCell>Capacity</Table.TextHeaderCell>
          <Table.TextHeaderCell>Supervisor</Table.TextHeaderCell>
          <Table.TextHeaderCell>Date Established</Table.TextHeaderCell>
          <Table.TextHeaderCell></Table.TextHeaderCell>
        </Table.Head>
        <Table.Body height={240}>
          {godown.map((profile) => (
            <Table.Row key={profile.id}>
              <Table.TextCell>{profile.id}</Table.TextCell>
              <Table.TextCell>{profile.location}</Table.TextCell>
              <Table.TextCell>{profile.Capacity}</Table.TextCell>
              <Table.TextCell>{profile.GodownSupervisor}</Table.TextCell>
              <Table.TextCell>{profile.createdAt}</Table.TextCell>
              <Table.TextCell>
                <div key={profile.id}>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(profile.id)}
                  >
                    Delete
                  </button>
                </div>
              </Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className="button">
        <div className="col-2 offset-5">
          <button
            className="btn btn-success my-10"
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
