import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="bg-dark text-white vh-100 p-3" style={{width:"220px"}}>

      <h4 className="mb-4">Splitwise</h4>

      <ul className="nav flex-column">

        <li className="nav-item">
          <Link className="nav-link text-white" to="/dashboard">
            Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link text-white" to="/groups">
            Groups
          </Link>
        </li>

      </ul>
    </div>
  );
}
