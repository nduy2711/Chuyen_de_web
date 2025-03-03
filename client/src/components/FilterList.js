import { useState } from "react";
import { necklaces } from "../necklaces"; // ✅ Đảm bảo import đúng
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function FilterList() {
  const [filter, setFilter] = useState("all");

  const filteredNecklaces = necklaces.filter((necklace) => {
    return filter === "all" || necklace.status === filter;
  });

  return (
    <>
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
      <Table
        striped
        bordered
        hover
        className="small-table"
        style={{ fontSize: "16px", width: "90%", margin: "auto" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredNecklaces.map((necklace, index) => (
            <tr key={necklace.id || index}>
              <td>{necklace.id}</td>
              <td>{necklace.name}</td>
              <td>{necklace.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default FilterList;
