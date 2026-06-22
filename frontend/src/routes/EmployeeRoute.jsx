import { Navigate } from "react-router-dom";

function EmployeeRoute({ children }) {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {

        return <Navigate to="/" />;
    }

    if (role !== "EMPLOYEE") {

        return <Navigate to="/" />;
    }

    return children;
}

export default EmployeeRoute;