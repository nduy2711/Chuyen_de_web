import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { necklaces } from "../necklaces";

export function NecklaceAdd() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("available");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm("Are you sure you want to add this product?");
    if (isConfirmed) {
      const newId = `NL0${necklaces.length + 1}`;
      alert(`The product with ID ${newId} has been added successfully!`);
      setName("");
      setPrice("");
      setStatus("available");
      setDescription("");
      setImage(null);
    }
  };

  return (
    <Container>
      <h2 className="text-center">Add New Necklace</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>ID:</Form.Label>
          <Form.Control type="text" value={`NL0${necklaces.length + 1}`} readOnly />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Name:</Form.Label>
          <Form.Control value={name} onChange={(e) => setName(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image:</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImageChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price:</Form.Label>
          <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Status:</Form.Label>
          <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="available">Available</option>
            <option value="out of stock">Out of Stock</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description:</Form.Label>
          <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">Add</Button>
      </Form>
    </Container>
  );
}
