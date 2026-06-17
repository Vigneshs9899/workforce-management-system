import { useEffect, useState } from "react";
import api from "../services/api";

function Timesheets() {

  const [timesheets, setTimesheets] = useState([]);

  useEffect(() => {

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
    })
    .catch((err) => {
      console.log(err);
    });

  }, []);

  return (

    <div className="container mt-5">

      <h2>Timesheets</h2>

      <table className="table table-bordered">

        <thead>
          <tr>
            <th>Employee</th>
            <th>Job</th>
            <th>Hours</th>
            <th>Notes</th>
          </tr>
        </thead>

        <tbody>

          {timesheets.map((t) => (

            <tr key={t.id}>
              <td>{t.employee}</td>
              <td>{t.job}</td>
              <td>{t.hours_worked}</td>
              <td>{t.notes}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Timesheets;