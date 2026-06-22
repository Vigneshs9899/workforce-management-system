import { NavLink, useNavigate } from "react-router-dom";

function EmployeeSidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/");

  };

  return (

    <div className="bg-dark text-white p-3 vh-100">

      <h3 className="mb-4">

        Workforce

      </h3>

      <ul className="nav flex-column">

        <li>

          <NavLink
            to="/employee-dashboard"
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
            to="/attendance"
            className={({ isActive }) =>
              isActive
                ? "nav-link text-white bg-primary rounded"
                : "nav-link text-white"
            }
          >

            Attendance

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

            My Timesheets

          </NavLink>

        </li>

        <li>

          <NavLink
            to="/my-jobs"
            className={({ isActive }) =>
              isActive
                ? "nav-link text-white bg-primary rounded"
                : "nav-link text-white"
            }
          >

            My Jobs

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

export default EmployeeSidebar;