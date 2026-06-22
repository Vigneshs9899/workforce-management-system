function RecentTimesheets({ timesheets }) {

  return (

<div className="card shadow p-3">

<h5>
Recent Timesheets
</h5>

<table className="table">

<thead>

<tr>
<th>Date</th>
<th>Hours</th>
</tr>

</thead>

<tbody>

{
timesheets?.map((t,index)=>(

<tr key={index}>
<td>{t.date}</td>
<td>{t.hours}</td>
</tr>

))
}

</tbody>

</table>

</div>

);

}

export default RecentTimesheets;