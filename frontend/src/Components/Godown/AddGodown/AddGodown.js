import React, { useState } from "react";
import "./AddGodown.css";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const AddGodown = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [location, setLocation] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [capacity, setCapacity] = useState("");
  const [formattedDate, setDate] = useState("");

  function handleDateChange(date) {
    console.log(date);
    const datestr = new Date(date);

    const formated = datestr.toISOString().slice(0, 10);
    setSelectedDate(date);
    console.log(formated);
    setDate(formated);
  }
  const addGodownHandler = async (e) => {
    e.preventDefault();
    let newGodown = {
      location: location,
      Capacity: capacity,
      GodownSupervisor: supervisor,
      createdAt: formattedDate,
      products: [],
    };
    console.log(newGodown);
    try {
      const response = await axios.post(
        "http://localhost:3030/godown",
        newGodown,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    navigate("/godown?added=true");
  };

  return (
    <div>
      <div className="backdrop">
        <div className="msg-dialog">
          <div className="card">
            <div className="card-header">
              <h6 className="d-flex justify-content-between">
                Add New Godown
                <button
                  className="btn-dark "
                  onClick={() => navigate("/godown")}
                >
                  {" "}
                  ❌
                </button>
              </h6>
            </div>

            <div className="card-body">
              <form>
                {/* title */}
                <div className="form-group mb-3">
                  <label>Location:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    required
                  />
                </div>
                {/* body */}
                <div className="form-group mb-3">
                  <label>Capacity:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={capacity}
                    onChange={(event) => setCapacity(event.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Godown Supervisor:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={supervisor}
                    onChange={(event) => setSupervisor(event.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label> Select a date:</label>
                  <DatePicker
                    className="form-control"
                    selected={selectedDate}
                    onChange={handleDateChange}
                    required
                  />
                </div>
                {/* buttons */}
                <div className="form-group">
                  <button
                    className="btn btn-success"
                    onClick={addGodownHandler}
                  >
                    Add Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGodown;
