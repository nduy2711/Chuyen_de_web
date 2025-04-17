import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import UpdateProductModal from "./UpdateProductModal"; // modal tách riêng
import "./update.css";

function UpdateProduct() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/list-product");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <div>
      <h1>Danh sách sản phẩm</h1>
      <div className="product-list">
        {products.map((product) => (
          <CardProduct
            key={product.id}
            product={product}
            onEdit={handleOpenModal}
          />
        ))}
      </div>

      {selectedProduct && (
        <UpdateProductModal
          show={showModal}
          onClose={handleCloseModal}
          product={selectedProduct}
          onUpdated={fetchProducts}
        />
      )}
    </div>
  );
}

function CardProduct({ product, onEdit }) {
  const { name, description, price, image } = product;

  return (
    <div className="product-card">
      <img
        className="product-card-img"
        src={`http://localhost:5000${image}`}
        alt={name}
      />
      <div className="product-card-body">
        <h3 className="product-card-title">{name}</h3>
        <p className="product-card-description">{description}</p>
        <p className="product-card-price">${price}</p>
        <Button variant="primary" onClick={() => onEdit(product)}>
          Cập nhật
        </Button>
      </div>
    </div>
  );
}

export default UpdateProduct;
