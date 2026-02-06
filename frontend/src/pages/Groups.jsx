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

  const [groupBalance, setGroupBalance] = useState({
    you_owe: 0,
    owed_to_you: 0
  });

  useEffect(() => {
    fetchGroupData();
  }, [id]);

  const fetchGroupData = async () => {
    try {
      // get group list and find current
      const groupRes = await api.get("/groups");
      const currentGroup = groupRes.data.find(g => g.id == id);
      setGroup(currentGroup);

      // get expenses
      const expenseRes = await api.get(`/groups/${id}/expenses`);
      setExpenses(expenseRes.data);

      // get group balance
      const balanceRes = await api.get(`/groups/${id}/balances`);
      setGroupBalance(balanceRes.data);

    } catch (err) {
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
        amount: Number(amount)
      });

      toast.success("Expense added!");
      setTitle("");
      setAmount("");
      fetchGroupData();

    } catch {
      toast.error("Failed to add expense");
    }
  };

  return (


    <div>


      <h2>{group?.name}</h2>

      {/* Group Balance */}
      <div className="balance-section">

        <div className="balance-card owe">
          <h4>You Need to Pay</h4>
          <p>₹ {Number(groupBalance.you_owe || 0)}</p>
        </div>

        <div className="balance-card get">
          <h4>You Will Receive</h4>
          <p>₹ {Number(groupBalance.owed_to_you || 0)}</p>
        </div>

        <div className="balance-card total">
          <h4>Net Balance</h4>
          <p>
            ₹ {Number(groupBalance.owed_to_you || 0) - Number(groupBalance.you_owe || 0)}
          </p>
        </div>

      </div>


      {/* Add Expense */}
      <div className="create-group-box">
        <form onSubmit={handleAddExpense}>
          <input
            type="text"
            placeholder="Expense Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button type="submit">Add Expense</button>
        </form>
      </div>

      {/* Expense List */}
      <div className="group-grid">
        {expenses.length === 0 && <p>No expenses yet</p>}

        {expenses.map((expense) => (
          <div key={expense.id} className="group-card">
            <h5>{expense.title}</h5>
            <p>₹ {expense.amount}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Groups;
