import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const WishlistItem = ({ product, onRemove, onAddToCart }) => {
  const nav = useNavigate();
  return (
    <div className="w-full flex justify-between items-center p-2 lg:p-4 shadow rounded-md bg-white">
      <img
        className="w-15 md:w-20 lg:w-24 object-cover rounded-md cursor-pointer"
        src={product.thumbnail}
        alt={product.name}
        onClick={() => nav(`/product-detail/${product.product_id}`)}
      />
      <div className="flex-1 ml-2 lg:ml-10">
        <h4
          className="font-semibold text-xs md:text-sm lg:text-lg cursor-pointer"
          onClick={() => nav(`/product-detail/${product.product_id}`)}
        >
          {product.name}
        </h4>
        {/* <p className="text-gray-600">${product.price.toLocaleString()}</p> */}
      </div>
      <div className="flex gap-3 lg:gap-10">
        <button
          onClick={() => onAddToCart(product.variantDefault)}
          className="text-xs md:text-sm lg:text-lg bg-black text-white px-4 py-2 rounded-md hover:bg-gray-500 transition cursor-pointer"
        >
          <MdOutlineShoppingCart />
        </button>
        <button
          onClick={() => onRemove(product.product_id)}
          className="bg-red-500 text-xs text-white p-3 rounded-md hover:bg-red-600 transition cursor-pointer"
        >
          <FaRegTrashAlt />
        </button>
      </div>
    </div>
  );
};

export default WishlistItem;
