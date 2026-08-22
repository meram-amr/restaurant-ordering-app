import { Routes, Route, useNavigate } from "react-router-dom";

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
import AdminRoute from "./layout/AdminRoute";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import OrderManagement from "./pages/OrderManagement";
import Soon from "./pages/Soon";
import NotFound from "./pages/NotFound";

function AppContent() {
  const navigate = useNavigate();
  const { role } = useAuth();

  // بعد تسجيل الدخول
  const submit = () => {
    if (role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />

        <Route path="/menu" element={<Menu />} />

        <Route path="/register" element={<Register />} />

        <Route path="/about" element={<About />} />

        <Route path="/login" element={<Login submit={submit} />} />

        <Route path="/orders" element={<MyOrders />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/checkout" element={<Checkout />} />
      </Route>

      <Route path="/support" element={<Soon />} />

      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />

          <Route path="menu-management" element={<MenuManagement />} />
          <Route path="reservations" element={<Soon />} />
          <Route path="customers" element={<Soon />} />
          <Route path="settings" element={<Soon />} />

          <Route path="orders" element={<OrderManagement />} />
        </Route>
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;