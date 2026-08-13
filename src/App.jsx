import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Register from "./pages/Register";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MyOrders from "./pages/MyOrders";
import Login from "./pages/Login";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [user, setUser] = useState(localStorage.getItem("role"));
  const navigate = useNavigate();
  const submit = (e) => {
    setTimeout(() => {
      navigate(e);
      setUser(localStorage.getItem("role"));
    }, 1000);
  };

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login submit={submit} />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/orders" element={<MyOrders />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
