import React from "react";
import { NecklaceList } from "./components/NeklaceList";
import { NecklaceDetail } from "./components/NecklaceDetail";
import { NecklaceAdd } from "./components/NecklaceAdd";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { Search } from "./components/Search";
import ManageList from "./components/ManageList";
import FilterList from "./components/FilterList";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/necklace-list" element={<NecklaceList />} />
        <Route path="/necklace/:id" element={<NecklaceDetail />} />
        <Route path="/necklace-add" element={<NecklaceAdd />} />
        <Route path="/necklace-update" element={<ManageList />} />
        <Route path="/necklace-delete" element={<ManageList />} />
        <Route path="/necklace-search" element={<Search />} />
        <Route path="/necklace-filter" element={<FilterList />} />
      </Routes>
    </Router>
  );
}

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav>
      {!isHome && (
        <Link to="/">
          <button>Home</button>
        </Link>
      )}
      <Link to="/necklace-list">
        <button>List</button>
      </Link>
      <Link to="/necklace-search">
        <button>Search</button>
      </Link>
      <Link to="/necklace-filter">
        <button>Filter</button>
      </Link>
      <Link to="/necklace-add">
        <button>Add</button>
      </Link>
      <Link to="/necklace-update">
        <button>Update</button>
      </Link>
      <Link to="/necklace-delete">
        <button>Delete</button>
      </Link>
    </nav>
  );
}

function Home() {
  return <h2>Welcome to the Necklace Store</h2>;
}
