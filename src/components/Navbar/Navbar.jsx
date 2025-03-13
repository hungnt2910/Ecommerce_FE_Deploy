import React, { useRef, useState } from "react";
import { BiCategory } from "react-icons/bi";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Today's Deals", href: "/today-deals" },
  { name: "Customer Services", href: "/customer-services" },
  { name: "Trending Products", href: "/trending-products" },
  { name: "Blog", href: "/blog" },
  { name: "Special Offers", href: "/special-offers" },
];

const Navbar = ({ categories }) => {
  const [isDropDown, setIsDropDown] = useState(false);
  const [isActive, setIsActive] = useState("Home");
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const nav = useNavigate();

  const handleDropDown = () => {
    setIsDropDown((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleGetProductsByCategory = (categoryID, categoryName) => {
    setIsDropDown(false);
    nav(`/products?categoryID=${categoryID}`, { 
      state: { categoryName: categoryName }
    });
  };

  return (
    <nav className="bg-white mt-20 ">
      <div className="min-w-full mx-auto hidden px-20 lg:block">
        <div className="flex items-center justify-between">
          <div className="relative w-[40%] py-4">
            <button
              className="flex items-center gap-2 cursor-pointer font-bold text-gray-700 hover:text-gray-900"
              onClick={(e) => handleDropDown(e)}
              ref={buttonRef}
            >
              <BiCategory className="h-5 w-5" />
              CATEGORIES
            </button>
            {isDropDown && (
              <ul
                className="absolute w-[80%] rounded-sm shadow top-[100%] left-0 text-black z-50 bg-white grid grid-cols-3 gap-4 justify-center items-center"
                ref={dropdownRef}
              >
                {categories.length > 0 ? (
                  categories.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="px-4 py-2 text-center hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleGetProductsByCategory(item._id, item.name)}
                      >
                        {item.name}
                      </li>
                    );
                  })
                ) : (
                  <li className="px-4 py-2 text-center col-span-3">
                    There are currently no product categories
                  </li>
                )}
              </ul>
            )}
          </div>

          <ul className="flex gap-10 text-sm lg:text-base sm:text-sm">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.href}
                  className={` ${
                    isActive === link.name ? "text-gray-900" : ""
                  } truncate font-semibold block py-4 text-gray-500 hover:text-gray-900`}
                  onClick={() => setIsActive((prev) => link.name)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
