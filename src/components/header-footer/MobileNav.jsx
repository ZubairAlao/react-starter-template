import React, { useState } from "react";
import { headerLinks } from "./header-links";
import { Link, NavLink } from "react-router-dom";
import MobileNavDropdown from "./MobileNavDropdown";
import UserProfileIconBlue from "@/assets/icons/user-profile-circle-blue.svg";
import QuoteDialogBox from "./QuoteDialogBox";
import { CircleUserRound, User2Icon } from "lucide-react";
import useAuth from "@/hooks/use-auth";

export const CancelIcon = ({ size = 24, color = "black" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const MobileNav = ({ toggle, handleToggleButton, closeMenu, user }) => {
  const [activeDropdown, setActiveDropdown] = useState(null); // Track active dropdown

  const { access, dispatch } = useAuth();

  const accountLinks = {
    label: "Account",
    link: "/account/profile/account-info",
    sublinks: [
      !access && { label: "Login", link: "/account/login" },
      !access && {
        label: "Sign Up",
        link: "/account/sign-up",
      },
      access && { label: "Active Quotes", link: "/account/quotes/active" },
      user &&
        user.is_admin && {
          label: "Admin Table",
          link: "/account/admin",
        },
      user && user.is_admin && { label: "Contacts", link: "/account/contacts" },
      user &&
        user.is_admin && {
          label: "Subscribers",
          link: "/account/subscribers",
        },
      access && {
        label: "Logout",
        link: "/account/profile/account-info",
        onClick: () => dispatch({ type: "LOGOUT" }),
      },
    ],
  };

  const handleDropdownToggle = (label) => {
    setActiveDropdown((prev) => (prev === label ? null : label));
  };

  const handleMainLinkClick = () => {
    setActiveDropdown(null); // Reset active dropdown on main link click
    handleToggleButton(); // Close the mobile nav if necessary
  };

  return (
    <nav
      aria-label="Mobile Navigation"
      className={`${
        toggle ? "translate-x-0 opacity-100" : "translate-x-full opacity-50"
      } absolute right-0 top-0 z-30 mt-[74px] flex h-screen w-[100%] transform flex-col overflow-y-scroll bg-white p-6 text-[#121212] transition-all duration-500 ease-in-out lg:mt-[94px] lg:hidden`}
    >
      <ul className="pb-32">
        <li className="mb-2 border-b text-base">
          <MobileNavDropdown
            subLinks={accountLinks.sublinks}
            link={accountLinks}
            isOpen={activeDropdown === "Account"}
            onToggle={() => handleDropdownToggle("Account")}
            handleToggleButton={handleToggleButton}
            customIcon={
              <CircleUserRound className="ml-auto size-6 text-blue-primary" />
            }
          />
        </li>
        {headerLinks.map((link) => (
          <li key={link.label} className={`mb-2 text-base ${toggle ? "" : ""}`}>
            {link.sublinks ? (
              <MobileNavDropdown
                subLinks={link.sublinks}
                link={link}
                isOpen={activeDropdown === link.label}
                onToggle={() => handleDropdownToggle(link.label)}
                handleToggleButton={handleToggleButton}
              />
            ) : (
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "mobile-nav-link-active border-b font-bold hover:font-bold"
                    : "mobile-nav-link border-b hover:font-bold"
                }
                to={link.link}
                onClick={handleMainLinkClick} // Close dropdowns and nav
              >
                {link.label}
              </NavLink>
            )}
          </li>
        ))}
        <li className="mt-6" onClick={closeMenu}>
          <QuoteDialogBox fullwidth={true} />
        </li>
      </ul>
    </nav>
  );
};

export default MobileNav;
