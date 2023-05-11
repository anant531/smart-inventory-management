import React from "react";
import "./UserCard.css";

const UserCard = (props) => {
  return (
    <div className="card text-center">
      <div className="overflow">
        <img src={props.user.imageUrl} alt="" className="card-img-top" />
      </div>
      <div className="card-body text-dark">
        <h4 className="card-title">{props.user.name}</h4>
        <div className="card-text text-secondary">
          <p className="role">{props.user.role.name}</p>

          <p className="phone">📞 :{props.user.phone}</p>
          <a href={`mailto:${props.user.email}`}>📧 {props.user.email}</a>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
