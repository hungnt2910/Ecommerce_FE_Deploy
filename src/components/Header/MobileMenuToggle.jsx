import React from "react";
import { FiMenu, FiX } from "react-icons/fi";

const MobileMenuToggle = ({ toggleMenu, isMenuOpen }) => {
  return (
    <div className="flex items-center lg:hidden">
      <button
        onClick={toggleMenu}
        className="text-gray-500 hover:text-gray-600"
      >
        <span className="sr-only">Open main menu</span>
        {isMenuOpen ? (
          <FiX className="h-6 w-6" aria-hidden="true" />
        ) : (
          <FiMenu className="h-6 w-6" aria-hidden="true" />
        )}
      </button>
    </div>
  );
};

export default MobileMenuToggle;
