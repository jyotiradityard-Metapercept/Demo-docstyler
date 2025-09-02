import React, { useState, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import mainlogo from "../assets/images/metRLOGO.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200); // adjust delay as needed
  };

  return (
    <nav className="sticky top-0 w-full h-[100px] px-8 flex items-center justify-between bg-gradient-to-r from-[#bee5fc]/60 to-[#d3bdfc]/60 backdrop-blur-md z-50 font-[poppins] shadow-md">
      {/* Left Section (Logo) */}
      <div className="flex items-center h-full">
        <Link to="/">
          <img src={mainlogo} alt="Logo" className="h-20 cursor-pointer" />
        </Link>
      </div>


      {/* Middle Section (DITA PUBLISHER & Contact Us) */}
      <div className="flex items-center justify-center w-full gap-8">
        {/* home */}
      <Link
          to="/"
          className="text-black text-xl font-semibold cursor-pointer hover:text-gray-800"
        >
          HOME
        </Link>
        {/* Dropdown Container */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Trigger */}
          <div className="flex items-center gap-1 cursor-pointer text-black text-xl font-semibold hover:text-gray-800 transition-all">
            <span>DITA PUBLISHER</span>
            <FaChevronDown className="text-sm mt-[2px]" />
          </div>

          {/* Dropdown Menu */}
          <div
            className={`absolute top-full left-0 mt-2 w-52  shadow-md backdrop-blur-md  bg-gradient-to-b from-[#d3bdfc]/100 to-[#bee5fc]/100 z-50 transition-all duration-300 ease-out transform ${
              isDropdownOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-[-10px] pointer-events-none"
            }`}
          >
            <ul className="flex flex-col p-3 gap-2 text-black text-[18px] text-center font-semibold">
              <li className="hover:text-gray-800">
                <Link to="/html-editor">HTML </Link>
              </li>
              <li className="hover:text-gray-800">
                <Link to="/pdf-editor">PDF </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact */}
        <Link
          to="https://met-r.io/contact-us"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black text-xl font-semibold cursor-pointer hover:text-gray-800"
        >
          CONTACT US
        </Link>
      </div>

      {/* Right Section (Hamburger Menu) */}
      <FaBars className="text-black text-3xl cursor-pointer hover:text-gray-800" />
    </nav>
  );
};

export default Navbar;
