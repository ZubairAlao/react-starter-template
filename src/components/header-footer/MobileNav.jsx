import { headerLinks } from "./header-links";
import { NavLink } from "react-router";


const MobileNav = ({ toggle, handleToggleButton, closeMenu }) => {
  return (
    <nav
      aria-label="Mobile Navigation"
      className={`${
        toggle ? "translate-x-0 opacity-100" : "translate-x-full opacity-50"
      } absolute right-0 top-0 z-30 mt-[74px] flex h-screen w-[100%] transform flex-col overflow-y-scroll bg-white p-6 text-[#121212] transition-all duration-500 ease-in-out lg:mt-[94px] lg:hidden`}
    >
      <ul className="pb-32">
        {headerLinks.map((link) => (
          <li key={link.label} className={`mb-2 text-base ${toggle ? "" : ""}`}>
            <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "mobile-nav-link-active border-b font-bold hover:font-bold"
                    : "mobile-nav-link border-b hover:font-bold"
                }
                to={link.link}
                onClick={handleToggleButton} // Close dropdowns and nav
              >
                {link.label}
              </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileNav;
