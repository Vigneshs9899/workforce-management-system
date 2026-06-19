import { NavLink } from "react-router-dom";

function Sidebar() {

  return (

    <div
      className="bg-dark text-white p-3 vh-100"
      style={{ width: "250px" }}
    >

      <h3 className="mb-4">
        Workforce
      </h3>

      <ul className="nav flex-column">

        <li className="nav-item mb-3">
          <NavLink
to="/dashboard"
className={({isActive}) =>
isActive
? "nav-link text-white bg-primary rounded px-3"
: "nav-link text-white"
}
>
Dashboard
</NavLink>
        </li>

        <li className="nav-item mb-3">
          <NavLink
to="/employees"
className={({isActive}) =>
isActive
? "nav-link text-white bg-primary rounded px-3"
: "nav-link text-white"
}
>
Employees
</NavLink>
        </li>

        <li className="nav-item mb-3">
          <NavLink
to="/jobs"
className={({isActive}) =>
isActive
? "nav-link text-white bg-primary rounded px-3"
: "nav-link text-white"
}
>
Jobs
</NavLink>
        </li>

        <li className="nav-item mb-3">
          <NavLink
to="/timesheets"
className={({isActive}) =>
isActive
? "nav-link text-white bg-primary rounded px-3"
: "nav-link text-white"
}
>
Timesheets
</NavLink>
        </li>

        <li className="nav-item">

          <button
            className="btn btn-danger w-100"
            onClick={() => {

              localStorage.removeItem("token");

              window.location.href="/";

            }}
          >
            Logout
          </button>

        </li>

      </ul>

    </div>

  );

}

export default Sidebar;