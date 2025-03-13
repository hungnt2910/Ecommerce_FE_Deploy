import React, { useEffect } from "react";
import { ListProduct } from "../components/Product/ListProduct";
import { Button } from "../components/Button";
import Banner from "../components/Banner/Banner";
import TopCategories from "../components/TopCategories/TopCategories";
import { TopSelling } from "../components/Product/TopSelling";
import { useNavigate } from "react-router-dom";
import {
  fetchFurnitureCollection,
  fetchNewShoesCollection,
  fetchPopularProduct,
} from "../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import SkeletonLoader from "../components/Loader/SkeletionLoader";
import { Toaster } from "react-hot-toast";

export const Home = () => {
  const dispatch = useDispatch();
  const { popularProduct, furniture, newShoes, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchPopularProduct());
    dispatch(fetchFurnitureCollection());
    dispatch(fetchNewShoesCollection());
  }, [dispatch]);

  const nav = useNavigate();
  const navigate = () => {
    nav("/white-page");
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />

      {loading ? (
        <div className="flex justify-center items-center my-50">
          <SkeletonLoader />{" "}
          {/* ✅ Show circular loader while waiting for API */}
        </div>
      ) : error ? (
        <div className="text-center text-red-500 font-semibold">
          Failed to load products. Please try again.
        </div>
      ) : (
        <>
          <Banner />
          <TopCategories title={"Our Top Categories"} />
          <ListProduct
            title={"Popular Products 2023"}
            productList={popularProduct}
          />
          <ListProduct title={"Furniture Collection"} productList={furniture} />
          <ListProduct title={"New Shoes Collection"} productList={newShoes} />

          <div className="flex justify-center items-center my-20">
            <Button
              style={"bg-black text-white px-5 py-3 rounded-3xl cursor-pointer"}
              content={"See more product"}
              clickEvent={navigate}
            />
          </div>
          <TopSelling />
        </>
      )}
    </div>
  );
};
