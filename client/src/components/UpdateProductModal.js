import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

function UpdateProductModal({ show, onClose, product, onUpdated }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    status: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewImg, setPreviewImg] = useState("");

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        status: product.status,
      });
      setPreviewImg(
        product.image ? `http://localhost:5000${product.image}` : null
      );
      setImageFile(null);
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImg(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("id", product.id);
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("status", formData.status);

    if (imageFile) {
      data.append("image", imageFile);
    } else {
      data.append("oldImage", product.image);
    }

    try {
      const response = await fetch("http://localhost:5000/api/update-product", {
        method: "PUT",
        body: data,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Cập nhật thành công!");
        onUpdated();
        onClose();
      } else {
        alert("Cập nhật thất bại: " + result.message);
      }
    } catch (err) {
      console.error("Lỗi khi gửi API update:", err);
      alert("Có lỗi xảy ra khi cập nhật");
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <h2>Cập nhật sản phẩm</h2>
      </Modal.Header>
      <Modal.Body>
        <form className="update-form">
          <div className="form-group">
            <label>Mã sản phẩm</label>
            <input
              type="text"
              readOnly
              value={product.id}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Tên sản phẩm</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Mô tả</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="form-control"
            ></textarea>
          </div>
          <div className="form-group">
            <label>Giá</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Trạng thái</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="form-control"
            >
              <option value="available">available</option>
              <option value="out of stock">out of stock</option>
            </select>
          </div>
          <div className="form-group">
            <label>Hình ảnh</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="form-control"
            />
            {previewImg && (
              <img
                src={previewImg}
                alt="Preview"
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  objectFit: "cover",
                  marginTop: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            )}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateProductModal;
