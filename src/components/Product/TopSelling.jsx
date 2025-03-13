import React, { useEffect, useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { getTopSellingProduct } from "../../services/productService";

export const TopSelling = () => {
  const [productList, setProductList] = useState([]);
  const nav = useNavigate();

  const fetchTopSelling = async () => {
    const data = await getTopSellingProduct();
    setProductList(data);
  };

  useEffect(() => {
    fetchTopSelling();
  }, []);

  if (productList.length === 0) {
    return <p>Loading...</p>; // Prevent errors when data is empty
  }

  return (
    <div className="p-6 bg-white rounded-lg grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left Side - Featured Product */}
      <div
        className="md:col-span-2 flex flex-col md:flex-row items-center bg-gray-50 rounded-lg p-6 shadow-lg cursor-pointer"
        onClick={() => nav(`/product-detail/${productList[0]._id}`)}
      >
        <div className="flex-1 md:basis-2/3">
          <img
            src={productList[0].thumbnail}
            alt={productList[0].name}
            className="w-full h-auto md:h-[500px] object-cover rounded-lg"
          />
        </div>
        <div className="md:basis-1/3 md:ml-6 text-center md:text-left">
          <p className="text-sm text-gray-500 uppercase">Top Selling</p>
          <h2 className="text-2xl font-bold text-gray-800">
            {productList[0].name}
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Lorem ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <div className="flex items-center justify-center md:justify-start space-x-4 mt-4">
            {productList[0].original_price === productList[0].selling_price ? (
              <>
                <span className="text-lg font-bold text-gray-800">
                  ${productList[0].selling_price}
                </span>
              </>
            ) : (
              <>
                <span className="text-gray-400 line-through text-lg">
                  ${productList[0].original_price}
                </span>
                <span className="text-lg font-bold text-gray-800">
                  ${productList[0].selling_price}
                </span>
              </>
            )}
          </div>
          <div className="flex justify-center items-center">
            <Button
              style="mt-4 flex justify-center items-center px-4 py-2 bg-black text-white rounded-md shadow-md hover:bg-gray-800 transition cursor-pointer"
              content="Start Shopping"
              icon={<FaShoppingBag className="mr-2" />}
              clickEvent={(e) => {
                e.stopPropagation();
                nav(`/product-detail/${productList[0]._id}`);
              }}
            />
          </div>
        </div>
      </div>
      {/* Right Side - Small Product Cards */}
      <div className="flex flex-col space-y-4">
        {productList.slice(1).map((product) => (
          <div
            key={product._id}
            className="bg-gray-50 p-4 rounded-lg shadow-lg cursor-pointer"
            onClick={() => nav(`/product-detail/${product._id}`)}
          >
            <div className="text-left">
              <p className="text-gray-700 text-2xl font-bold ">
                {product.name}
              </p>
              <span className="text-gray-900 font-bold">
                ${product.selling_price}
              </span>
            </div>
            <div className="flex justify-end">
              <img
                src={product.thumbnail}
                alt={product.name}
                className="w-80 md:w-52 md:h-52 object-cover rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
