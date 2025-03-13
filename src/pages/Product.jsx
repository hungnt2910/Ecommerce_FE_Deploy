import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProductsByCategory } from "../services/productService";
import { ProductCard } from "../components/Product/ProductCard";
import { Toaster } from "react-hot-toast";

const Product = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { categoryName } = location.state || {};
  const categoryID = queryParams.get("categoryID");

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProductsByCategory(categoryID);
      setProducts(data);
    };
    fetchProducts();
  }, [categoryID]);

  return (
    <div className="py-10 px-4 lg:px-10">
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Category Title */}
      <h1 className="mb-5 flex gap-3 items-center text-2xl font-semibold text-gray-800">
        {categoryName}{" "}
        <span className="text-gray-600 text-lg">
          ({products.length} products)
        </span>
      </h1>

      {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((item, index) => (
            <div key={index} className="relative w-full">
              <ProductCard product={item} />
            </div>
          ))}
        </div>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-10">
            No products found.
          </p>
        )}
    </div>
  );
};

export default Product;
