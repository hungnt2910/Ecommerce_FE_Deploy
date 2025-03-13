import React from "react";
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { FaRegUser, FaRegHeart } from "react-icons/fa6";
import { RiMailSendLine } from "react-icons/ri";
import { LuShoppingCart } from "react-icons/lu";

const MobileMenu = ({toggleMenu, navLinks, categories, setIsCartOpen}) => {
  return (
    <div className="fixed inset-0 z-50 bg-white lg:hidden">
      <div className="flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center">
          <img
            className="h-8 w-auto"
            src="/images/logo.jpg"
            alt="ACCESSED Logo"
          />
        </Link>
        <button
          onClick={toggleMenu}
          className="text-gray-500 hover:text-gray-600"
        >
          <span className="sr-only">Close menu</span>
          <FiX className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-6 flow-root">
        <div className="space-y-6 px-4 py-2">
          <div>
            <Link
              to="/account"
              className="flex items-center text-base font-medium text-gray-900"
              onClick={toggleMenu}
            >
              <FaRegUser className="mr-3 h-6 w-6 flex-shrink-0" />
              Account
            </Link>
          </div>
          <div>
            <Link
              to="/messages"
              className="flex items-center text-base font-medium text-gray-900"
              onClick={toggleMenu}
            >
              <RiMailSendLine className="mr-3 h-6 w-6 flex-shrink-0" />
              Messages
            </Link>
          </div>
          <div>
            <Link
              to="/wishlist"
              className="flex items-center text-base font-medium text-gray-900"
              onClick={toggleMenu}
            >
              <FaRegHeart className="mr-3 h-6 w-6 flex-shrink-0" />
              Wishlist
            </Link>
          </div>
          <div>
            <div
              className="flex items-center text-base font-medium text-gray-900"
              onClick={() => setIsCartOpen(true)}
            >
              <LuShoppingCart className="mr-3 h-6 w-6 flex-shrink-0" />
              Cart
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-base font-medium text-gray-900">Categories</h3>
            <ul className="mt-2 space-y-2">
              {categories.map((category) => (
                <li key={category._id}>
                  <Link
                    to={`/category/${category._id}`}
                    className="text-base text-gray-500 hover:text-gray-900"
                    onClick={toggleMenu}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <ul className="space-y-4">
              {navLinks && navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                    onClick={toggleMenu}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
