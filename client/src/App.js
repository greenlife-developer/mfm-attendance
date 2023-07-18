import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import './App.css';
import Home from "./components/homepage/Home";
import Success from "./components/homepage/Success";
import Register from './components/register/Register';
import Registrations from './components/Registrations';
import Chat from './components/Chat';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/success" element={<Success />} />
          <Route path="/registrations" element={<Registrations />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}