import { Link } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1>Splitwise App</h1>
        <p>Split expenses easily with friends</p>

        <div style={{ marginTop: "20px" }}>
          <Link to="/login">
            <button style={{ marginBottom: "10px" }}>Login</button>
          </Link>

          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
}