import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddProduct from './components/AddProduct';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/add-necklace" element={<AddProduct />} />
      </Routes>
    </Router>
  );
}

function Navbar() {
  return (
    <>
      <nav>
        <Link to="/add-necklace" style={{ marginRight: "10px" }}>Add </Link>
        <Link to="/update-necklace" style={{ marginRight: "10px" }}>Update </Link>
        <Link to="/delete-necklace" style={{ marginRight: "10px" }}>Delete </Link>
        <Link to="/login" style={{ marginRight: "10px" }}>Login </Link>
      </nav>
    </>
  );
}