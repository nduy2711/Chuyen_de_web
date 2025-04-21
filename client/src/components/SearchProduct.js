import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";

export function SearchProduct() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify", {
        credentials: "include",
      });

      if (res.status !== 200) {
        window.location.href = "/login";
      }
    } catch (err) {
      console.error("Lỗi xác thực:", err);
      alert("Không thể xác thực người dùng.");
      window.location.href = "/login";
    }
  };

  const handleSearch = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/product/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword: query }),
      });

      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Lỗi tìm kiếm:", error);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Tìm kiếm sản phẩm</h2>
      <Row className="justify-content-center mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Nhập tên sản phẩm..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Col>
        <Col md="auto">
          <Button variant="primary" onClick={handleSearch}>
            Tìm kiếm
          </Button>
        </Col>
      </Row>

      <Row>
        {results.length === 0 ? (
          <Col className="text-center">
            <Alert variant="info">Không có kết quả nào</Alert>
          </Col>
        ) : (
          results.map((product) => (
            <Col key={product._id} md={4} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={`http://localhost:5000${product.image}`}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>Giá: {product.price} VND</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}
