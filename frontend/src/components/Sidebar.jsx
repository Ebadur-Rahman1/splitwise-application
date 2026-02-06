import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ collapsed }) {

  const location = useLocation();

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>

      <h2 className="logo">
        {collapsed ? "S" : "Splitwise"}
      </h2>

      <nav>
        <Link
          to="/dashboard"
          className={location.pathname === "/dashboard" ? "active" : ""}
        >
          {collapsed ? "D" : "Dashboard"}
        </Link>

        <Link
          to="/dashboard/groups"
          className={location.pathname.includes("groups") ? "active" : ""}
        >
          {collapsed ? "G" : "Groups"}
        </Link>
      </nav>

    </div>
  );
}
