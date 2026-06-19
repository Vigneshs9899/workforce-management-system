import Sidebar from "./Sidebar";

function Layout({ children }) {

  return (

    <div className="d-flex">

      <Sidebar />

      <div
        className="p-4 flex-grow-1"
        style={{
          background: "#f8f9fa",
          minHeight: "100vh"
        }}
      >

        {children}

      </div>

    </div>

  );

}

export default Layout;