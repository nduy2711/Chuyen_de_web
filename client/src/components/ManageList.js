import { useState } from "react";
import { necklaces } from "../necklaces";
import { Card, Button, Form, Modal, Container, Row, Col } from "react-bootstrap";

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
    if (window.confirm("Do you want to save the updated information?")) {
      alert("Updated successfully!");
      setSelectedProduct(null);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete product ID: ${id}?`)) {
      alert(`Deleted successfully product ID: ${id}!`);
    }
  };

  return (
    <Container>
      <Row className="mt-4">
        {necklaces.map((necklace) => (
          <Col md={4} key={necklace.id} className="mb-4">
            <Card className="shadow">
              <Card.Img
                variant="top"
                src={necklace.image}
                alt={necklace.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{necklace.name}</Card.Title>
                <Card.Text>
                  <strong>Status:</strong> {necklace.status} <br />
                  <strong>Price:</strong> ${necklace.price}
                </Card.Text>
                <Button variant="danger" onClick={() => handleDelete(necklace.id)}>
                  Delete
                </Button>{" "}
                <Button variant="warning" onClick={() => handleUpdateClick(necklace)}>
                  Update
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal để cập nhật sản phẩm */}
      {selectedProduct && (
        <Modal show={true} onHide={() => setSelectedProduct(null)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Update Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Image</Form.Label>
                <div>
                  <img
                    src={formData.image}
                    alt={formData.name}
                    style={{ width: "100px", height: "100px", objectFit: "cover", marginBottom: "10px" }}
                  />
                </div>
                <Form.Control type="file" name="image" />
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" value={formData.id} readOnly disabled />
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="available">Available</option>
                  <option value="out of stock">Out of Stock</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setSelectedProduct(null)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}

export default ManageList;
