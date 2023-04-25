import React from "react";
import "./UserCard.css";

const UserCard = (props) => {
  return (
    <div className="card text-center">
      <div className="overflow">
        <img src={props.employee.imageUrl} alt="" className="card-img-top" />
      </div>
      <div className="card-body text-dark">
        <h4 className="card-title">{props.employee.userName}</h4>
        <div className="card-text text-secondary">
          <p className="role">{props.employee.role}</p>

          <p className="phone">📞 :{props.employee.phone}</p>
          <a href={`mailto:${props.employee.email}`}>
            📧 {props.employee.email}
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
