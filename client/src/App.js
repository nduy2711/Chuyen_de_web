import React from "react";
import { NecklaceList } from "./components/NeklaceList";
import { NecklaceDetail } from "./components/NecklaceDetail";
import { NecklaceAdd } from "./components/NecklaceAdd";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/necklace-list" element={<NecklaceList />} />
        <Route path="/necklace/:id" element={<NecklaceDetail />} />
        <Route path="/necklace-add" element={<NecklaceAdd />} />
      </Routes>
    </Router>
  );
}

function Navbar() {
  return (
    <nav>
      <Link to="/"><button>Home</button></Link>
      <Link to="/necklace-list"><button>List</button></Link>
      <Link to="/necklace-search"><button>Search</button></Link>
      <Link to="/necklace-filter"><button>Filter</button></Link>
      <Link to="/necklace-add"><button>Add</button></Link>
      <Link to="/necklace-update"><button>Update</button></Link>
      <Link to="/necklace-delete"><button>Delete</button></Link>
    </nav>
  );
}