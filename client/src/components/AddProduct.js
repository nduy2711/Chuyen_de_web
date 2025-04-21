import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const AddProduct = () => {
  const [category, setCategory] = useState("Gold");
  const [generatedId, setGeneratedId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    checkAuth();
    fetch(`${process.env.REACT_APP_API_URL}/api/product/last-id?category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        setGeneratedId(data.id);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy ID sản phẩm:", err);
      });
  }, [category]);

  const checkAuth = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/verify`, {
        credentials: "include", // để gửi cookie JWT
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", generatedId);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", image);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/product/add`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Thêm sản phẩm thành công!");
        window.location.reload();
      } else {
        alert("Lỗi: " + result.message);
      }
    } catch (error) {
      console.error("Lỗi khi gửi sản phẩm:", error);
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-center">Thêm sản phẩm</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Product ID</Form.Label>
              <Form.Control type="text" value={generatedId} readOnly />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Bronze">Bronze</option>
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter product description"
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                required
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
            
            <Button variant="primary" type="submit" className="w-100">
              Add Product
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProduct;
