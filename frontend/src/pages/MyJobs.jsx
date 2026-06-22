import { useEffect, useState } from "react";
import api from "../services/api";

function MyJobs() {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {

    fetchJobs();

  }, []);

  const fetchJobs = () => {

    const token = localStorage.getItem("token");

    api.get(
      "/my-jobs",
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

  const updateJob = async (id, status, remarks) => {

    const token = localStorage.getItem("token");

    await api.put(
      `/update-job/${id}`,
      {
        status,
        remarks
      },
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

      <h2>My Jobs</h2>

        <div className="table-responsive">

      <table className="table table-bordered table-hover">

        <thead>

          <tr>

            <th>Job</th>
            <th>Customer</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Remarks</th>
            <th>Update</th>

          </tr>

        </thead>

        <tbody>

          {
            jobs.map(job => (

              <tr key={job.id}>

                <td>{job.job_name}</td>

                <td>{job.customer}</td>

                <td>{job.priority}</td>

                <td>

                  <select
                    className="form-select"
                    value={job.status}
                    onChange={(e) => {

                      const newJobs = [...jobs];

                      const index = newJobs.findIndex(
                        j => j.id === job.id
                      );

                      newJobs[index].status = e.target.value;

                      setJobs(newJobs);

                    }}
                  >

                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>

                  </select>

                </td>

                <td>{job.due_date}</td>

                <td>

                  <input
                    className="form-control"
                    defaultValue={job.remarks}
                    onChange={(e) => {

                      const newJobs = [...jobs];

                      const index = newJobs.findIndex(
                        j => j.id === job.id
                      );

                      newJobs[index].remarks = e.target.value;

                      setJobs(newJobs);

                    }}
                  />

                </td>

                <td>

                  <button
                    className="btn btn-success"
                    onClick={() =>
                      updateJob(
                        job.id,
                        job.status,
                        job.remarks
                      )
                    }
                  >
                    Save
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

export default MyJobs;