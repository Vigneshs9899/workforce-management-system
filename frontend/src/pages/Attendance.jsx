import { useEffect, useState } from "react";
import api from "../services/api";

function Attendance() {

  const [status, setStatus] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [elapsedTime, setElapsedTime] = useState("");

  useEffect(() => {

    fetchStatus();

    const refresh = setInterval(() => {
      fetchStatus();
    }, 30000);

    return () => clearInterval(refresh);

  }, []);

  useEffect(() => {

    if (!checkInTime) return;

    const interval = setInterval(() => {

      const start = new Date(checkInTime);
      const now = new Date();

      const diff = now - start;

      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      setElapsedTime(
        `${hours}h ${minutes}m ${seconds}s`
      );

    }, 1000);

    return () => clearInterval(interval);

  }, [checkInTime]);


  const fetchStatus = () => {

    const token = localStorage.getItem("token");

    api.get(
      "/attendance-status",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then((res) => {

      setStatus(res.data.status);

      if (res.data.check_in) {

        setCheckInTime(
          res.data.check_in
        );

      } else {

        setCheckInTime("");
        setElapsedTime("");

      }

    });

  };


  const checkIn = async () => {

    try {

      const token = localStorage.getItem("token");

      await api.post(
        "/checkin",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchStatus();

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Unable to check in"
      );

    }

  };


  const checkOut = async () => {

    try {

      const token = localStorage.getItem("token");

      await api.put(
        "/checkout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchStatus();

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Unable to check out"
      );

    }

  };


  return (

    <div className="container mt-5">

      <div className="card shadow p-5">

        <h2 className="text-center mb-5">

          Attendance

        </h2>

        <div className="text-center">

          <h4>Status</h4>

          <h3>

            <span
              className={
                status === "Checked In"
                  ? "badge bg-success"
                  : "badge bg-secondary"
              }
            >
              {status}
            </span>

          </h3>

        </div>


        {
          status === "Checked In" &&

          <div className="text-center mt-5">

            <h5>Current Session</h5>

            <h1 className="text-success">

              {elapsedTime}

            </h1>

          </div>

        }


        <div className="text-center mt-5">

          <button
            className="btn btn-success me-3"
            disabled={status === "Checked In"}
            onClick={checkIn}
          >
            Check In
          </button>


          <button
            className="btn btn-danger"
            disabled={status !== "Checked In"}
            onClick={checkOut}
          >
            Check Out
          </button>

        </div>

      </div>

    </div>

  );

}

export default Attendance;