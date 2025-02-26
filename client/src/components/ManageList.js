import { useState } from "react";
import { necklaces as initialNecklaces } from "../necklaces"; // Import danh sách gốc

function ManageList() {
  const [necklacesList, setNecklacesList] = useState(initialNecklaces); // Lưu danh sách vào state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    image: "",
    status: "",
    price: "",
    description: "",
  });

  const handleUpdateClick = (necklace) => {
    setSelectedProduct(necklace);
    setFormData(necklace);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const confirmSave = window.confirm(
      "Bạn có muốn lưu thông tin đã cập nhật không?"
    );
    if (confirmSave) {
      setNecklacesList(
        necklacesList.map((item) =>
          item.id === formData.id ? { ...formData } : item
        )
      );
      setSelectedProduct(null);
    }
  };

  return (
    <>
      <div className="grid-container">
        {necklacesList.map((necklace) => (
          <div key={necklace.id} className="product-card">
            Name: {necklace.name}
            <button>Delete</button>
            <button onClick={() => handleUpdateClick(necklace)}>Update</button>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="update-form">
          <h2>Update Product</h2>
          <input type="text" name="id" value={formData.id} readOnly />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Product Name"
          />
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="Image URL"
          />
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            placeholder="Status"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Price"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setSelectedProduct(null)}>Cancel</button>
        </div>
      )}
    </>
  );
}

export default ManageList;
