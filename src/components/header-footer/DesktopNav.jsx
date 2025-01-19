import { NavLink } from "react-router";
import { headerLinks } from "./header-links";

const DesktopNav = () => {


  return (
    <nav aria-label="Main Navigation" className="hidden lg:flex justify-center items-center gap-4">
      <ul className="flex justify-center items-center space-x-[24px] relative">
        {headerLinks.map((link) => (
          <li
            key={link.label}
          >
            <NavLink
                className={({ isActive }) =>
                  isActive ? "desktop-nav-link-active" : "desktop-nav-link"
                }
                to={link.link}
              >
                {link.label}
              </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DesktopNav;
