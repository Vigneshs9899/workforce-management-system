import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { exportToExcel } from "../utils/exportExcel";

function Timesheets() {

  const [timesheets, setTimesheets] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const [employeeId, setEmployeeId] = useState("");
  const [jobId, setJobId] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");
  const [notes, setNotes] = useState("");

  const fetchTimesheets = () => {

    const token = localStorage.getItem("token");

    api.get(
      "/timesheets",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then((res) => {
      setTimesheets(res.data);
    });

  };

  const deleteTimesheet = async (id) => {

  const token = localStorage.getItem("token");

  try {

    await api.delete(
      `/timesheets/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    fetchTimesheets();

  } catch (error) {

    console.log(error.response?.data);

  }

  toast.error("Timesheet deleted");

};

const editTimesheet = (ts) => {

  setEditId(ts.id);

  setHoursWorked(ts.hours_worked);
  setNotes(ts.notes);

};


const updateTimesheet = async () => {

  const token = localStorage.getItem("token");

  await api.put(
    `/timesheets/${editId}`,
    {
      hours_worked: hoursWorked,
      notes: notes
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  toast.info("Timesheet updated");

  fetchTimesheets();

  setEditId(null);
  setEmployeeId("");
  setJobId("");
  setHoursWorked("");
  setNotes("");
};





  const addTimesheet = async () => {

    const token = localStorage.getItem("token");

    try {

      await api.post(
        "/timesheets",
        {
          employee_id: employeeId,
          job_id: jobId,
          hours_worked: hoursWorked,
          notes
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchTimesheets();

      setEmployeeId("");
      setJobId("");
      setHoursWorked("");
      setNotes("");

    }

    catch(error){

      console.log(error.response?.data);

    }

    toast.success("Timesheet saved");

  };

  useEffect(() => {

    fetchTimesheets();

  }, []);

  const filteredTimesheets = timesheets.filter((ts) =>
  ts.employee.toLowerCase().includes(search.toLowerCase()) ||
  ts.job.toLowerCase().includes(search.toLowerCase())
);

  return (

    <div className="container mt-5">

      <h2>Timesheets</h2>

      <input
      className="form-control mb-2"
      placeholder="Employee ID"
      value={employeeId}
      onChange={(e)=>setEmployeeId(e.target.value)}
      />

      <input
      className="form-control mb-2"
      placeholder="Job ID"
      value={jobId}
      onChange={(e)=>setJobId(e.target.value)}
      />

      <input
      className="form-control mb-2"
      placeholder="Hours Worked"
      value={hoursWorked}
      onChange={(e)=>setHoursWorked(e.target.value)}
      />

      <input
      className="form-control mb-2"
      placeholder="Notes"
      value={notes}
      onChange={(e)=>setNotes(e.target.value)}
      />

     <button
className="btn btn-primary mb-3"
onClick={editId ? updateTimesheet : addTimesheet}
>
{editId ? "Update Timesheet" : "Add Timesheet"}
</button>

<button
className="btn btn-success ms-2"
onClick={() =>
  exportToExcel(timesheets, "timesheets")
}
>
Export Excel
</button>

<input
  className="form-control mb-3"
  placeholder="Search Employee or Job"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

      <table className="table table-bordered">

        <thead>

          <tr>

            <th>Employee</th>
            <th>Job</th>
            <th>Hours</th>
            <th>Notes</th>
            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {filteredTimesheets.map(ts => (

            <tr key={ts.id}>

              <td>{ts.employee}</td>

              <td>{ts.job}</td>

              <td>{ts.hours_worked}</td>

              <td>{ts.notes}</td>

              <td>
                <button
className="btn btn-warning btn-sm"
onClick={() => editTimesheet(ts)}
>
Edit
</button>

                  <button
                  className="btn btn-danger btn-sm ms-2"
                  onClick={()=>{
if(window.confirm("Delete Timesheet?")){
  deleteTimesheet(ts.id)
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

export default Timesheets;