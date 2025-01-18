import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { headerLinks } from "./header-links";
import { ChevronDown, ChevronUp } from "lucide-react";

const DesktopNav = ({ marginLeft }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  let closeTimeout = null; // To track the timeout for closing the dropdown


  const handleMouseEnter = (index) => {
    clearTimeout(closeTimeout); // Cancel any close action when hovering
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    closeTimeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 200); // 200ms delay
  }; 

  return (
    <nav aria-label="Main Navigation" className="hidden lg:flex justify-center items-center gap-4">
      <ul className="flex justify-center items-center space-x-[24px] relative">
        {headerLinks.map((link, index) => (
          <li
            key={link.label}
            className="text-sm relative"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {link.sublinks ? (
              <>
                <div
                  className={'desktop-nav-link flex items-center cursor-pointer'}
                >
                  {link.label}
                  {activeDropdown === index ? (
                    <ChevronUp className="ml-1" />
                  ) : (
                    <ChevronDown className="ml-1" />
                  )}
                </div>
                {activeDropdown === index && (
                  <div 
                    className={`absolute top-full mt-3 ${marginLeft} bg-off-white rounded-lg p-4`}
                    onMouseEnter={() => handleMouseEnter(index)} // Keep dropdown open when hovering inside
                    onMouseLeave={handleMouseLeave} // Delayed close on leaving
                  >
                    <p className="mb-4 text-[#434343] font-[500]">Explore {link.label}</p>
                    <div className="min-w-max max-h-[400px] grid grid-cols-3 flex-wrap gap-4 gap-y-4 justify-center">
                        {link.sublinks.map((sublink) => (
                        <Link
                            key={sublink.label}
                            to={sublink.link}
                            onClick={handleMouseLeave}
                            className="block max-w-[250px] font-[500] text-[#000] hover:text-[#61DD00]"
                        >
                            {sublink.label}
                        </Link>
                        ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <NavLink
                className={({ isActive }) =>
                  isActive ? "desktop-nav-link-active" : "desktop-nav-link"
                }
                to={link.link}
              >
                {link.label}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DesktopNav;
