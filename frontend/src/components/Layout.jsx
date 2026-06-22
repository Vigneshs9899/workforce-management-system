import AdminSidebar from "./AdminSidebar";
import EmployeeSidebar from "./EmployeeSidebar";

function Layout({ children }) {

  const role = localStorage.getItem("role");

  return (

    <div className="container-fluid">

      <div className="row">

        <div
          className="col-md-2 bg-dark p-0"
          style={{ minHeight: "100vh" }}
        >

          {
            role === "ADMIN"
              ? <AdminSidebar />
              : <EmployeeSidebar />
          }

        </div>

        <div
          className="col-md-10 p-4 bg-light"
          style={{ minHeight: "100vh" }}
        >

          {children}

        </div>

      </div>

    </div>

  );

}

export default Layout;