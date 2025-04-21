import React from "react";
import { Button } from "react-bootstrap";

export default function DeleteProduct({ productId, onDelete }) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa sản phẩm này?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/product/delete/${productId}`, {
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

  return (
    <Button variant="danger" size="sm" onClick={handleDelete}>
      Xóa
    </Button>
  );
}
