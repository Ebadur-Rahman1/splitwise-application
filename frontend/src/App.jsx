import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Groups from "./pages/Groups";
import CreateGroup from "./pages/CreateGroup";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* DASHBOARD ROUTES */}
        <Route path="/dashboard" element={<DashboardLayout />}>

          <Route index element={<Dashboard />} />
          <Route path="groups/:id" element={<Groups />} />
          <Route path="create-group" element={<CreateGroup />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;