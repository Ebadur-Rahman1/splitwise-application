import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

const Groups = () => {
  const { id } = useParams();

  const [group, setGroup] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const [groupBalance, setGroupBalance] = useState(null);
  const [myBalance, setMyBalance] = useState(0);

  const [memberEmail, setMemberEmail] = useState("");

  // ✅ Settlement states
  const [settlements, setSettlements] = useState([]);
  const [showSettlement, setShowSettlement] = useState(false);

  const token = localStorage.getItem("token");
  const loggedInUserId = token
    ? JSON.parse(atob(token.split(".")[1])).sub
    : null;

  useEffect(() => {
    fetchGroupData();
  }, [id]);

  const fetchGroupData = async () => {
    try {
      const groupRes = await api.get("/groups");
      const currentGroup = groupRes.data.find((g) => g.id == id);
      setGroup(currentGroup);

      const expenseRes = await api.get(`/groups/${id}/expenses`);
      setExpenses(expenseRes.data);

      const balanceRes = await api.get(`/groups/${id}/balances`);
      const balanceData = balanceRes.data;

      setGroupBalance(balanceData);

      const currentMember = balanceData.members.find(
        (member) => member.user_id == loggedInUserId
      );

      setMyBalance(currentMember ? currentMember.balance : 0);
    } catch {
      toast.error("Failed to load group data");
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();

    if (!title.trim() || !amount) {
      toast.error("Please enter title and amount");
      return;
    }

    try {
      await api.post(`/groups/${id}/expenses`, {
        title,
        amount: Number(amount),
      });

      toast.success("Expense added!");
      setTitle("");
      setAmount("");
      fetchGroupData();
    } catch {
      toast.error("Failed to add expense");
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();

    if (!memberEmail.trim()) {
      toast.error("Please enter member email");
      return;
    }

    try {
      await api.post(`/groups/${id}/add-member`, {
        email: memberEmail.trim(),
      });

      toast.success("Member added successfully!");
      setMemberEmail("");
      fetchGroupData();
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Failed to add member"
      );
    }
  };

  // ✅ Settlement Suggestion Handler
  const handleSettlementSuggestion = async () => {
    try {
      const res = await api.get(
        `/groups/${id}/settlement-suggestion`
      );

      setSettlements(res.data.settlements || []);
      setShowSettlement(true);
    } catch {
      toast.error("Failed to load settlement suggestion");
    }
  };

  return (
    <div>
      <h2>{group?.name}</h2>

      {/* Group Balance */}
      {groupBalance && (
        <div className="balance-section">
          <div className="balance-card owe">
            <h4>Total Group Expense</h4>
            <p>₹ {Number(groupBalance.total_expense || 0)}</p>
          </div>

          <div className="balance-card get">
            <h4>Fair Share Per Person</h4>
            <p>₹ {Number(groupBalance.fair_share_per_person || 0)}</p>
          </div>

          <div className="balance-card total">
            <h4>Your Balance</h4>
            <p>₹ {Number(myBalance || 0)}</p>
          </div>
        </div>
      )}

      {/* Members Section */}
      {groupBalance && (
        <div className="create-group-box" style={{ marginTop: "30px" }}>
          <h4>Members</h4>

          {groupBalance.members.map((member) => (
            <div
              key={member.user_id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <span>{member.name}</span>
              <span>
                Paid: ₹ {member.paid} | Balance: ₹ {member.balance}
              </span>
            </div>
          ))}

          <form
            onSubmit={handleAddMember}
            style={{ marginTop: "15px" }}
          >
            <input
              type="email"
              placeholder="Add member by email"
              value={memberEmail}
              onChange={(e) =>
                setMemberEmail(e.target.value)
              }
            />
            <button type="submit">Add Member</button>
          </form>

          {/* ✅ Settlement Button */}
          <div style={{ marginTop: "20px" }}>
            <button onClick={handleSettlementSuggestion}>
              View Settlement Suggestion
            </button>
          </div>
        </div>
      )}

      {/* ✅ Settlement Suggestion UI */}
      {showSettlement && (
        <div
          className="create-group-box"
          style={{ marginTop: "20px" }}
        >
          <h4>Settlement Suggestion</h4>

          {settlements.length === 0 ? (
            <p
              style={{
                color: "#2ecc71",
                fontWeight: "500",
              }}
            >
              All settled 🎉 No pending payments
            </p>
          ) : (
            settlements.map((s, index) => (
              <div
                key={index}
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <strong>{s.from}</strong> should pay{" "}
                <strong>{s.to}</strong> ₹ {s.amount}
              </div>
            ))
          )}
        </div>
      )}

      {/* Add Expense */}
      <div className="create-group-box">
        <form onSubmit={handleAddExpense}>
          <input
            type="text"
            placeholder="Expense Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
          />
          <button type="submit">Add Expense</button>
        </form>
      </div>

      {/* Expense List */}
      <div className="group-grid">
        {expenses.length === 0 && (
          <p>No expenses yet</p>
        )}

        {expenses.map((expense) => {
          const paidBy =
            expense.paid_by == loggedInUserId
              ? "You paid"
              : expense.paid_by_user?.name ||
                "Unknown";

          return (
            <div
              key={expense.id}
              className="group-card"
            >
              <h5>{expense.title}</h5>
              <p>₹ {expense.amount}</p>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: "500",
                  color:
                    expense.paid_by ==
                    loggedInUserId
                      ? "#2ecc71"
                      : "#555",
                }}
              >
                {paidBy}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Groups;
