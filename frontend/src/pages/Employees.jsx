import { useEffect, useState } from "react";
import api from "../services/api";

function Employees() {

  const [employees, setEmployees] = useState([]);

  useEffect(() => {

    const token = localStorage.getItem("token");

    api.get("/employees", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      setEmployees(res.data);
    });

  }, []);

  return (
    <div className="container mt-5">

      <h2>Employees</h2>

      <table className="table table-bordered">

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Designation</th>
          </tr>
        </thead>

        <tbody>

          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>{emp.designation}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Employees;