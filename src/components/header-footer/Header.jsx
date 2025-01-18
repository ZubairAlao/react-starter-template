import React, { useState, useEffect, useRef } from "react";
import Logo from "../Logo";
import MobileNav, { CancelIcon } from "./MobileNav";
import { MenuIcon, Phone } from "lucide-react";
import DesktopNav from "./DesktopNav";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import QuoteDialogBox from "./QuoteDialogBox";
import { Link, useLocation } from "react-router-dom";
import UserProfileIcon from "@/assets/icons/user-profile-circle.svg";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ProfileCircle } from "iconsax-react";
import { Close } from "@radix-ui/react-popover";
import useRefreshToken from "@/hooks/use-refresh-token";
import useAuth from "@/hooks/use-auth";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); //scrolling header from y0 change from transparent

  const handleToggleButton = () => {
    setToggle(!toggle);
  };

  const menuRef = useRef(null);

  const { access, dispatch } = useAuth();
  const user = JSON.parse(localStorage.getItem("mes_user"));

  const refreshToken = useRefreshToken();

  // Check whether user is logged in
  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        await refreshToken();
      } catch (error) {
        // console.error(error);
      } finally {
      }
    };

    refreshAccessToken();
  }, []);

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

  // Change 50 to the scroll position where you want the header to change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  const location = useLocation();
  const isHomePage = location.pathname === "/"; //for home nav height adjustment only and opacity adjustment

  return (
    <header
      className={`fixed top-0 z-50 w-full text-white shadow-lg transition-all duration-500 max-lg:py-4 ${
        isHomePage
          ? isScrolled
            ? "bg-blue-primary py-4"
            : "bg-transparent py-4"
          : isScrolled
            ? "bg-blue-primary py-4"
            : "bg-blue-primary py-4"
      } `}
    >
      <div className='flex justify-between items-center container'>
        <div className="flex flex-col gap-4 justify-between items-start">
          <Logo />
          <DesktopNav marginLeft={"-left-10"} />
        </div>

          {/* mobile nav bar */}
          <div ref={menuRef} className="lg:hidden">
            <MobileNav
              toggle={toggle}
              handleToggleButton={handleToggleButton}
              closeMenu={closeMenu}
              user={user}
            />
          </div>


          {/* phone number toggle  and profile and free quote */}
          <div className="flex flex-col max-lg:flex-row justify-between items-center gap-4">
            <div className="flex items-center justify-center gap-4">
              <Phone />
              <a href="tel:4234028356" className="font-semibold">
                (423) 402-8356
              </a>
            </div>

            <div className="flex justify-center items-center gap-4">
              {/* toggle button */}
              {toggle ? (
                <button
                  aria-label="Toggle navigation menu"
                  className="relative z-30 cursor-pointer object-contain"
                  onClick={handleToggleButton}
                >
                  <CancelIcon size={32} color="white" />
                </button>
              ) : (
                <button
                  aria-label="Toggle navigation menu"
                  className="relative z-30 cursor-pointer object-contain text-white lg:hidden"
                  onClick={handleToggleButton}
                >
                  <MenuIcon className="h-fit w-[32px]" />
                </button>
              )}
              <div className="flex items-center justify-center gap-4 max-lg:hidden">
                <Popover>
                  <PopoverTrigger className="outline-none">
                    <ProfileCircle
                      className="~size-7/8"
                      variant="Bold"
                      color="white"
                    />
                  </PopoverTrigger>

                  <PopoverContent className="flex w-max flex-col px-1 pb-3 pt-2 text-center text-sm font-medium">
                    {access ? (
                      <>
                        <Close
                          className="px-8 py-1.5 outline-none transition duration-150 hover:bg-gray-100"
                          asChild
                        >
                          <Link
                            className="block w-full"
                            to="/account/profile/account-info"
                          >
                            Profile
                          </Link>
                        </Close>
                        <Close
                          className="px-8 py-1.5 outline-none transition duration-150 hover:bg-gray-100"
                          asChild
                        >
                          <Link className="block w-full" to="/account/quotes/active">
                            Active Quotes
                          </Link>
                        </Close>
                        {user && user.is_admin && (
                          <>
                            <Close
                              className="px-8 py-1.5 outline-none transition duration-150 hover:bg-gray-100"
                              asChild
                            >
                              <Link className="block w-full" to="/account/admin">
                                Admin Table
                              </Link>
                            </Close>
                            <Close
                              className="px-8 py-1.5 outline-none transition duration-150 hover:bg-gray-100"
                              asChild
                            >
                              <Link className="block w-full" to="/account/contacts">
                                Contacts
                              </Link>
                            </Close>
                            <Close
                              className="px-8 py-1.5 outline-none transition duration-150 hover:bg-gray-100"
                              asChild
                            >
                              <Link
                                className="block w-full"
                                to="/account/subscribers"
                              >
                                Subscribers
                              </Link>
                            </Close>
                          </>
                        )}
                        <Close
                          className="px-8 py-1.5 outline-none transition duration-150 hover:bg-gray-100"
                          onClick={() => dispatch({ type: "LOGOUT" })}
                        >
                          Logout
                        </Close>
                      </>
                    ) : (
                      <>
                        <Close
                          className="px-8 py-1.5 outline-none transition duration-150 hover:bg-gray-100"
                          asChild
                        >
                          <Link className="block w-full" to="/account/login">
                            Login
                          </Link>
                        </Close>
                        <Close
                          className="px-8 py-1.5 outline-none transition duration-150 hover:bg-gray-100"
                          asChild
                        >
                          <Link className="block w-full" to="/account/sign-up">
                            Sign Up
                          </Link>
                        </Close>
                      </>
                    )}
                  </PopoverContent>
                </Popover>
                <div className="">
                  <QuoteDialogBox fullwidth={false} />
                </div>
              </div>
            </div>
          </div>
      </div>
    </header>
  );
};

export default Header;
