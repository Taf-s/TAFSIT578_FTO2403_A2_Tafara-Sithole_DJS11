import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSearch } from "../SearchProvider";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { searchQuery, handleSearch } = useSearch();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleInputChange = (event) => {
    const query = event.target.value;
    handleSearch(query);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center relative">
        {/* Logo and Menu Items */}
        <div className="flex items-center text-white">
          <img src={logo} alt="PodAI Logo" className="h-10 w-10 mr-2 ml-4" />
          <span className="text-6xl font-bold ml-2">PodAI</span>
          <ul className="hidden md:flex space-x-6 text-white ml-10">
            <li>
              <Link to="/">Shows</Link>
            </li>
            <li>
              <Link to="/genre">Genres</Link>
            </li>
            <li>
              <Link to="/favourites">Favourites</Link>
            </li>
          </ul>
        </div>

        {/* Search Bar */}
        <ul className="hidden md:flex space-x-6 mr-4 text-white">
          <li>
            <input
              type="text"
              placeholder="Search podcasts....."
              value={searchQuery}
              onChange={handleInputChange}
              className="p-2 rounded bg-gray-700 text-white"
            />
          </li>
        </ul>

        {/* Mobile Menu Icon */}
        <div
          className="md:hidden text-white text-2xl cursor-pointer"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu */}
      <ul
        className={`md:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        } bg-gray-700 text-white p-4`}
      >
        <li className="py-2">
          <Link to="/" onClick={toggleMobileMenu}>
            Home
          </Link>
        </li>
        <li className="py-2">
          <Link to="/genre" onClick={toggleMobileMenu}>
            Genres
          </Link>
        </li>
        <li className="py-2">
          <Link to="/favourites" onClick={toggleMobileMenu}>
            Favourites
          </Link>
        </li>
        <li>
          <input
            type="text"
            placeholder="Search shows..."
            value={searchQuery}
            onChange={handleInputChange}
            className="p-2 rounded bg-gray-600 text-white w-full"
          />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
