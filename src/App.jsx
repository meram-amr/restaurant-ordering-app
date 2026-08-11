import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Home from "./pages/Home";
import Register from "./pages/Register";
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App
