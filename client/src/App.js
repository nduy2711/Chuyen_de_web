import React from "react";
import { necklaces } from "./necklaces";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { Search } from "./components/Search";
import ManageList from "./components/ManageList";
import FilterList from "./components/FilterList";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/necklace-list" element={<NecklaceList />} />
        <Route path="/necklace/:id" element={<NecklaceDetail />} />
        <Route path="/necklace-update" element={<ManageList />} />
        <Route path="/necklace-delete" element={<ManageList />} />
        <Route path="/necklace-search" element={<Search />} />
        <Route path="/necklace-filter" element={<FilterList />} />
      </Routes>
    </Router>
  );
}

function Navbar() {
  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>
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

function NecklaceList() {
  return (
    <div>
      <h2>Necklace List</h2>
      <ul>
        {necklaces.map((necklace) => (
          <li key={necklace.id}>
            <Link to={`/necklace/${necklace.id}`}>{necklace.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NecklaceDetail() {
  const { id } = useParams();
  const necklace = necklaces.find((n) => n.id.toString() === id);

  return necklace ? (
    <div>
      <h2>{necklace.name}</h2>
      <img src={`/assets/${necklace.image}`} alt={necklace.name} width="100" />
      <p>
        <strong>Price:</strong> ${necklace.price}
      </p>
      <p>
        <strong>Status:</strong> {necklace.status}
      </p>
      <p>
        <strong>Description:</strong> {necklace.description}
      </p>
    </div>
  ) : (
    <h2>Necklace not found</h2>
  );
}
