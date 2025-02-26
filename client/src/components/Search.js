import React, { useState } from "react";
import {necklaces} from "../necklaces";

export function Search() {
    const [results, setResults] = useState([]);
  
    const handleSearch = () => {
      setResults(necklaces);
    };
  
    return (
      <div>
        <h1>Search</h1>
        <input type="text" placeholder="Tìm kiếm theo tên" />
        <button onClick={handleSearch}>Search</button>
        <ul>
          {results.map((necklace) => (
            <li key={necklace.id}>
              {necklace.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }