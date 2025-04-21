import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
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
      const res = await fetch("http://localhost:5000/api/product/all", {
        credentials: "include",
      });

      const data = await res.json();

      if (res.status === 401 || res.status === 403) {
        window.location.href = "/login";
        return;
      }

      if (!Array.isArray(data)) {
        alert("Lỗi khi tải sản phẩm.");
        setProducts([]);
        return;
      }

      setProducts(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      alert("Lỗi kết nối tới máy chủ.");
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
    <Container className="py-4">
      <Row className="g-4">
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <Card.Img
                variant="top"
                src={`http://localhost:5000${product.image}`}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  <strong>ID:</strong> {product.id}
                  <br />
                  <strong>Giá:</strong> {product.price} VND
                </Card.Text>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleOpenModal(product)}
                  className="me-2"
                >
                  Cập nhật
                </Button>
                <DeleteProduct
                  productId={product.id}
                  onDelete={handleProductDeleted}
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedProduct && (
        <UpdateProductModal
          show={showModal}
          onClose={handleCloseModal}
          product={selectedProduct}
          fetchProducts={fetchProducts}
        />
      )}
    </Container>
  );
}
