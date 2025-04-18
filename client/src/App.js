import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import {SearchProduct} from './components/SearchProduct';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/add-necklace" element={<AddProduct />} />
        <Route path="/list-necklaces" element={<ProductList />} />
        <Route path="/search" element={<SearchProduct />} />
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
        <Link to="/search" style={{ marginRight: "10px" }}>Search</Link>
        <Link to="/login" style={{ marginRight: "10px" }}>Login </Link>
      </nav>
    </>
  );
}