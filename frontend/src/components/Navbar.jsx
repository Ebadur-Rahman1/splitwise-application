import { useAuth } from "../auth/AuthContext";

export default function Navbar() {

  const { logout } = useAuth();

  return (
    <nav className="navbar navbar-light bg-light px-4">

      <h5 className="m-0">Dashboard</h5>

      <button
        className="btn btn-danger"
        onClick={logout}
      >
        Logout
      </button>

    </nav>
  );
}
