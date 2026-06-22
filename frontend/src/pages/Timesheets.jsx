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

      setTimesheets(
        res.data
      );

    });

  }, []);


  return (

    <div className="container mt-4">

      <h2 className="mb-4">

        My Timesheets

      </h2>

      <div className="table-responsive">

        <table className="table table-striped table-bordered table-hover shadow">

          <thead className="table-dark">

            <tr>

              <th>Employee</th>

              <th>Date</th>

              <th>Check In</th>

              <th>Check Out</th>

              <th>Hours</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {
              timesheets.length > 0 ?

              timesheets.map(
                (ts,index)=>(

                  <tr key={index}>

                    <td>{ts.employee}</td>

                    <td>{ts.date}</td>

                    <td>{ts.check_in}</td>

                    <td>{ts.check_out}</td>

                    <td>{ts.hours}</td>

                    <td>

                      <span
                        className={
                          ts.status==="Checked In"
                          ?
                          "badge bg-success"
                          :
                          "badge bg-secondary"
                        }
                      >

                        {ts.status}

                      </span>

                    </td>

                  </tr>

                )
              )

              :

              <tr>

                <td
                  colSpan="5"
                  className="text-center"
                >

                  No Records Found

                </td>

              </tr>

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Timesheets;