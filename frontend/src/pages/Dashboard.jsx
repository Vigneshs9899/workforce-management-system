import { useEffect, useState } from "react";
import api from "../services/api";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function Dashboard() {

  const [data, setData] = useState({});

  const [recentEmployees, setRecentEmployees] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [recentTimesheets, setRecentTimesheets] = useState([]);
  const [hoursChart, setHoursChart] = useState([]);

  const chartData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [
          data.completed_jobs || 0,
          data.pending_jobs || 0
        ],
        backgroundColor: [
          "#198754",
          "#ffc107"
        ]
      }
    ]
  };

  const barData = {
  labels: hoursChart.map(
    item => item.employee
  ),

  datasets: [
    {
      label: "Hours Worked",
      data: hoursChart.map(
        item => item.hours_worked
      ),
      backgroundColor: "#0d6efd"
    }
  ]
};

  useEffect(() => {

    const token = localStorage.getItem("token");

    api.get(
      "/dashboard",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then((res) => {
      setData(res.data);
    });

    api.get(
      "/dashboard/recent-employees",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then((res) => {
      setRecentEmployees(res.data);
    });

    api.get(
      "/dashboard/recent-jobs",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then((res) => {
      setRecentJobs(res.data);
    });

    api.get(
  "/dashboard/hours-chart",
  {
    headers:{
      Authorization:`Bearer ${token}`
    }
  }
)
.then((res)=>{
  setHoursChart(res.data);
});

    api.get(
      "/dashboard/recent-timesheets",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then((res) => {
      setRecentTimesheets(res.data);
    });

  }, []);

  return (

    <div className="container mt-4">

      <h2 className="text-center mb-4">
        Dashboard
      </h2>

      {/* Top Cards */}
      <div className="row g-4">

        <div className="col-md-3">
          <div className="card shadow border-0 bg-primary text-white text-center">
            <div className="card-body">
              <h6>Total Employees</h6>
              <h2>{data.total_employees}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0 bg-info text-white text-center">
            <div className="card-body">
              <h6>Total Jobs</h6>
              <h2>{data.total_jobs}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0 bg-success text-white text-center">
            <div className="card-body">
              <h6>Completed Jobs</h6>
              <h2>{data.completed_jobs}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0 bg-warning text-dark text-center">
            <div className="card-body">
              <h6>Pending Jobs</h6>
              <h2>{data.pending_jobs}</h2>
            </div>
          </div>
        </div>

      </div>


     {/* Charts Row */}
<div className="row mt-4">

  {/* Total Hours */}
  <div className="col-md-4">

    <div className="card shadow border-0 bg-dark text-white text-center h-100">

      <div className="card-body d-flex flex-column justify-content-center">

        <h5>Total Hours Worked</h5>

        <h1>{data.total_hours}</h1>

      </div>

    </div>

  </div>


  {/* Pie Chart */}
  <div className="col-md-4">

    <div className="card shadow border-0 h-100">

      <div className="card-body">

        <h5 className="text-center mb-3">
          Job Status Distribution
        </h5>

        <Pie data={chartData} />

      </div>

    </div>

  </div>


  {/* Bar Chart */}
  <div className="col-md-4">

    <div className="card shadow border-0 h-100">

      <div className="card-body">

        <h5 className="text-center mb-3">
          Hours Worked by Employee
        </h5>

        <Bar
          data={barData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false
              }
            }
          }}
        />

      </div>

    </div>

  </div>

</div>


      {/* Recent Activity */}
      <div className="row mt-4">

        <div className="col-md-4">

          <div className="card shadow border-0">

            <div className="card-body">

              <h5 className="mb-3">
                Recent Employees
              </h5>

              {
                recentEmployees.map(emp => (

                  <div
                    key={emp.employee_code}
                    className="border-bottom mb-2 pb-2"
                  >

                    <strong>
                      {emp.employee_code}
                    </strong>

                    <br />

                    {emp.name}

                  </div>

                ))
              }

            </div>

          </div>

        </div>



        <div className="col-md-4">

          <div className="card shadow border-0">

            <div className="card-body">

              <h5 className="mb-3">
                Recent Jobs
              </h5>

              {
                recentJobs.map(job => (

                  <div
                    key={job.job_code}
                    className="border-bottom mb-2 pb-2"
                  >

                    <strong>
                      {job.job_code}
                    </strong>

                    <br />

                    {job.title}

                  </div>

                ))
              }

            </div>

          </div>

        </div>



        <div className="col-md-4">

          <div className="card shadow border-0">

            <div className="card-body">

              <h5 className="mb-3">
                Recent Timesheets
              </h5>

              {
                recentTimesheets.map((ts, index) => (

                  <div
                    key={index}
                    className="border-bottom mb-2 pb-2"
                  >

                    <strong>
                      {ts.employee}
                    </strong>

                    <br />

                    {ts.hours_worked} Hours

                  </div>

                ))
              }

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;