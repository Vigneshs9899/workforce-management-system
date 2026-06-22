import { useEffect, useState } from "react";
import api from "../services/api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function HoursBarChart() {

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {

    const token = localStorage.getItem("token");

    api.get(
      "/hours-chart",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then((res) => {

      setChartData({
        labels: res.data.labels,
       datasets:[
{
    label:"Hours Worked",
    data:res.data.hours,
    backgroundColor:"#0d6efd",
    borderRadius:8
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

      <h5>Hours Worked</h5>

      {
        chartData.datasets.length > 0 &&
        <Bar data={chartData} />
      }

    </div>

  );

}

export default HoursBarChart;