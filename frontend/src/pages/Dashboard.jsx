import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {

  const [stats, setStats] = useState({});

  useEffect(() => {

    api.get(
      "/dashboard",
      {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("token")}`
        }
      }
    )
    .then((res) => {
      setStats(res.data);
    });

  }, []);

  return (

    <div className="container mt-5">

      <h2>Dashboard</h2>

      <p>Total Employees: {stats.total_employees}</p>

      <p>Total Jobs: {stats.total_jobs}</p>

      <p>Completed Jobs: {stats.completed_jobs}</p>

      <p>Pending Jobs: {stats.pending_jobs}</p>

      <p>Total Hours: {stats.total_hours_logged}</p>

    </div>

  );
}

export default Dashboard;