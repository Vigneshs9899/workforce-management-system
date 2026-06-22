import { useEffect,useState } from "react";
import api from "../services/api";

import JobPieChart from "../components/JobPieChart";
import HoursBarChart from "../components/HoursBarChart";

function AdminDashboard(){

const [stats,setStats]=useState({});

useEffect(()=>{

const token=localStorage.getItem("token");

api.get(
"/admin-dashboard",
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
Admin Dashboard
</h2>

<div className="row">

<div className="col-lg-3 col-md-6 col-sm-12 mb-4">
<div className="card bg-primary text-white shadow p-3">
<h5>Total Employees</h5>
<h2>{stats.employees}</h2>
</div>
</div>

<div className="col-lg-3 col-md-6 col-sm-12 mb-4">
<div className="card bg-success text-white shadow p-3">
<h5>Total Jobs</h5>
<h2>{stats.jobs}</h2>
</div>
</div>

<div className="col-lg-3 col-md-6 col-sm-12 mb-4">
<div className="card bg-warning text-dark shadow p-3">
<h5>Completed Jobs</h5>
<h2>{stats.completed_jobs}</h2>
</div>
</div>

<div className="col-lg-3 col-md-6 col-sm-12 mb-4">
<div className="card bg-danger text-white shadow p-3">
<h5>Attendance</h5>
<h2>{stats.attendance}</h2>
</div>
</div>

</div>

<div className="row mt-4">

<div className="col-lg-6 col-md-12 mb-4">
<JobPieChart/>
</div>

<div className="col-lg-6 col-md-12 mb-4">
<HoursBarChart/>
</div>

</div>

<hr/>

<h4>
Recent Employees
</h4>
<div className="table-responsive">
<table className="table table-bordered table-hover">

<thead>
<tr>
<th>Code</th>
<th>Name</th>
</tr>
</thead>

<tbody>

{
stats.recent_employees?.map((e,index)=>(

<tr key={index}>
<td>{e.employee_code}</td>
<td>{e.name}</td>
</tr>

))
}

</tbody>

</table>
</div>
<hr/>

<h4>
Recent Jobs
</h4>

<div className="table-responsive">
  <table className="table table-bordered table-hover">
    <thead>
      <tr>
        <th>Job</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>

{
stats.recent_jobs?.map((j,index)=>(

<tr key={index}>
<td>{j.job_name}</td>
<td>{j.status}</td>
</tr>

))
}

</tbody>

</table>
</div>

<hr/>

<h4>
Recent Timesheets
</h4>

<table className="table table-bordered">

<thead>
<tr>
<th>Employee</th>
<th>Hours</th>
</tr>
</thead>

<tbody>

{
stats.recent_timesheets?.map((t,index)=>(

<tr key={index}>
<td>{t.employee}</td>
<td>{t.hours}</td>
</tr>

))
}

</tbody>

</table>

</div>

);

}

export default AdminDashboard;