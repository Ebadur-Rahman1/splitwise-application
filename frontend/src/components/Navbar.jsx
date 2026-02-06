import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar({ toggleSidebar }) {

  const { setUser } = useAuth(); // keep context clean
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token locally (JWT is stateless)
    localStorage.removeItem("token");

    // Clear user from context if available
    if (setUser) setUser(null);

    // Redirect cleanly
    navigate("/login");
  };

  return (
    <div className="topbar">

      <div className="topbar-left">
        <button className="menu-btn" onClick={toggleSidebar}>
          ☰
        </button>
        <h3>Dashboard</h3>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

    </div>
  );
}
