import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCartAsync } from "../../redux/slices/cartSlice";
import { addToWishlistAsync } from "../../redux/slices/wishListSlice";
import SkeletonLoader from "../Loader/SkeletionLoader";


export const ProductCard = ({ product }) => {
  const [liked, setLiked] = useState(product?.wishlist || false);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);
  // const cartLoading = useSelector((state) => state.cart.loading);

  useEffect(() => {
    setLiked(product?.wishlist || false);
  }, [product]);

  const handleAddToCart = async (variantId) => {
    setIsAdding(true);
    dispatch(addToCartAsync({ variantId, quantity: 1 }))
      .unwrap()
      .then(() => {
        toast.success("Added to cart!");
        setIsAdding(false);
      })
      .catch((err) => {
        console.error("Add to Cart Failed:", err);
        toast.error(err);
      });
  };

  const handleAddToWishList = async (productId) => {
    const newLiked = !liked;
    setLiked(newLiked);

    dispatch(addToWishlistAsync({ productId, status: newLiked }))
      .unwrap()
      .then(() => {
        // toast.success(
        //   newLiked ? "Added to Wishlist!" : "Removed from Wishlist!"
        // );
      })
      .catch((err) => {
        console.error("Add To Wish List Failed: ", err);

        if (err === 400) {
          toast.error("Please login!!!");
          nav("/login");
        } else {
          toast.error(err);
        }

        setLiked(!newLiked);
      });
  };

  return (
    <div
      class="group relative"
      onClick={() => {
        nav(`/product-detail/${product._id}`);
      }}
    >
      <div className="relative cursor-pointer aspect-square w-full h-full bg-gray-100 rounded-lg shadow-md flex items-center justify-center overflow-hidden transition-transform duration-300 ease-in-out hover:brightness-90 hover:scale-102">
        <button
          className="absolute top-3 left-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleAddToWishList(product._id);
          }}
        >
          {liked ? (
            <FaHeart className="text-red-500 text-xl transition" />
          ) : (
            <FaRegHeart className="text-gray-500 text-xl transition" />
          )}
        </button>

        <img
          src={product.thumbnail}
          alt="Product Thumbnail"
          className="w-full h-full object-cover p-5 bg-white"
        />
      </div>

      <div class="mt-1 flex justify-between cursor-pointer">
        <div>
          <h3 class="text-xl text-gray-700 font-bold size-3 w-fit h-fit">
            <a>
              <span class=" inset-0"></span>
              {product.name}
            </a>
          </h3>
          <p class="mt-0 text-xl text-gray-500">{product.brand_name}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-0 space-x-2">
        <div className="flex items-start flex-col space-x-2 mt-2 text-sm">
          <div className="flex items-center justify-between text-orange-500">
            <FaStar size={16} fill="currentColor" />
            <span className="ml-1 font-medium text-gray-700 text-lg ">
              {product.rating} |
            </span>
            <div className="ml-2 px-1 py-0.5 bg-gray-200 rounded text-lg font-medium text-gray-700">
              {product.quantity_sold} Sold
            </div>
          </div>

          <div>
            {product.original_price === product.selling_price ? (
              <>
                <span className="font-bold text-xl ml-3">
                  ${product.selling_price}
                </span>
              </>
            ) : (
              <>
                <span className="text-gray-400 line-through text-xl ">
                  ${product.original_price}
                </span>
                <span className="font-bold text-xl  ml-3">
                  ${product.selling_price}
                </span>
              </>
            )}
          </div>
        </div>

        <button
          className="p-2 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart(product.variant_id);
          }}
        >
          <span className="text-base">
            {isAdding ? <SkeletonLoader/>: <FaPlus /> }
          </span>
        </button>
      </div>
    </div>
  );
};
