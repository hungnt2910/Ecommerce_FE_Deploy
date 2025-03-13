import React from "react";
import WishlistItem from "../components/Wishlist/WishlistItem";
import OrderSummary from "../components/Wishlist/OrderSummary";


const Wishlist = () => {
  return (
    <div className="flex flex-col gap-4 mt-16 lg:mt-5 md:mt-16">
      <h2 className="font-bold uppercase text-3xl">My Wishlist</h2>
      <div>
        <div className="w-full lg:w-3/5">
          <WishlistItem />
        </div>
        <div className="w-full lg:w-2/5">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;