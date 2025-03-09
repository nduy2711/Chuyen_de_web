import { Link } from "react-router-dom";
import { necklaces } from "../necklaces";
import { Container, ListGroup } from "react-bootstrap";

export function NecklaceList() {
    return (
        <Container>
            <h2 className="text-center my-4">Necklace List</h2>
            <ListGroup>
                {necklaces.map((necklace) => (
                    <ListGroup.Item key={necklace.id} action as={Link} to={`/necklace/${necklace.id}`}>
                        {necklace.name}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
}
