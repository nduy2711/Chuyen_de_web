import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import DeleteProduct from "./DeleteProduct";
import UpdateProductModal from "./UpdateProductModal";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterCat, setFilterCat] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortPrice, setSortPrice] = useState("none");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, filterCat, filterStatus, sortPrice]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/product/all`, {
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

  const applyFilters = () => {
    let filtered = [...products];

    if (filterCat !== "all") {
      filtered = filtered.filter((p) => p.category === filterCat);
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((p) => p.status === filterStatus);
    }

    if (sortPrice === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortPrice === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  };

  return (
    <Container className="py-4">
      <Row className="mb-3 g-3">
        <Col md={4}>
          <Form.Select value={filterCat} onChange={(e) => setFilterCat(e.target.value)}>
            <option value="all">Tất cả loại</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Bronze">Bronze</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">Tất cả trạng thái</option>
            <option value="available">Available</option>
            <option value="out of stock">Out of Stock</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select value={sortPrice} onChange={(e) => setSortPrice(e.target.value)}>
            <option value="none">Sắp xếp theo giá</option>
            <option value="asc">Giá tăng dần</option>
            <option value="desc">Giá giảm dần</option>
          </Form.Select>
        </Col>
      </Row>

      <Row className="g-4">
        {filteredProducts.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <Card.Img
                variant="top"
                src={`${process.env.REACT_APP_API_URL}${product.image}`}
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
