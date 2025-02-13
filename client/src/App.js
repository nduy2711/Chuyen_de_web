import "./App.css";
import React from "react";
import ProductCard from "./components/ProductCard";

function App() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "16px",
        padding: "16px",
      }}
    >
      <ProductCard
        image="necklace1.jpg"
        name="Initial Letter Necklace"
        description="18k Gold Filled"
        price="1.604.000"
        status="Leaving Soon"
      />
      <ProductCard
        image="https://midorijewelry.co/cdn/shop/products/bridget-teardrop-charm-necklace-gold-filled-935316_720x.jpg?v=1690017398"
        name="Juno Moonstone Necklace"
        description="18k Gold Filled"
        price="2.043.000"
        status="Best Seller"
      />
      <ProductCard
        image="https://moonmagic.com/cdn/shop/files/240129_MAD_FOR_YOU_NECKLACE_2_BOB_YG_428x.jpg?v=1735913354"
        name="Aiko Heart Locket Necklace"
        description="18k Gold Filled"
        price="1.604.000"
        status="Best Seller"
      />
      <ProductCard
        image="https://midorijewelry.co/cdn/shop/products/curb-chain-sterling-silver-450648_720x.jpg?v=1694574702"
        name="Curb Chain Necklace"
        description="18k Gold Filled"
        price="1.268.000"
        status="Best Seller"
      />
      <ProductCard
        image="https://midorijewelry.co/cdn/shop/products/claire-pendant-necklace-gold-filled-171071_720x.jpg?v=1690017397"
        name="Elizabeth Necklace"
        description="18k Gold Filled"
        price="1.474.000"
        status="Sold Out"
      />
      <ProductCard
        image="https://moonmagic.com/cdn/shop/products/PIC-GAR-GOLD-WN-HEA-6_1_d9f3e2bf-0404-4ce8-b20a-222d1a06c6f5_428x.jpg?v=1716411461"
        name="Bridget Teardrop Charm Necklace"
        description="18k Gold Filled"
        price="1.474.000"
        status="Leaving Soon"
      />
      <ProductCard
        image="https://moonmagic.com/cdn/shop/files/PIC-MS-GOLD-WN-TLOCK-4_1_428x.jpg?v=1737638009"
        name="Elle Pearl Lariat Necklace"
        description="18k Gold Filled"
        price="2.017.000"
      />
      <ProductCard
        image="https://moonmagic.com/cdn/shop/files/PIC-AME-ROSE-WN-76_1_5628adf8-176e-4328-9b07-7c024c2e954a_428x.jpg?v=1734376674"
        name="Emma Mother of Pearl Pendant Necklace"
        description="18k Gold Filled"
        price="1.604.000"
      />
    </div>
  );
}

export default App;
