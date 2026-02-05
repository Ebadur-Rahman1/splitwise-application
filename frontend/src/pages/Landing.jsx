import { Link } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  return (
    <div className="landing-bg d-flex align-items-center justify-content-center">

      <div className="text-center container">

        <h1 className="display-3 fw-bold">Splitwise App</h1>
        <p className="lead">Split expenses easily with friends</p>

        <div className="mt-4">
          <Link to="/login" className="btn btn-success me-3">
            Login
          </Link>

          <Link to="/register" className="btn btn-outline-light">
            Register
          </Link>
        </div>

      </div>
    </div>
  );
}
