import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function WeeklyHoursChart({ weeklyHours }) {

  const chartData = {

    labels: [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],

    datasets: [
      {
        label: "Hours",
        data: [
          weeklyHours,
          weeklyHours,
          weeklyHours,
          weeklyHours,
          weeklyHours,
          weeklyHours,
          weeklyHours
        ],
        borderColor: "#198754",
        backgroundColor: "rgba(25,135,84,0.2)",
        fill: true,
        tension: 0.4
      }
    ]

  };

  return (

    <div className="card shadow p-3">

      <h5>
        Weekly Hours
      </h5>

      <Line data={chartData} />

    </div>

  );

}

export default WeeklyHoursChart;