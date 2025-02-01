import { useState, useEffect, useRef } from "react";
import Logo from "../Logo";
import MobileNav from "./MobileNav";
import { MenuIcon } from "lucide-react";
import { IoClose } from "react-icons/io5";
import DesktopNav from "./DesktopNav";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";


const Header = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggleButton = () => {
    setToggle(!toggle);
  };

  const menuRef = useRef(null);

  // close the menu if click outside the box
  const closeMenu = () => {
    setToggle(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };
    // Add event listener to detect outside clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  // Manage body scroll lock on toggle
  useEffect(() => {
    if (toggle) {
      disableBodyScroll(document.body);
    } else {
      enableBodyScroll(document.body);
    }
  }, [toggle]);

  // Handle screen resizing to reset scroll on desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && toggle) {
        // If on desktop view, reset toggle and remove scroll lock
        setToggle(false);
        enableBodyScroll(document.body);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [toggle]);

  return (
    <header
      className={`fixed top-0 z-50 w-full text-black bg-white shadow-lg text-base transition-all duration-500 max-lg:py-4 py-6`}
    >
      <div className='flex justify-between items-center container'>
        <div className="flex gap-4 justify-between items-start">
          <Logo />
        </div>

          {/* mobile nav bar */}
          <div ref={menuRef} className="lg:hidden">
            <MobileNav
              toggle={toggle}
              handleToggleButton={handleToggleButton}
            />
          </div>

          {/* toggle button */}
          {toggle ? (
            <button
              aria-label="Toggle navigation menu"
              className="relative z-30 cursor-pointer object-contain text-black"
              onClick={handleToggleButton}
            >
              <IoClose size={32} className="" />
            </button>
          ) : (
            <button
              aria-label="Toggle navigation menu"
              className="relative z-30 cursor-pointer object-contain text-black lg:hidden"
              onClick={handleToggleButton}
            >
              <MenuIcon className="h-fit w-[32px]" />
            </button>
          )}

          <DesktopNav />
      </div>
    </header>
  );
};

export default Header;
