import React from "react";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-[#afafb0] text-gray-900 w-full p-4 flex items-center justify-between">
      {/* Search Bar */}
      <div className="flex-grow max-w-lg mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-slate-800 text-gray-200 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <FaSearch className="absolute top-2 left-3 text-gray-400" />
        </div>
      </div>

      {/* User Profile/Other Icons */}
      <div className="flex items-center space-x-4">
        {/* Example Icon */}
        <a href="#" className="text-gray-400 hover:text-white">
          <FaSearch size={20} />
        </a>
        {/* Add more icons or a user profile picture here */}
      </div>
    </nav>
  );
};

export default Navbar;
