import { useState } from "react";
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
    const isConfirmed = window.confirm(
      "Are you sure you want to add this product?"
    );
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
    <div>
      <h2>Add New Necklace</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label>ID:</label>
          <input type="text" value={`NL0${necklaces.length + 1}`} readOnly />
        </p>
        <p>
          <label>Name:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </p>
        <p>
          <label>Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </p>
        <p>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </p>
        <p>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="available">Available</option>
            <option value="out of stock">Out of Stock</option>
          </select>
        </p>
        <p>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </p>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
