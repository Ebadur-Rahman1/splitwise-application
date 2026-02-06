import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DashboardLayout = () => {

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="app-layout">

      <Sidebar collapsed={collapsed} />

      <div className="main-content">
        <Navbar toggleSidebar={() => setCollapsed(!collapsed)} />
        <div className="content-area">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default DashboardLayout;
