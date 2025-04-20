import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import Login from "./components/Login";
import { SearchProduct } from "./components/SearchProduct";

import { Navbar, Nav, Container } from "react-bootstrap";

export default function App() {
  return (
    <Router>
      <AppNavbar />
      <Container className="mt-4">
        <Routes>
          <Route path="/add-necklace" element={<AddProduct />} />
          <Route path="/list-necklaces" element={<ProductList />} />
          <Route path="/search" element={<SearchProduct />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </Router>
  );
}

function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/list-necklaces">
          NECKLACE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/add-necklace">
              Add
            </Nav.Link>
            <Nav.Link as={Link} to="/list-necklaces">
              List Product
            </Nav.Link>
            <Nav.Link as={Link} to="/search">
              Search
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
