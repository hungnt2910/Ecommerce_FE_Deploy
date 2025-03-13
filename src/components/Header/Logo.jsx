import React from "react";
import { Link } from "react-router-dom";

const variants = [
  {
    _id: "67c950abcdef123456789001",
    product_id: "660001234567890abcdef101",
    sku: "IPH15PM-BLUE-128GB",
    name: "iPhone 15 Pro Max - Xanh - 128GB",
    price: 1200.05,
    salePrice: 11500.05,
    stock: 50,
    images: ["https://picsum.photos/400/300?random=11"],
    isActive: true,
    attributes: [
      {
        _id: "67ce9c6dea353b1483b1f44a",
        variant_id: "67c950abcdef123456789001",
        type: "Model",
        value: "iPhone 15 Pro Max",
      },
      {
        _id: "67ce9c6dea353b1483b1f44b",
        variant_id: "67c950abcdef123456789001",
        type: "Color",
        value: "Blue",
      },
      {
        _id: "67ce9c6dea353b1483b1f44c",
        variant_id: "67c950abcdef123456789001",
        type: "Storage",
        value: "128GB",
      },
    ],
  },
  {
    _id: "67c950abcdef123456789002",
    product_id: "660001234567890abcdef101",
    sku: "IPH15PM-BLUE-256GB",
    name: "iPhone 15 Pro Max - Xanh - 256GB",
    price: 1150.07,
    salePrice: null,
    stock: 30,
    images: ["https://picsum.photos/400/300?random=12"],
    isActive: true,
    attributes: [
      {
        _id: "67ce9c6dea353b1483b1f44d",
        variant_id: "67c950abcdef123456789002",
        type: "Model",
        value: "iPhone 15 Pro Max",
      },
      {
        _id: "67ce9c6dea353b1483b1f44e",
        variant_id: "67c950abcdef123456789002",
        type: "Color",
        value: "Blue",
      },
      {
        _id: "67ce9c6dea353b1483b1f44f",
        variant_id: "67c950abcdef123456789002",
        type: "Storage",
        value: "256GB",
      },
    ],
  },
];

const attributeTypes = Array.from(new Set(variants.flatMap((variant) => variant.attributes).map((attr) => attr.type)))

// console.log(attributeTypes);

const attributeValueByType = {};

attributeTypes.forEach((type) => {
  
})

const Logo = () => {
  return (
    <div className="flex items-center">
      <Link to="/" className="flex items-center">
        <img
          className="h-12 w-auto"
          src="/images/logo.jpg"
          alt="ACCESSED Logo"
        />
      </Link>
    </div>
  );
};

export default Logo;
