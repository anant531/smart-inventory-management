// import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import UserCard from "./UserCard/UserCard";

// const UserPage = () => {
//   const [employee, setEmployee] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   useEffect(() => {
//     fetch("http://localhost:3030/employee")
//       .then((response) => response.json())
//       .then((result) => {
//         setEmployee(
//           result.map((exp) => {
//             return { ...exp };
//           })
//         );
//       })
//       .catch(console.error);
//   }, []);

//   return (
//     <div className="container">
//       <div className="row-flex">
//         <div className=" title text-center mb-3">Employee Details</div>
//       </div>
//       <div className="col-9 offset-9 search-bar">
//         <input
//           type="text"
//           placeholder="Search.."
//           className=" form-control form-control-sm"
//           value={searchTerm}
//           onChange={(event) => {
//             setSearchTerm(event.target.value);
//           }}
//         />
//       </div>
//       <div className="row">
//         {employee
//           .filter((val) => {
//             if (searchTerm === "") {
//               return val;
//             } else if (
//               val.userName
//                 .toLowerCase()
//                 .includes(searchTerm.toLocaleLowerCase()) ||
//               val.role.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
//               val.email.toLowerCase().includes(searchTerm.toLocaleLowerCase())
//             ) {
//               return val;
//             }
//           })
//           .map((emp) => (
//             <div className="col-4 mb-4" key={emp.id}>
//               <UserCard
//                 key={emp.id}
//                 employee={emp}
//                 css={{ padding: "10px", mw: "200px" }}
//               />
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default UserPage;
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UserCard from "./UserCard/UserCard";

const UserPage = () => {
  const [employee, setEmployee] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/user")
      .then((response) => response.json())
      .then((result) => {
        setEmployee(
          result.map((exp) => {
            return { ...exp };
          })
        );
      })
      .catch(console.error);
  }, []);

  const filteredEmployee = employee.filter((val) => {
    if (searchTerm === "") {
      return val;
    } else if (
      val.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      val.role.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      val.email.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    ) {
      return val;
    }
  });

  return (
    <div className="container">
      <div className="row-flex">
        <div className="title text-center mb-3">Employee Details</div>
      </div>
      <div className="col-9 offset-9 search-bar">
        <input
          type="text"
          placeholder="Search.."
          className="form-control form-control-sm"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </div>
      {filteredEmployee.length === 0 && (
        <div className="alert alert-warning" role="alert">
          No records found!
        </div>
      )}
      <div
        className="row"
        style={{ height: "400px", overflow: "auto", overflowX: "hidden" }}
      >
        {filteredEmployee.map((emp) => (
          <div className="col-4 mb-4" key={emp.userId}>
            <UserCard
              key={emp.userId}
              user={emp}
              css={{ padding: "10px", mw: "200px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
