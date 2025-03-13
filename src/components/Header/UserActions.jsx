import React, { useEffect } from "react";
import { FaRegUser } from "react-icons/fa6";
import { RiMailSendLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartQuantityAsync,
  resetCartState,
} from "../../redux/slices/cartSlice";
import toast from "react-hot-toast";
import {
  fetchWishlistQuantityAsync,
  resetWishlistState,
} from "../../redux/slices/wishListSlice";
import { BiLogOutCircle } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";

const UserActions = ({ setIsCartOpen }) => {
  const username = JSON.parse(localStorage.getItem("username"));
  const cartCount = useSelector((state) => state.cart.totalQuantity);
  const wishListCount = useSelector((state) => state.wishlist.totalQuantity);
  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    dispatch(fetchCartQuantityAsync());
    dispatch(fetchWishlistQuantityAsync());
  }, [dispatch]);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    dispatch(resetCartState());
    dispatch(resetWishlistState());
    window.location.reload();

    nav("/");
    toast.success("Logout success");
  };

  return (
    <div className="hidden lg:order-3 lg:flex lg:items-center lg:space-x-6">
      {username ? (
        <>
          <Link
            to="/profile"
            className="flex items-center text-gray-700 hover:text-gray-900"
          >
            <FaRegUser className="h-6 w-6" />
            <div className="ml-2">
              <p className="text-xs text-gray-500">{username}</p>
              {/* <p className="text-sm font-medium">Logout</p> */}
            </div>
          </Link>
        </>
      ) : (
        <>
          <Link
            to="/login"
            className="flex items-center text-gray-700 hover:text-gray-900"
          >
            <FaRegUser className="h-6 w-6" />
            <div className="ml-2">
              <p className="text-xs text-gray-500">Sign in</p>
              <p className="text-sm font-medium">Account</p>
            </div>
          </Link>
        </>
      )}
      {username ? (
        <Link
          className="text-gray-700 hover:text-gray-900"
          onClick={handleLogout}
        >
          <FiLogOut className="h-6 w-6" />
        </Link>
      ) : (
        <></>
      )}
      <Link
        to="/wishlist"
        className="relative text-gray-700 hover:text-gray-900"
      >
        <FaRegHeart className="h-6 w-6" />
        <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          {wishListCount}
        </span>
      </Link>

      <div
        className="relative cursor-pointer"
        onClick={() => setIsCartOpen(true)}
      >
        <LuShoppingCart className="h-6 w-6" />
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          {cartCount}
        </span>
      </div>
    </div>
  );
};

export default UserActions;
