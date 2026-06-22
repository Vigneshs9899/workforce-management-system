import { useEffect, useState } from "react";
import api from "../services/api";
import { jwtDecode } from "jwt-decode";

function Jobs() {

  const token = localStorage.getItem("token");

const role = token
  ? jwtDecode(token).role
  : "";

  const [jobs, setJobs] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [jobName, setJobName] = useState("");
  const [customer, setCustomer] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Pending");
  const [dueDate, setDueDate] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  useEffect(() => {

    fetchJobs();

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
      });

  }, []);

  const fetchJobs = () => {

    const token = localStorage.getItem("token");

    api.get(
      "/jobs",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then((res) => {
        setJobs(res.data);
      });

  };

  const createJob = async () => {

    const token = localStorage.getItem("token");

    await api.post(
      "/jobs",
      {
        job_name: jobName,
        customer: customer,
        description: description,
        priority: priority,
        status: status,
        due_date: dueDate,
        employee_id: employeeId
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setJobName("");
    setCustomer("");
    setDescription("");
    setPriority("Medium");
    setStatus("Pending");
    setDueDate("");
    setEmployeeId("");

    fetchJobs();

  };

  const deleteJob = async (id) => {

    const token = localStorage.getItem("token");

    await api.delete(
      `/jobs/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    fetchJobs();

  };

  return (

    <div className="container mt-4">

      <h2>Jobs</h2>
      {
role === "ADMIN" && (

      <div className="card p-4 shadow mb-4">

        <input
          className="form-control mb-3"
          placeholder="Job Name"
          value={jobName}
          onChange={(e) => setJobName(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Customer"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="form-select mb-3"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input
          type="date"
          className="form-control mb-3"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        

        <select
          className="form-select mb-3"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        >
          <option value="">Select Employee</option>

          {
            employees.map(emp => (

              <option
                key={emp.id}
                value={emp.id}
              >
                {emp.name}
              </option>

            ))
          }

        </select>

        <button
          className="btn btn-primary"
          onClick={createJob}
        >
          Create Job
        </button>

      </div>
)}

<div className="table-responsive">
      <table className="table table-bordered table-hover">

        <thead>

          <tr>

            <th>Job</th>
            <th>Customer</th>
            <th>Employee</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Delete</th>

          </tr>

        </thead>

        <tbody>

          {
            jobs.map(job => (

              <tr key={job.id}>

                <td>{job.job_name}</td>

                <td>{job.customer}</td>

                <td>{job.employee}</td>

                <td>{job.priority}</td>

                <td>{job.status}</td>

                <td>{job.due_date}</td>

                <td>

                  <button
                    className="btn btn-danger"
                    onClick={() => deleteJob(job.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))
          }

        </tbody>

      </table>
      </div>

    </div>

  );

}

export default Jobs;