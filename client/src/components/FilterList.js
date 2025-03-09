import { useState } from "react";
import { necklaces } from "../necklaces";
import { Container, Form, ListGroup } from "react-bootstrap";

function FilterList() {
  const [filter, setFilter] = useState("all");

  const filteredNecklaces = necklaces.filter((necklace) =>
    filter === "all" ? true : necklace.status === filter
  );

  return (
    <Container className="mt-4">
      <h2>Necklaces</h2>
      <Form.Group controlId="filter">
        <Form.Label>Choose a filter:</Form.Label>
        <Form.Select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="out of stock">Out of Stock</option>
        </Form.Select>
      </Form.Group>

      <ListGroup className="mt-3">
        {filteredNecklaces.length > 0 ? (
          filteredNecklaces.map((necklace) => (
            <ListGroup.Item key={necklace.id}>
              <strong>ID:</strong> {necklace.id} - <strong>Name:</strong> {necklace.name}
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>No necklaces found</ListGroup.Item>
        )}
      </ListGroup>
    </Container>
  );
}

export default FilterList;
