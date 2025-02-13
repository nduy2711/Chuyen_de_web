import React from "react";

const ProductCard = ({ image, status, name, description, price }) => {
  return (
    <div style={{padding: "16px", width: "256px", position: "relative", backgroundColor: "white",}}>
      {status && (
        <div style={{position: "absolute", top: "25px", right: "25px", backgroundColor: "#16a34a", color: "white", fontSize: "12px", padding: "4px 8px",}}>
          {status}
        </div>
      )}
      <img src={image} alt={name} style={{width: "100%", height: "330px", objectFit: "cover",}} />
      <div style={{ marginTop: "16px" }}>
        <h3 style={{fontSize: "18px", fontWeight: "600", marginTop: "16px",}}>{name}</h3>
        <p style={{fontSize: "14px", color: "#4b5563",}}>{description}</p>
        <p style={{fontSize: "16px", fontWeight: "bold", color: "#1f2937", marginTop: "8px",}}>{price} VND</p>
      </div>
    </div>
  );
};

export default ProductCard;