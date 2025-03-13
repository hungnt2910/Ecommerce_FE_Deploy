import WishlistItem from "../components/Wishlist/WishlistItem";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWishlistAsync,
  addToWishlistAsync,
} from "../redux/slices/wishListSlice";
import "react-toastify/dist/ReactToastify.css";
import toast, { Toaster } from "react-hot-toast";
import { addToCartAsync } from "../redux/slices/cartSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const loading = useSelector((state) => state.wishlist.loading);

  useEffect(() => {
    dispatch(fetchWishlistAsync()); // Gọi API lấy danh sách wishlist
  }, [dispatch]);

  // console.log(wishlistItems);

  const handleAddToCart = async (variantId) => {
    dispatch(addToCartAsync({ variantId, quantity: 1 }))
      .unwrap()
      .then(() => {
        toast.success("Added to cart!");
      })
      .catch((err) => {
        console.error("Add to Cart Failed:", err);
        toast.error(err);
      });
  };

  const handleRemove = async (productId) => {
    dispatch(addToWishlistAsync({ productId, status: false }))
      .unwrap()
      .then(() => {
        toast.success("Removed from Wishlist!");
      })
      .catch((err) => {
        console.error("Add To Wish List Failed: ", err);
        toast.error(err);
      });
  };

  return (
    <div className="flex justify-center w-full mt-16 lg:mt-6 md:mt-16 pb-10">
      <div className="flex w-full md:3/4 lg:w-3/4 flex-col gap-4">
        <Toaster position="top-center" reverseOrder={false} />
        <h2 className="font-bold uppercase text-3xl">My Wishlist</h2>
        <div className="w-full flex flex-col gap-4">
          {wishlistItems.length > 0 ? (
            wishlistItems.map((item, index) => {
              return (
                <WishlistItem
                  product={item}
                  onAddToCart={handleAddToCart}
                  onRemove={handleRemove}
                />
              );
            })
          ) : (
            <h2 className="font-bold uppercase text-center text-2xl">
              There is no product on the favorite list
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
