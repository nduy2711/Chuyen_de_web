import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState(""); // ví dụ: "admin"
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("danger");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Gửi kèm cookie
        body: JSON.stringify({
          username: email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setVariant("danger");
        setMessage(data.message || "Đăng nhập thất bại.");
      } else {
        setVariant("success");
        setMessage("✅ " + data.message);

        // TODO: điều hướng sang trang admin nếu cần
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Lỗi khi gọi API:", err);
      setVariant("danger");
      setMessage("Đã xảy ra lỗi, vui lòng thử lại.");
    }
  };

  return (
    <Container style={{ marginTop: "100px" }}>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card
            style={{
              padding: "30px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 className="text-center mb-4">Đăng Nhập</h2>

            {message && <Alert variant={variant}>{message}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Tên đăng nhập</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập tên đăng nhập"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ padding: "10px", fontSize: "16px" }}
                  required
                />
              </Form.Group>

              <Form.Group
                controlId="formBasicPassword"
                style={{ marginTop: "15px" }}
              >
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ padding: "10px", fontSize: "16px" }}
                  required
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                style={{
                  marginTop: "20px",
                  width: "100%",
                  padding: "10px",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Đăng Nhập
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
