import React from "react";

export default function DeleteProduct({ productId, onDelete }) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa sản phẩm này?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/product/delete/${productId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        onDelete(productId);
        alert("Đã xóa sản phẩm thành công!");
      } else {
        alert("Không thể xóa sản phẩm.");
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
}
