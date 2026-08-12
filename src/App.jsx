import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Register from "./pages/Register";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MyOrders from "./pages/MyOrders";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/orders" element={<MyOrders />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
