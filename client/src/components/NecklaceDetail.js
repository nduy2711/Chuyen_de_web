import { useParams, Link } from "react-router-dom";
import { necklaces } from "../necklaces";
import { Container, Card, Button } from "react-bootstrap";

export function NecklaceDetail() {
  const { id } = useParams();
  const necklace = necklaces.find((n) => n.id.toString() === id);

  return necklace ? (
    <Container className="d-flex justify-content-center mt-4">
      <Card style={{ width: '25rem' }} className="shadow">
        <Card.Img variant="top" src={necklace.image} alt={necklace.name} />
        <Card.Body>
          <Card.Title>{necklace.name}</Card.Title>
          <Card.Text>
            <strong>ID:</strong> {necklace.id} <br />
            <strong>Price:</strong> ${necklace.price} <br />
            <strong>Status:</strong> {necklace.status} <br />
            <strong>Description:</strong> {necklace.description}
          </Card.Text>
          <Button as={Link} to="/necklace-list" variant="primary">
            Back to List
          </Button>
        </Card.Body>
      </Card>
    </Container>
  ) : (
    <Container className="text-center mt-4">
      <h2>Necklace not found</h2>
      <Button as={Link} to="/necklace-list" variant="secondary">
        Back to List
      </Button>
    </Container>
  );
}
