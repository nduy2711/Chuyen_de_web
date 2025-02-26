import { useParams } from "react-router-dom";
import { necklaces } from "../necklaces";

export function NecklaceDetail() {
    const { id } = useParams();
    const necklace = necklaces.find((n) => n.id.toString() === id);

    return necklace ? (
        <div>
            <h2>{necklace.name}</h2>
            <p><strong>ID:</strong> {necklace.id}</p>
            <img src={`/assets/${necklace.image}`} alt={necklace.name} width="100" />
            <p><strong>Price:</strong> ${necklace.price}</p>
            <p><strong>Status:</strong> {necklace.status}</p>
            <p><strong>Description:</strong> {necklace.description}</p>
        </div>
    ) : (
        <h2>Necklace not found</h2>
    );
}