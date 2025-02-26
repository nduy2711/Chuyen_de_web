import { Link } from "react-router-dom";
import { necklaces } from "../necklaces";

export function NecklaceList() {
    return (
        <div>
            <h2>Necklace List</h2>
            <ul>
                {necklaces.map((necklace) => (
                    <li key={necklace.id}>
                        <Link to={`/necklace/${necklace.id}`}>{necklace.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}