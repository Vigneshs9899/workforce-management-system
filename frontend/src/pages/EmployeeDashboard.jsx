import { useEffect,useState } from "react";
import api from "../services/api";

import SessionTimer from "../components/SessionTimer";
import WeeklyHoursChart from "../components/WeeklyHoursChart";
import RecentTimesheets from "../components/RecentTimesheets";

function EmployeeDashboard(){

const [stats,setStats]=useState({});

useEffect(()=>{

const token=localStorage.getItem("token");

api.get(
"/employee-dashboard",
{
headers:{
Authorization:`Bearer ${token}`
}
}
)
.then((res)=>{

setStats(res.data);

});

},[]);

return(

<div className="container mt-4">

<h2>
Employee Dashboard
</h2>

<div className="row">

<div className="col-lg-3 col-md-6 col-sm-12 mb-4">
<div className="card bg-info text-white shadow p-3">
<h5>Status</h5>
<h2>{stats.status}</h2>
</div>
</div>

<div className="col-lg-3 col-md-6 col-sm-12 mb-4">
<div className="card bg-success text-white shadow p-3">
<h5>Today's Hours</h5>
<h2>{stats.today_hours}</h2>
</div>
</div>

<div className="col-lg-3 col-md-6 col-sm-12 mb-4">
<div className="card bg-warning text-dark shadow p-3">
<h5>Weekly Hours</h5>
<h2>{stats.weekly_hours}</h2>
</div>
</div>

<div className="col-lg-3 col-md-6 col-sm-12 mb-4">
<div className="card bg-primary text-white shadow p-3">
<h5>Assigned Jobs</h5>
<h2>{stats.assigned_jobs}</h2>
</div>
</div>

</div>

{
stats.status==="Checked In" &&

<div className="mt-4">

<SessionTimer
checkIn={stats.check_in}
/>

</div>

}

<div className="row mt-4">

<div className="col-lg-6 col-md-12 mb-4">

<WeeklyHoursChart
weeklyHours={stats.weekly_hours}
/>

</div>

<div className="col-lg-6 col-md-12 mb-4">

<RecentTimesheets
timesheets={
stats.recent_timesheets
}
/>

</div>

</div>

</div>

);

}

export default EmployeeDashboard;