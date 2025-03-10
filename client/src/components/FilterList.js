import { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import { necklaces as initialNecklaces } from "../necklaces";

export function FilterList() {
  const [filter, setFilter] = useState("all");
  const [listNecklaces, setListNecklaces] = useState(initialNecklaces);

  let filteredNecklaces;
  if (filter === "all") {
    filteredNecklaces = listNecklaces;
  } else {
    filteredNecklaces = listNecklaces.filter(
      (necklace) => necklace.status === filter
    );
  }

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete product ID: ${id}?`)) {
      setListNecklaces((prev) => prev.filter((necklace) => necklace.id !== id));
      window.alert(`Deleted successfully product ID: ${id}!`);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Necklaces</h2>
      <div className="mb-4 flex items-center space-x-3">
        <label htmlFor="filter" className="text-lg font-medium text-gray-700">
          Choose a filter:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded-lg px-4 py-2 focus:outline-none"
        >
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="out of stock">Out of Stock</option>
        </select>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredNecklaces.map((necklace) => (
            <tr key={necklace.id}>
              <td>{necklace.id}</td>
              <td>{necklace.name}</td>
              <td>{necklace.status}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(necklace.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
