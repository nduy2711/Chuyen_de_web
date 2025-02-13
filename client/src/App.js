import './App.css';
import React from "react";
import ProductCard from "./components/ProductCard";

function App() {
  return (
    <div style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", padding: "16px",}}>
      <ProductCard 
        image="necklace1.jpg" 
        name="Initial Letter Necklace" 
        description="18k Gold Filled" 
        price="1.604.000" 
        status="Leaving Soon" 
      />
      <ProductCard 
        image="necklace1.jpg" 
        name="Juno Moonstone Necklace" 
        description="18k Gold Filled" 
        price="2.043.000" 
        status="Best Seller" 
      />
      <ProductCard 
        image="necklace1.jpg" 
        name="Aiko Heart Locket Necklace" 
        description="18k Gold Filled" 
        price="1.604.000" 
        status="Best Seller" 
      />
      <ProductCard 
        image="necklace1.jpg" 
        name="Curb Chain Necklace" 
        description="18k Gold Filled" 
        price="1.268.000" 
        status="Best Seller" 
      />
      <ProductCard 
        image="necklace1.jpg" 
        name="Elizabeth Necklace" 
        description="18k Gold Filled" 
        price="1.474.000" 
        status="Sold Out" 
      />
      <ProductCard 
        image="necklace1.jpg" 
        name="Bridget Teardrop Charm Necklace" 
        description="18k Gold Filled" 
        price="1.474.000" 
        status="Leaving Soon" 
      />
      <ProductCard 
        image="necklace1.jpg" 
        name="Elle Pearl Lariat Necklace" 
        description="18k Gold Filled" 
        price="2.017.000" 
      />
      <ProductCard 
        image="necklace1.jpg" 
        name="Emma Mother of Pearl Pendant Necklace" 
        description="18k Gold Filled" 
        price="1.604.000" 
      />
    </div>
  );
}

export default App;
