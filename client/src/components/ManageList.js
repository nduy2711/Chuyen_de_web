import { useState } from "react";
import { necklaces } from "../necklaces";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function ManageList() {
  const [selectedProduct, setSelectedProduct] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    image: "",
    status: "",
    price: "",
    description: "",
  });

  const handleUpdateClick = (necklace) => {
    setSelectedProduct(true);
    handleShow();
    setFormData(necklace);
  };

  const handleSave = () => {
    const confirmSave = window.confirm(
      "Do you want to save the updated information?"
    );
    if (confirmSave) {
      alert("Updated successfully!");
      setSelectedProduct(false);
    }
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the product id: ${id}?`
    );
    if (confirmDelete) {
      alert(`Deleted successfully product id: ${id}!`);
    }
  };

  return (
    <>
      <div className="grid-container">
        <Table
          className="small-table"
          striped
          bordered
          hover
          style={{ width: "90%", margin: "40px" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {necklaces.map((necklace) => (
              <tr key={necklace.id}>
                <td>{necklace.id}</td>
                <td>{necklace.name}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(necklace.id)}
                  >
                    Delete
                  </Button>{" "}
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleUpdateClick(necklace)}
                  >
                    Update
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {selectedProduct && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Necklace</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>ID</Form.Label>
                <Form.Control value={formData.id} disabled />
              </Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <Form.Label>Price</Form.Label>
              <Form.Control
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
              <Form.Label htmlFor="disabledSelect">Status</Form.Label>
              <Form.Select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option>available</option>
                <option>out of stock</option>
              </Form.Select>
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <br />
              <img
                src={formData.image}
                style={{ width: "100px", margin: "20px 0px" }}
              />
              <div>
                <input
                  id="labelUpload"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setFormData({
                        ...formData,
                        image: URL.createObjectURL(file),
                      });
                    }
                  }}
                />
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default ManageList;
