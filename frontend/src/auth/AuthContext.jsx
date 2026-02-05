import { createContext, useContext, useState } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const login = async (data) => {
    const res = await API.post("/login", data);

    localStorage.setItem("token", res.data.access_token);

    await fetchUser();
  };

  const register = async (data) => {
    await API.post("/register", data);
  };

  const fetchUser = async () => {
    const res = await API.get("/me");
    setUser(res.data);
  };

  const logout = async () => {
    await API.post("/logout");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
