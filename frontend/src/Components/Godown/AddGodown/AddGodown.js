import React, { useContext, useState } from "react";
import "./AddGodown.css";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GodownContext from "../../../contexts/GodownContext";
import { FormControl } from "react-bootstrap";

const AddGodown = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [location, setLocation] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [capacity, setCapacity] = useState("");
  const [formattedDate, setDate] = useState("");
  const { addGodown } = useContext(GodownContext);

  function handleDateChange(date) {
    const datestr = new Date(date);

    const formated = datestr.toISOString().slice(0, 10);
    setSelectedDate(date);
    console.log(formated);
    setDate(formated);
  }

  const addGodownHandler = async (e) => {
    e.preventDefault();
    let newGodown = {
      godownLocation: location,
      godownCapacity: capacity,
      supervisor: supervisor,
      startDate: formattedDate,
      products: [],
    };

    addGodown(newGodown);
    navigate("/godown?added=true");
  };

  const isLocationValid = location.trim().length > 0;
  const isSupervisorValid = supervisor.trim().length > 0;
  const isCapacityValid =
    !isNaN(parseInt(capacity)) && capacity.trim().length > 0;

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
                {/* location */}
                <div className="form-group mb-3">
                  <label>Location:</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    required
                    className={`form-control ${
                      isLocationValid ? "" : "is-invalid"
                    }`}
                  />
                  {!isLocationValid && (
                    <div className="invalid-feedback">Location is required</div>
                  )}
                </div>

                {/* capacity */}

                <div className="form-group mb-3">
                  <label>Capacity:</label>
                  <input
                    type="text"
                    className={`form-control ${
                      isCapacityValid ? "" : "is-invalid"
                    }`}
                    value={capacity}
                    onChange={(event) => setCapacity(event.target.value)}
                    required
                    pattern="[0-9]+"
                  />
                  {!isCapacityValid && (
                    <div className="invalid-feedback">
                      Capacity is required and must be a number
                    </div>
                  )}
                </div>
                {/* supervisor */}
                <div className="form-group mb-3">
                  <label>Godown Supervisor:</label>
                  <input
                    type="text"
                    className={`form-control ${
                      isSupervisorValid ? "" : "is-invalid"
                    }`}
                    value={supervisor}
                    onChange={(event) => setSupervisor(event.target.value)}
                    required
                  />
                  {!isSupervisorValid && (
                    <div className="invalid-feedback">
                      Supervisor is required
                    </div>
                  )}
                </div>
                {/* date */}
                <div className="form-group mb-3">
                  <label>Select a date:</label>
                  <DatePicker
                    className="form-control"
                    selected={selectedDate}
                    onChange={handleDateChange}
                    required
                  />
                  {!formattedDate && (
                    <div className="invalid-feedback">Date is required</div>
                  )}
                </div>
                {/* buttons */}
                <div className="form-group">
                  <button
                    className="btn btn-success"
                    onClick={addGodownHandler}
                    disabled={
                      !isLocationValid ||
                      !isSupervisorValid ||
                      !isCapacityValid ||
                      !formattedDate
                    }
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
