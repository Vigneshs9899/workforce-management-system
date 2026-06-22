import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Jobs from "./pages/Jobs";
import Timesheets from "./pages/Timesheets";
import ImportData from "./pages/ImportData";
import Attendance from "./pages/Attendance";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

import AdminRoute from "./routes/AdminRoute";
import EmployeeRoute from "./routes/EmployeeRoute";

import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import MyJobs from "./pages/MyJobs";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Login */}

        <Route
          path="/"
          element={<Login />}
        />

        {/* Dashboard */}

      <Route
path="/admin-dashboard"
element={
<AdminRoute>
<Layout>
<AdminDashboard/>
</Layout>
</AdminRoute>
}
/>

<Route
path="/employee-dashboard"
element={
<EmployeeRoute>
<Layout>
<EmployeeDashboard/>
</Layout>
</EmployeeRoute>
}
/>

        {/* Employees */}

        <Route
          path="/employees"
          element={
            <AdminRoute>
              <Layout>
                <Employees />
              </Layout>
            </AdminRoute>
          }
        />

        {/* Jobs */}

        <Route
  path="/jobs"
  element={
    <ProtectedRoute>
      <Layout>
        <Jobs />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/my-jobs"
  element={
    <ProtectedRoute>
      <Layout>
        <MyJobs />
      </Layout>
    </ProtectedRoute>
  }
/>

        {/* Timesheets */}

        <Route
          path="/timesheets"
          element={
            <ProtectedRoute>
              <Layout>
                <Timesheets />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Import */}

        <Route
          path="/import"
          element={
            <AdminRoute>
              <Layout>
                <ImportData />
              </Layout>
            </AdminRoute>
          }
        />

        {/* Attendance */}

        <Route
          path="/attendance"
          element={
            <EmployeeRoute>
              <Layout>
                <Attendance />
              </Layout>
            </EmployeeRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;