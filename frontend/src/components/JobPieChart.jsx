import { useEffect, useState } from "react";
import api from "../services/api";

import { Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function JobPieChart() {

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {

    const token = localStorage.getItem("token");

    api.get(
      "/job-status-chart",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then((res) => {

      setChartData({

        labels: [
          "Completed",
          "Pending",
          "In Progress"
        ],

        datasets: [
{
    label: "Jobs",
    data: [
        res.data.completed,
        res.data.pending,
        res.data.progress
    ],
    backgroundColor: [
        "#198754", // Green
        "#ffc107", // Yellow
        "#0d6efd"  // Blue
    ],
    borderWidth: 1
}
]

      });

    })
    .catch((err) => {
      console.log(err);
    });

  }, []);

  return (

    <div className="card shadow p-3">

      <h5>Job Status</h5>

      {
        chartData.datasets.length > 0 &&
        <Pie data={chartData} />
      }

    </div>

  );

}

export default JobPieChart;