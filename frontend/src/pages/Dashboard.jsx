import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [groups, setGroups] = useState([]);
  const [balance, setBalance] = useState({ you_owe: 0, owed_to_you: 0 });
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const me = await api.get("/me");
      setUser(me.data);

      const groupRes = await api.get("/groups");
      setGroups(groupRes.data);

      const bal = await api.get("/balance");
      setBalance(bal.data);

    } catch (err) {
      toast.error("Session expired");
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();

    if (!groupName.trim()) {
      toast.error("Group name cannot be empty");
      return;
    }

    try {
      await api.post("/groups", { name: groupName });
      toast.success("Group created successfully!");
      setGroupName("");
      fetchData();
    } catch {
      toast.error("Failed to create group");
    }
  };

  const netBalance = balance.owed_to_you - balance.you_owe;

  return (
    <div className="dashboard-content">

      {/* Balance Section */}
      <div className="balance-section">

        <div className="balance-card owe">
          <h4>You Need to Pay</h4>
          <p>₹ {balance.you_owe}</p>
        </div>

        <div className="balance-card get">
          <h4>You Will Receive</h4>
          <p>₹ {balance.owed_to_you}</p>
        </div>

        <div className="balance-card total">
          <h4>Your Net Balance</h4>
          <p>₹ {netBalance}</p>
        </div>

      </div>

      {/* Create Group */}
      <div className="create-group-box">
        <form onSubmit={handleCreateGroup}>
          <input
            type="text"
            placeholder="New Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <button type="submit">Create</button>
        </form>
      </div>

      {/* Group Grid */}
      <div className="group-grid">
        {groups.length === 0 && <p>No groups yet</p>}

        {groups.map((group) => (
          <div
            key={group.id}
            className="group-card"
            onClick={() => navigate(`/dashboard/groups/${group.id}`)}
            style={{ cursor: "pointer" }}
          >
            <h5>{group.name}</h5>
            <p>Group ID: {group.id}</p>
          </div>
        ))}

      </div>

    </div>
  );
};

export default Dashboard;
