import React from "react";
import "./AccessDeniedPage.css"; // Import the CSS file for styling

const AccessDeniedPage = () => {
  return (
    <div className="access-denied-container">
      <h1 className="access-denied-heading">Access Denied</h1>
      <p className="access-denied-message">
        You do not have permission to access this page.
      </p>
    </div>
  );
};

export default AccessDeniedPage;
