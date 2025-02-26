import { useState } from "react";
import { necklaces } from "../necklaces";

function FilterList() {
  const [filter, setFilter] = useState("all");

  const filteredNecklaces = necklaces.filter(
    (item) => filter === "all" || item.status === filter
  );

  return (
    <div>
      <h2>Necklaces</h2>
      <div>
        <label htmlFor="filter">Choose a filter: </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="out of stock">Out of Stock</option>
        </select>
      </div>
      <ul>
        {filteredNecklaces.map((necklace) => (
          <li key={necklace.id}>
            <p>ID: {necklace.id}</p>
            <p>Name: {necklace.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilterList;
