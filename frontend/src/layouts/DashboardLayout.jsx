import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="d-flex">

      <Sidebar />

      <div className="flex-grow-1">
        <Navbar />

        <div className="container mt-4">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default DashboardLayout;
