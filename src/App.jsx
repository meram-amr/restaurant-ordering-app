import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Register from "./pages/Register";
import './App.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/menu" element={<Menu />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App
