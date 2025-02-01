import { useState } from "react";
import { headerLinks } from "./header-links";
import { NavLink } from "react-router";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";


const MobileNav = ({ toggle, handleToggleButton }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <nav
      aria-label="Mobile Navigation"
      className={`${
        toggle ? "translate-x-0 opacity-100" : "-translate-x-full opacity-50"
      } fixed right-0 top-0 z-40 mt-[97px] h-screen w-full transform bg-white p-6 shadow-lg transition-all duration-500 ease-in-out lg:mt-[94px] lg:hidden`}
    >
      <ul className="space-y-4">
        {/* My Account Section */}
        <li className="w-full border-b pb-2">
          <div className="flex justify-between items-center">
            <button onClick={() => toggleDropdown("My Account")} className="flex items-center space-x-2 text-lg font-medium">
              <FaUserCircle className="text-2xl" />
              <span>My Account</span>
            </button>

            <button onClick={() => toggleDropdown("My Account")} className="text-xl">
              {openDropdown === "My Account" ? <IoChevronUp /> : <IoChevronDown />}
            </button>
          </div>

          {/* My Account Dropdown */}
          {openDropdown === "My Account" && (
            <ul className="mt-2 space-y-3 pl-4 border-l-2 border-gray-300">
              <li className="w-full">
                <NavLink
                  className="block w-full pl-2 hover:text-primary"
                  to="/sign-in"
                  onClick={handleToggleButton}
                >
                  Sign In
                </NavLink>
              </li>
              <li className="w-full">
                <NavLink
                  className="block w-full pl-2 hover:text-primary"
                  to="/profile"
                  onClick={handleToggleButton}
                >
                  My Profile
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Map through other navigation links */}
        {headerLinks.map((link) => (
          <li key={link.label} className="w-full border-b pb-2">
            {/* Parent Link */}
            <div className="flex justify-between items-center">
              <NavLink
                className={({ isActive }) =>
                  ` py-2 text-lg font-medium ${
                    isActive ? "text-primary font-bold" : "hover:text-primary"
                  }`
                }
                to={link.link || "#"}
                onClick={handleToggleButton}
              >
                {link.label}
              </NavLink>

              {/* Dropdown Toggle */}
              {link.subcategories && (
                <button onClick={() => toggleDropdown(link.label)} className="text-xl">
                  {openDropdown === link.label ? <IoChevronUp /> : <IoChevronDown />}
                </button>
              )}
            </div>

            {/* Sublinks */}
            {link.subcategories && openDropdown === link.label && (
              <ul className="mt-2 space-y-3 pl-4 border-l-2 border-gray-300">
                {link.subcategories.map((subgroup, index) => (
                  <div key={index} className="space-y-2">
                    {subgroup.map((sublink) => (
                      <li key={sublink.label} className="w-full">
                        <NavLink
                          className={({ isActive }) =>
                            `block w-full pl-2 ${
                              isActive ? "text-primary font-semibold" : "hover:text-primary"
                            }`
                          }
                          to={sublink.link}
                          onClick={handleToggleButton}
                        >
                          {sublink.label}
                        </NavLink>
                      </li>
                    ))}
                  </div>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileNav;
