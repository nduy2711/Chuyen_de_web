import React, { useEffect, useState } from "react";

export function SearchProduct() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify", {
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

  const handleSearch = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/product/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword: query }),
      });

      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Lỗi tìm kiếm:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Tìm kiếm sản phẩm</h2>
      <input
        type="text"
        placeholder="Nhập tên sản phẩm..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Tìm kiếm</button>

      <div style={{ marginTop: "20px" }}>
        {results.map((product) => (
          <div key={product._id}>
            <h4>{product.name}</h4>
            <img
              src={`http://localhost:5000${product.image}`}
              alt={product.name}
              width={120}
            />
            <p>Giá: {product.price} VND</p>
          </div>
        ))}
      </div>
    </div>
  );
}
