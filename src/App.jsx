import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Register from "./pages/Register";
import MyOrders from "./pages/MyOrders";
import Login from "./pages/Login";

import AdminDashboard from "./pages/AdminDashboard";
import MenuManagement from "./pages/MenuManagement";

import UserLayout from "./layout/UserLayout";
import AdminLayout from "./layout/AdminLayout";

function App() {
  const [user, setUser] = useState(
    localStorage.getItem("role")
  );

  const navigate = useNavigate();

  // بعد تسجيل الدخول
  const submit = () => {
    const role = localStorage.getItem("role");

    setUser(role);

    if (role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <Routes>

      {/* ================= USER ================= */}

      <Route
        element={
          <UserLayout
            user={user}
            setUser={setUser}
            isAdmin={false}
          />
        }
      >
        <Route path="/" element={<Home />} />

        <Route path="/menu" element={<Menu />} />

        <Route path="/register" element={<Register />} />

        <Route path="/orders" element={<MyOrders />} />

        <Route
          path="/login"
          element={<Login submit={submit} />}
        />
      </Route>


      {/* ================= ADMIN ================= */}

      <Route
        path="/admin"
        element={<AdminLayout />}
      >
        <Route
          path="dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="menu-management"
          element={<MenuManagement />}
        />
      </Route>


    </Routes>
  );
}

export default App;