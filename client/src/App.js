import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { NecklaceList } from "./components/NeklaceList";
import { NecklaceDetail } from "./components/NecklaceDetail";
import NecklaceAdd from "./components/NecklaceAdd";
import { Search } from "./components/Search";
import ManageList from "./components/ManageList";
import FilterList from "./components/FilterList";

export default function App() {
  return (
    <Router>
      <CustomNavbar />
      <Container className="mt-4">
        <Routes>
          <Route path="/necklace-list" element={<NecklaceList />} />
          <Route path="/necklace/:id" element={<NecklaceDetail />} />
          <Route path="/necklace-add" element={<NecklaceAdd />} />
          <Route path="/necklace-update" element={<ManageList />} />
          <Route path="/necklace-delete" element={<ManageList />} />
          <Route path="/necklace-search" element={<Search />} />
          <Route path="/necklace-filter" element={<FilterList />} />
        </Routes>
      </Container>
    </Router>
  );
}

function CustomNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Necklace Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/necklace-list">List</Nav.Link>
            <Nav.Link as={Link} to="/necklace-search">Search</Nav.Link>
            <Nav.Link as={Link} to="/necklace-filter">Filter</Nav.Link>
            <Nav.Link as={Link} to="/necklace-add">Add</Nav.Link>
            <Nav.Link as={Link} to="/necklace-update">Update</Nav.Link>
            <Nav.Link as={Link} to="/necklace-delete">Delete</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}