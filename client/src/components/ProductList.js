import React, { useEffect, useState } from "react";
import DeleteProduct from "./DeleteProduct";
import UpdateProductModal from "./UpdateProductModal";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/product/all");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    }
  };

  const handleProductDeleted = (deletedId) => {
    setProducts(products.filter((p) => p.id !== deletedId));
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        padding: "20px",
        justifyContent: "center",
      }}
    >
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "15px",
            width: "250px",
          }}
        >
          <img
            src={`http://localhost:5000${product.image}`}
            alt={product.name}
            style={{
              width: "100%",
              height: "180px",
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
          <h3>{product.name}</h3>
          <p>
            <strong>ID:</strong> {product.id}
          </p>
          <p>
            <strong>Giá:</strong> {product.price} VND
          </p>
          <button
            onClick={() => handleOpenModal(product)}
            style={{ marginRight: "10px" }}
          >
            Update
          </button>
          <DeleteProduct
            productId={product.id}
            onDelete={handleProductDeleted}
          />
        </div>
      ))}

      {selectedProduct && (
        <UpdateProductModal
          show={showModal}
          onClose={handleCloseModal}
          product={selectedProduct}
          fetchProducts={fetchProducts}
        />
      )}
    </div>
  );
}
