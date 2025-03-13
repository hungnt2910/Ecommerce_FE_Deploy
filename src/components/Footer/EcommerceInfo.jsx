import React from "react";
import { FaTwitter, FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";

export const EcommerceInfo = () => {
  return (
    <footer className="bg-white text-gray-700 py-8 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          {/* Left Section - Logo & Payment Methods */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              <span className="text-orange-500">LOGO</span>HERE
            </h2>
            <p className="text-sm mt-2">Support all Credit Cards and Payment Methods</p>
            <div className="flex space-x-2 mt-2">
              <img src="https://img.icons8.com/?size=100&id=61469&format=png&color=000000" alt="Apple Pay" className="w-10 h-10" />
              <img src="https://img.icons8.com/?size=100&id=13611&format=png&color=000000" alt="PayPal" className="w-10 h-10" />
              <img src="https://img.icons8.com/?size=100&id=rIqG4ca0W23K&format=png&color=000000" alt="Skrill" className="w-10 h-10" />
              <img src="https://img.icons8.com/?size=100&id=13608&format=png&color=000000" alt="Visa" className="w-10 h-10" />
              <img src="https://img.icons8.com/?size=100&id=13610&format=png&color=000000" alt="MasterCard" className="w-10 h-10   " />
            </div>
            <p className="text-xs mt-4">© LOGOHERE International Ltd, 2025</p>
          </div>

          {/* Middle Section - Navigation */}
          <div>
              <h3 className="font-semibold">Company</h3>
              <ul className="mt-2 space-y-1">
                <li><a href="#" className="hover:underline">Home</a></li>
                <li><a href="#" className="hover:underline">About</a></li>
                <li><a href="#" className="hover:underline">Blog</a></li>
                <li><a href="#" className="hover:underline">Contact</a></li>
              </ul>
            </div>

          <div>
              <h3 className="font-semibold">Account</h3>
              <ul className="mt-2 space-y-1">
                <li><a href="#" className="hover:underline">My Account</a></li>
                <li><a href="#" className="hover:underline">Orders Tracking</a></li>
                <li><a href="#" className="hover:underline">Checkout</a></li>
                <li><a href="#" className="hover:underline">Wishlist</a></li>
              </ul>
            </div>

          {/* Right Section - Contact & Socials (Aligned at the end) */}
          <div className="md:self-start text-sm text-center md:text-right">
            <p className="font-semibold">+01-22-333-22-111-2</p>
            <p className="mt-1">Address here, USA</p>
            <div className="flex justify-center md:justify-end space-x-4 mt-3 text-xl">
              <a href="#" className="text-gray-600 hover:text-gray-900"><FaTwitter /></a>
              <a href="#" className="text-gray-600 hover:text-gray-900"><FaInstagram /></a>
              <a href="#" className="text-gray-600 hover:text-gray-900"><FaFacebookF /></a>
              <a href="#" className="text-gray-600 hover:text-gray-900"><FaYoutube /></a>
            </div>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="mt-6 border-t pt-4 text-xs flex justify-between">
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
        </div>
      </div>
    </footer>
  );
};
