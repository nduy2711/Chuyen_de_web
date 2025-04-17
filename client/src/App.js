import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/add-necklace" element={<AddProduct />} />
        <Route path="/list-necklaces" element={<ProductList />} />
      </Routes>
    </Router>
  );
}

function Navbar() {
  return (
    <>
      <nav>
        <Link to="/add-necklace" style={{ marginRight: "10px" }}>Add </Link>
        <Link to="/list-necklaces" style={{ marginRight: "10px" }}>List Product</Link>
        <Link to="/login" style={{ marginRight: "10px" }}>Login </Link>
      </nav>
    </>
  );
}