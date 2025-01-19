import HeaderLogo from "@/assets/react.svg";
import { Link } from "react-router";

const Logo = () => {
  return (
    <div>
      <Link
        to="/"
        className="relative z-30 cursor-pointer"
        aria-label="Home"
        title="Go to Home"
      >
        <img
          src={HeaderLogo}
          alt="Home"
          className="h-[40px] w-[40px]"
          loading="lazy"
        />
      </Link>
    </div>
  );
};

export default Logo;
