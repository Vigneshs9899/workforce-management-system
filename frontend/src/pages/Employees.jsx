import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { exportToExcel } from "../utils/exportExcel";


function Employees() {

  const [employees, setEmployees] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");

  const fetchEmployees = () => {

    const token = localStorage.getItem("token");

    api.get(
      "/employees",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then((res) => {
      setEmployees(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  };


  const updateEmployee = async () => {

  const token = localStorage.getItem("token");

  await api.put(
    `/employees/${editId}`,
    {
      name,
      email,
      phone,
      department,
      designation
    },
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  );

  toast.info("Employee updated");

  fetchEmployees();

  setEditId(null);

  setName("");
  setEmail("");
  setPhone("");
  setDepartment("");
  setDesignation("");

};

  const deleteEmployee = async(id)=>{

const token = localStorage.getItem("token");

await api.delete(
`/employees/${id}`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

fetchEmployees();

toast.error("Employee deleted");

}

const editEmployee=(emp)=>{

setEditId(emp.id);

setName(emp.name);
setEmail(emp.email);
setPhone(emp.phone);
setDepartment(emp.department);
setDesignation(emp.designation);



}

  const addEmployee = async () => {

    const token = localStorage.getItem("token");

    

    try {

      await api.post(
        "/employees",
        {
          name,
          email,
          phone,
          department,
          designation
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchEmployees();

      setName("");
      setEmail("");
      setPhone("");
      setDepartment("");
      setDesignation("");

    }

    catch (error) {

      console.log(error.response?.data);

    }

    toast.success("Employee added successfully");

  };

  useEffect(() => {

    fetchEmployees();

  }, []);


  const filteredEmployees = employees.filter((emp) =>
  emp.name.toLowerCase().includes(search.toLowerCase())
);

  return (

    <div className="container mt-5">

      <h2>Employees</h2>

      <input
        className="form-control mb-2"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Designation"
        value={designation}
        onChange={(e) => setDesignation(e.target.value)}
      />

     <button
      className="btn btn-primary"
      onClick={
        editId
        ? updateEmployee
        : addEmployee
      }
      >
      Save Employee
    </button>

      <button
className="btn btn-success ms-2"
onClick={() =>
  exportToExcel(employees, "employees")
}
>
Export Excel
</button>

    <input
  className="form-control mb-3"
  placeholder="Search employee by name"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
   

      <table className="table table-bordered">

        <thead>

          <tr>
            <th>Employee Code</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {filteredEmployees.map((emp) => (

            <tr key={emp.id}>

            <td>{emp.employee_code}</td>
            <td>{emp.name}</td>
            <td>{emp.email}</td>
            <td>{emp.phone}</td>
            <td>{emp.department}</td>
            <td>{emp.designation}</td>
            <td>
  <span className="badge bg-success">
    {emp.status}
  </span>
</td>

            <td>

            <button
className="btn btn-warning btn-sm"
onClick={() => editEmployee(emp)}
>
Edit
</button>

            <button
            className="btn btn-danger btn-sm ms-2"
            onClick={()=>{
if(window.confirm("Delete Employee?")){
  deleteEmployee(emp.id)
}
}}
            >
            Delete
            </button>

            </td>

            </tr>

            ))}

            </tbody>

      </table>

    </div>

  );

}

export default Employees;