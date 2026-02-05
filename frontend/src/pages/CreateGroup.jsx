import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateGroup = () => {

  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/groups", { name });
      toast.success("Group created");
      navigate("/groups");
    } catch {
      toast.error("Error creating group");
    }
  };

  return (
    <div className="container mt-4">

      <form onSubmit={handleSubmit} className="card p-4">

        <h3>Create Group</h3>

        <input
          className="form-control mb-3"
          placeholder="Group Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="btn btn-success">
          Create
        </button>

      </form>

    </div>
  );
};

export default CreateGroup;
