import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

const Dashboard = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const res = await api.get("/me");
      setUser(res.data);
    } catch (err) {
      toast.error("Failed to load user");
    }
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">
        👋 Welcome {user?.name || "User"}
      </h2>

      <div className="row">

        <div className="col-md-4">
          <div className="card shadow p-4">
            <h5>Groups</h5>
            <p>Manage your expense groups</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-4">
            <h5>Expenses</h5>
            <p>Track shared expenses</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-4">
            <h5>Balances</h5>
            <p>View settlement suggestions</p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
