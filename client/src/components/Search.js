import React, { useState } from "react";
import { necklaces } from "../necklaces";

export function Search() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = () => {
        // Lọc danh sách dựa trên tên sản phẩm chứa từ khóa tìm kiếm (không phân biệt hoa thường)
        const filteredResults = necklaces.filter((necklace) =>
            necklace.name.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filteredResults);
    };

    return (
        <div>
            <h1>Search</h1>
            <input
                type="text"
                placeholder="Enter product's name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            {results.length > 0 ? (
                <ul>
                    {results.map((necklace) => (
                        <li key={necklace.id}>{necklace.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
}
