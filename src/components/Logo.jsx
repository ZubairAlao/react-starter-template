import React from "react";
import HeaderLogo from "@/assets/mes-logo.svg";
// mes logo icon
import MesLogoOnly from "@/assets/mes-only-logo.svg";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div>
      <Link
        to="/"
        className="relative z-30 hidden cursor-pointer lg:block"
        aria-label="Home"
        title="Go to Home"
      >
        <img
          src={HeaderLogo}
          alt="MES Logo - Home"
          className="h-[58px] w-[206px]"
          loading="lazy"
        />
      </Link>

      <Link
        to="/"
        className="relative z-30 cursor-pointer lg:hidden"
        aria-label="Home"
        title="Go to Home"
      >
        <img
          src={MesLogoOnly}
          alt="MES Logo - Home"
          className="h-[40px] w-[40px]"
          loading="lazy"
        />
      </Link>
    </div>
  );
};

export default Logo;
