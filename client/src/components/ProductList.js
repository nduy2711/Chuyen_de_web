import React, { useEffect, useState } from 'react';
import DeleteProduct from './DeleteProduct';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/product/all')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Lỗi khi lấy danh sách sản phẩm:", error));
  }, []);

  const handleProductDeleted = (deletedId) => {
    setProducts(products.filter(p => p.id !== deletedId));
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px', justifyContent: 'center' }}>
      {products.map(product => (
        <div key={product.id} style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '15px', width: '250px' }}>
          <img 
            src={`http://localhost:5000${product.image}`} 
            alt={product.name} 
            style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '5px' }} 
          />
          <h3>{product.name}</h3>
          <p><strong>ID:</strong> {product.id}</p>
          <p><strong>Giá:</strong> {product.price} VND</p>
          <button onClick={() => console.log("Update", product.id)} style={{ marginRight: '10px' }}>
            Update
          </button>
          <DeleteProduct productId={product.id} onDelete={handleProductDeleted} />
        </div>
      ))}
    </div>
  );
}
