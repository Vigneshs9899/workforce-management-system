import { useEffect, useState } from "react";
import api from "../services/api";

function Jobs() {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {

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

  }, []);

  return (

    <div className="container mt-5">

      <h2>Jobs</h2>

      <table className="table table-bordered">

        <thead>

          <tr>
            <th>Job Code</th>
            <th>Title</th>
            <th>Employee</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {jobs.map((job) => (

            <tr key={job.id}>

              <td>{job.job_code}</td>

              <td>{job.title}</td>

              <td>{job.employee.name}</td>

              <td>{job.status}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default Jobs;