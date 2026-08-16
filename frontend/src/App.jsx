import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MyOrders from "./pages/MyOrders";

import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

import AdminDashboard from "./pages/AdminDashboard";
import MenuManagement from "./pages/MenuManagement";

import UserLayout from "./layout/UserLayout";
import AdminLayout from "./layout/AdminLayout";

import { CartProvider } from "./context/CartContext";

import OrderManagement from "./pages/OrderManagement";
import Soon from "./pages/Soon";
import NotFound from "./pages/NotFound";

function App() {
  const [user, setUser] = useState(localStorage.getItem("role"));

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
    <CartProvider>
      <Routes>
        <Route element={<UserLayout user={user} setUser={setUser} />}>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />

          <Route path="/menu" element={<Menu />} />

          <Route path="/register" element={<Register />} />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/register"
            element={<Register />}
          />
          <Route path="/login" element={<Login submit={submit} />} />

          <Route path="/orders" element={<MyOrders />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/checkout" element={<Checkout />} />
        </Route>
        <Route path="/support" element={<Soon />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />

          <Route path="menu-management" element={<MenuManagement />} />
          <Route path="reservations" element={<Soon />} />
          <Route path="customers" element={<Soon />} />
          <Route path="settings" element={<Soon />} />

          <Route path="orders" element={<OrderManagement />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;
