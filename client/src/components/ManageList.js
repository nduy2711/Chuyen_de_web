import { useState } from "react";
import { necklaces } from "../necklaces";

function ManageList() {
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

  const handleSave = () => {
    const confirmSave = window.confirm(
      "Bạn có muốn lưu thông tin đã cập nhật không?"
    );
    if (confirmSave) {
      alert("Đã lưu thông tin sản phẩm");
      setSelectedProduct(null);
    }
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc muốn xóa sản phẩm mang mã hiệu ${id}?`
    );
    if (confirmDelete) {
      alert(`Đã xóa sản phẩm ${id} thành công!`);
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
            name="id"
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
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <select
            name="status"
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
            name="price"
            value={formData.price}
            placeholder="Price"
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
          <textarea
            name="description"
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
