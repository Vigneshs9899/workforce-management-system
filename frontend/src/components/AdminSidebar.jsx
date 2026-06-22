import { NavLink, useNavigate } from "react-router-dom";

function AdminSidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/");

  };

  return (

    <div className="bg-dark text-white p-3 vh-100">

      <h3 className="mb-4">

        Workforce Admin

      </h3>

      <ul className="nav flex-column">

        <li>

          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              isActive
                ? "nav-link text-white bg-primary rounded"
    : "nav-link text-white"
            }
          >

            Dashboard

          </NavLink>

        </li>

        <li>

          <NavLink
            to="/employees"
            className={({ isActive }) =>
              isActive
                    ? "nav-link text-white bg-primary rounded"
    : "nav-link text-white"
            }
          >

            Employees

          </NavLink>

        </li>

        <li>

          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              isActive
                ? "nav-link text-white bg-primary rounded"
                : "nav-link text-white"
            }
          >

            Jobs

          </NavLink>

        </li>

        

        <li>

          <NavLink
            to="/timesheets"
            className={({ isActive }) =>
              isActive
                ? "nav-link text-white bg-primary rounded"
                : "nav-link text-white"
            }
          >

            Timesheets

          </NavLink>

        </li>

        <li>

          <NavLink
            to="/import"
            className={({ isActive }) =>
              isActive
                ? "nav-link text-white bg-primary rounded"
                : "nav-link text-white"
            }
          >

            Import Data

          </NavLink>

        </li>

      </ul>

      <button
        className="btn btn-danger w-100 mt-5"
        onClick={handleLogout}
      >

        Logout

      </button>

    </div>

  );

}

export default AdminSidebar;