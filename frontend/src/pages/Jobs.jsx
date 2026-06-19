import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { exportToExcel } from "../utils/exportExcel";

function Jobs() {

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  const [jobCode, setJobCode] = useState("");
  const [title, setTitle] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");

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
    })
    .catch((err) => {
      console.log(err);
    });

  };

  const completeJob = async(id)=>{

const token = localStorage.getItem("token");

await api.put(
`/jobs/${id}/status`,
{
status:"Completed"
},
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

fetchJobs();

toast.success("Job completed");

}


const deleteJob = async(id)=>{

const token = localStorage.getItem("token");

await api.delete(
`/jobs/${id}`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

fetchJobs();

toast.error("Job deleted");

}

  const addJob = async () => {

    const token = localStorage.getItem("token");

    try {

      await api.post(
        "/jobs",
        {
          job_code: jobCode,
          title,
          description,
          employee_id: employeeId,
          status
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchJobs();

      setJobCode("");
      setTitle("");
      setEmployeeId("");
      setStatus("");

    } catch (error) {

      console.log(error.response?.data);

    }

    toast.success("Job created");
  };

  useEffect(() => {

    fetchJobs();

  }, []);

  const filteredJobs = jobs.filter((job) =>
  job.title.toLowerCase().includes(search.toLowerCase())
);

  return (

    <div className="container mt-5">

      <h2>Jobs</h2>

      <input
        className="form-control mb-2"
        placeholder="Job Code"
        value={jobCode}
        onChange={(e) => setJobCode(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className="form-control mb-2"
        placeholder="Employee ID"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
      />

      <input
        className="form-control mb-3"
        placeholder="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />

      <button
        className="btn btn-primary mb-4"
        onClick={addJob}
      >
        Add Job
      </button>
      <button
className="btn btn-success ms-2"
onClick={() =>
  exportToExcel(jobs, "jobs")
}
>
Export Excel
</button>

      <input
  className="form-control mb-3"
  placeholder="Search Job Title"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

      <table className="table table-bordered">

        <thead>

          <tr>
            <th>Job Code</th>
            <th>Title</th>
            <th>Employee</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {filteredJobs.map((job) => (

            <tr key={job.id}>

              <td>{job.job_code}</td>

              <td>{job.title}</td>

              <td>{job.employee.name}</td>

              <td>
{
job.status === "Completed"
?
<span className="badge bg-success">
Completed
</span>
:
<span className="badge bg-warning text-dark">
Pending
</span>
}
</td>

              <td>

                <button
                className="btn btn-success btn-sm"
                onClick={()=>completeJob(job.id)}
                >
                Complete
                </button>

                <button
                className="btn btn-danger btn-sm ms-2"
                onClick={()=>{
if(window.confirm("Delete Job?")){
  deleteJob(job.id)
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

export default Jobs;