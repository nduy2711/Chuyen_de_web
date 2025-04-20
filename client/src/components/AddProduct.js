import React, { useEffect, useState } from "react";

const AddProduct = () => {
  const [category, setCategory] = useState("Gold");
  const [generatedId, setGeneratedId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    checkAuth();
    fetch(`http://localhost:5000/api/product/last-id?category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        setGeneratedId(data.id);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy ID sản phẩm:", err);
      });
  }, [category]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", generatedId);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:5000/api/product/add", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Thêm sản phẩm thành công!");
        window.location.reload();
      } else {
        alert("Lỗi: " + result.message);
      }
    } catch (error) {
      console.error("Lỗi khi gửi sản phẩm:", error);
    }
  };

  return (
    <form className="add-product-container" onSubmit={handleSubmit}>
      <h1>Add Product</h1>
      <input type="text" value={generatedId} readOnly />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Gold">Gold</option>
        <option value="Silver">Silver</option>
        <option value="Bronze">Bronze</option>
      </select>
      <input
        type="text"
        placeholder="Product Name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Product Price"
        required
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="Product Description"
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        required
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
