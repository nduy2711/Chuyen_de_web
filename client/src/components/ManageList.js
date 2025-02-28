import { useState } from "react";
import { necklaces } from "../necklaces";

function ManageList() {
  const [selectedProduct, setSelectedProduct] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    image: "",
    status: "",
    price: "",
    description: "",
  });

  const handleUpdateClick = (necklace) => {
    setSelectedProduct(true);
    setFormData(necklace);
  };

  const handleSave = () => {
    const confirmSave = window.confirm(
      "Do you want to save the updated information?"
    );
    if (confirmSave) {
      alert("Updated successfully!");
      setSelectedProduct(false);
    }
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the product id: ${id}?`
    );
    if (confirmDelete) {
      alert(`Deleted successfully product id: ${id}!`);
    }
  };

  return (
    <>
      <div className="grid-container">
        {necklaces.map((necklace) => (
          <div key={necklace.id} className="product-card">
            Name: {necklace.name}
            <button onClick={() => handleDelete(necklace.id)}>Delete</button>
            <button onClick={() => handleUpdateClick(necklace)}>Update</button>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="update-form">
          <h2>Update Product</h2>
          <img
            src={formData.image}
            alt={formData.name}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
          <input type="file" name="image" />
          <input
            type="text"
            value={formData.id}
            readOnly
            style={{
              backgroundColor: "#f0f0f0",
              color: "#808080",
              cursor: "not-allowed",
            }}
          />
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
          >
            <option value="available">Available</option>
            <option value="out of stock">Out of Stock</option>
          </select>
          <input
            type="number"
            value={formData.price}
            placeholder="Price"
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
          <textarea
            value={formData.description}
            placeholder="Description"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setSelectedProduct(null)}>Cancel</button>
        </div>
      )}
    </>
  );
}

export default ManageList;
