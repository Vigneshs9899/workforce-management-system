import AdminSidebar from "./AdminSidebar";
import EmployeeSidebar from "./EmployeeSidebar";

function Sidebar(){

  const role = localStorage.getItem(
    "role"
  );

  return (
    <>
      {
        role==="ADMIN"
        ?
        <AdminSidebar/>
        :
        <EmployeeSidebar/>
      }
    </>
  );
}

export default Sidebar;