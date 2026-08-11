import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Home from "./pages/Home";
import Register from "./pages/Register";
import './App.css';
import Footer from "./components/Footer";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App
