import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { headerLinks } from "./header-links";
import { Button } from "../ui/button";
import StarsIcons from "@/assets/icons/stars.svg";
import LocationIcons from "@/assets/icons/location-icon.svg";
import MailIcons from "@/assets/icons/mail-icon.svg";

import Instagram from "@/assets/icons/instagram.svg";
import Facebook from "@/assets/icons/facebook.svg";
import LinkedIn from "@/assets/icons/linkedin.svg";
import Twitter from "@/assets/icons/twitter.svg";

// mes logo icon
import MesLogoOnly from "@/assets/mes-only-logo.svg";
import DesktopNav from "./DesktopNav";
import MobileNavDropdown from "./MobileNavDropdown";
import { useToast } from "@/hooks/use-toast";
import axios from "@/api/axios";
import { NL_EP } from "@/api/endpoints";
import { Input } from "../ui/input";

const Footer = () => {
  const [subscribersEmail, setSubscribersEmail] = useState("");

  const { toast } = useToast();

  const today = new Date();
  const thisYear = today.getFullYear();

  const [toggle, setToggle] = useState(false);

  const handleToggleButton = () => {
    setToggle(!toggle);
  };

  const [activeDropdown, setActiveDropdown] = useState(null); // Track active dropdown

  const handleDropdownToggle = (label) => {
    setActiveDropdown((prev) => (prev === label ? null : label));
  };

  const handleMainLinkClick = () => {
    setActiveDropdown(null); // Reset active dropdown on main link click
    handleToggleButton(); // Close the mobile nav if necessary
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(NL_EP, { email: subscribersEmail });

      toast({
        title: "Subscribed successfully",
        description: res.data.message,
      });
      setSubscribersEmail("");
    } catch (error) {
      const message = error?.response?.data?.non_field_errors?.[0];
      toast({
        variant: "default",
        title: "Congrats, you're already subscribed!",
        description: message || "Please try again",
      });
      // console.error(error);
    }
  };

  return (
    <footer className="relative overflow-hidden bg-deep-indigo pb-9 pt-20 text-white">
      {/* background image */}
      <div className="absolute -right-16 bottom-0 z-[4] min-h-[550px] w-full max-w-[900px] bg-hero-background bg-cover bg-center bg-no-repeat"></div>

      <div className="relative z-20 mb-16 flex flex-wrap items-center justify-center gap-8 max-lg:justify-start">
        <div className="hidden h-[1px] flex-1 bg-white lg:block"></div>
        <div className="relative z-30">
          <DesktopNav marginLeft="-left-44" />
        </div>
        <ul className="container w-full lg:hidden">
          {headerLinks.map((link) => (
            <li
              key={link.label}
              className={`mb-2 text-base ${toggle ? "" : ""}`}
            >
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
                    isActive ? "mobile-nav-link-active" : "mobile-nav-link"
                  }
                  to={link.link}
                  onClick={handleMainLinkClick} // Close dropdowns and nav
                >
                  {link.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
        <div className="hidden h-[1px] flex-1 bg-white lg:block"></div>
      </div>

      <div className="container relative z-10 space-y-16">
        <div className="flex flex-col items-start justify-between gap-y-8 md:flex-row">
          <div className="mx-auto w-fit space-y-8 md:mx-0 md:space-y-0">
            <h3 className="subheading text-center md:text-left">
              Subscribe to our news letter
            </h3>
            <form
              onSubmit={onSubmit}
              className="contact-form w-full space-y-4 text-[10px] lg:max-w-[611px]"
            >
              <div>
                <label htmlFor="email">Email Address</label>
                <Input
                  type="email"
                  id="email"
                  className="text-black"
                  placeholder="Johndoe@email.com"
                  autoComplete="email"
                  value={subscribersEmail}
                  onChange={(e) => setSubscribersEmail(e.target.value)}
                />
              </div>

              <Button
                children="Subscribe"
                className="bg-lime-green px-8 py-3 text-deep-indigo max-md:mx-auto"
              />
            </form>
          </div>
          <img
            src={StarsIcons}
            alt="stars"
            loading="lazy"
            className="h-fit max-w-[40px] self-center lg:max-w-[78px]"
          />

          <div className="relative mx-auto md:mx-0">
            <h3 className="subheading mb-4 text-center">Contact Us</h3>
            <div className="mb-3 flex items-start justify-start gap-2">
              <img
                src={LocationIcons}
                alt="location icon"
                className="h-fit max-w-[30px]"
              />
              <a
                href="https://maps.app.goo.gl/mVQkE9o5RgcTKWhh6"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-lime-green hover:underline"
              >
                Campus Square, 817 W Walnut St #9, Johnson City, TN 37601
              </a>
            </div>
            <div className="flex items-center justify-start gap-2">
              <img
                src={MailIcons}
                alt="email icon"
                className="h-fit max-w-[30px]"
              />
              <a
                href="mailto:mes@mdeservicestnfinest.com"
                className="hover:text-lime-green hover:underline"
              >
                mes@mdeservicestnfinest.com
              </a>
            </div>

            <div className="mt-9 flex items-center justify-center gap-4">
              <a
                href="https://www.instagram.com/m.d.enviromentalservices/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={Instagram}
                  alt="instagram icon"
                  className="social-icon h-fit max-w-[30px] cursor-pointer"
                />
              </a>
              <a
                href="https://www.facebook.com/M.D.EnvironmentalServices/?ref=pages_you_manage"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={Facebook}
                  alt="facebook icon"
                  className="social-icon h-fit max-w-[30px] cursor-pointer"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/m-d-environmental-llc-835864217"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={LinkedIn}
                  alt="linkedin icon"
                  className="social-icon h-fit max-w-[30px] cursor-pointer"
                />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img
                  src={Twitter}
                  alt="twitter icon"
                  className="social-icon h-fit max-w-[30px] cursor-pointer"
                />
              </a>
            </div>
          </div>
        </div>

        <p className="text-center">
          Copyright {thisYear} MES. All Rights Reserved.
        </p>

        <div className="h1">
          <div className="flex items-center justify-start gap-4">
            <p className="text-[2.7rem] font-[900] leading-[56px] md:text-[4.5rem] md:leading-[80px] lg:text-[6.56rem] lg:leading-[105px]">
              MD
            </p>
            <img
              src={MesLogoOnly}
              alt="mes logo"
              loading="lazy"
              className="min-h-[45px] max-w-[45px] md:min-h-[94px] md:max-w-[94px]"
            />
          </div>
          <p className="text-[2.7rem] font-[900] leading-[56px] md:text-[4.5rem] md:leading-[80px] lg:text-[6.56rem] lg:leading-[105px]">
            Environmental
          </p>
          <p className="text-[2.7rem] font-[900] leading-[56px] md:text-[4.5rem] md:leading-[80px] lg:text-[6.56rem] lg:leading-[105px]">
            Services
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
