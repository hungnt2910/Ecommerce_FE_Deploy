import React, { useEffect, useState, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoClose, IoSearch } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { getSuggestions } from "../../services/productService";

const Searchbar = ({ categories }) => {
  const [isDropDown, setIsDropDown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchByProduct, setSearchByProduct] = useState("");
  const [searchByCategoryID, setSearchByCategoryID] = useState("");
  const [required, setRequired] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const nav = useNavigate();
  const inputRef = useRef();
  const dropdownRef = useRef(null);
  const location = useLocation();

  const handleDropDown = () => {
    if (searchByProduct.trim()) {
      setIsDropDown((prev) => !prev);
    }
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchByProduct.trim()) {
        const data = await getSuggestions(searchByProduct);
        setSuggestions(data.suggestions);
        // console.log(suggestions);
      } else {
        setSuggestions((prev) => []);
      }
    };
    if (!isFirstRender) {
      fetchSuggestions();
    }

    setIsFirstRender(false);
  }, [searchByProduct]);

  useEffect(() => {
    if (!searchByProduct.trim()) {
      setSelectedCategory("All Categories");
    }
  }, [searchByProduct]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchProduct = (keyword = "") => {
    setSuggestions([]);
    const searchTerm = keyword.trim() || searchByProduct.trim();

    if (!searchTerm) {
      setRequired(true);
      inputRef.current?.focus();
      return;
    }
    setRequired(false);
    if (keyword.trim()) {
      setSearchByProduct(keyword.trim());
    }

    // Create a new URL object to modify query params
    const params = new URLSearchParams(location.search);
    params.set("keyword", searchTerm);

    // Only update categoryID if it has changed
    if (searchByCategoryID) {
      params.set("categoryID", searchByCategoryID);
    } else {
      params.delete("categoryID"); // Remove category if not set
    }

    nav(`/search?${params.toString()}`);
  };

  const handleCategorySelect = (category, categoryID, event) => {
    event.stopPropagation();
    setIsDropDown(false);
    setSelectedCategory((prev) => category);
    setSearchByCategoryID((prev) => categoryID);
  };

  console.log(searchByCategoryID);

  return (
    <div className="order-3 mt-4 lg:order-2 sm:w-full lg:mt-0 lg:flex lg:w-[40%] xl:w-[50%]">
      <div className="relative flex w-full">
        <div className="relative w-full md:w-[100%]">
          {!searchByProduct && (
            <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          )}
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products"
            value={searchByProduct}
            className={`${
              required && "border-red-500"
            } w-full rounded-l-md border border-r-0 border-gray-300 px-9 py-2 text-gray-900 placeholder-gray-500 focus:outline-0`}
            onChange={(e) => setSearchByProduct(e.target.value)}
          />
          {searchByProduct && (
            <IoClose
              className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700 transition"
              onClick={() => {
                setSearchByProduct("");
                setSearchByCategoryID("");
              }}
            />
          )}
        </div>
        <div
          ref={dropdownRef}
          className={`${
            searchByProduct ? "cursor-pointer" : "cursor-not-allowed opacity-50"
          } relative w-1/3 flex items-center justify-center border border-l-1 border-gray-300 bg-white px-4 text-gray-500`}
          onClick={handleDropDown}
        >
          <span className="w-full text-xs lg:text-md md:text-sm text-center">
            {selectedCategory}
          </span>
          <IoIosArrowDown
            className={`ml-2 h-4 w-4 transform transition-transform duration-300 ${
              isDropDown ? "rotate-180" : "rotate-0"
            }`}
          />
          {isDropDown && (
            <ul className="absolute top-full left-0 z-10 mt-1 w-full lg:w-50 rounded-md bg-white py-1 shadow ring-opacity-5">
              {categories && categories.length > 0 ? (
                categories.map((category) => (
                  <li
                    key={category._id}
                    className="px-4 py-2 text-xs lg:text-base text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={(e) =>
                      handleCategorySelect(category.name, category._id, e)
                    }
                  >
                    {category.name}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-xs lg:text-base text-gray-700">
                  There are currently no product categories
                </li>
              )}
            </ul>
          )}
        </div>
        <button
          onClick={() => handleSearchProduct()}
          className="rounded-r-md bg-black p-4 py-2 cursor-pointer text-white focus:outline-0"
        >
          <IoSearch className="h-5 w-5" />
        </button>

        {suggestions.length > 0 && (
          <div className="absolute top-[100%] w-full bg-white border border-gray-300 rounded-md shadow-lg">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSearchProduct(suggestion.keyword)}
              >
                {suggestion.keyword} {/* Hiển thị gợi ý */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Searchbar;
