import React from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const MobileNavDropdown = ({
  subLinks,
  link,
  isOpen,
  onToggle,
  handleToggleButton,
  customIcon,
}) => {
  return (
    <div className="border-b">
      <div className="flex cursor-pointer items-center gap-2 px-4 py-2 text-sm">
        <div
          className="h-fit text-base hover:font-bold"
          onClick={onToggle}
        >
          {link.label}
        </div>
        <div className="flex-1" onClick={onToggle}>
          {customIcon ? (
            customIcon
          ) : isOpen ? (
            <ChevronDown className="ml-auto h-4 w-4" />
          ) : (
            <ChevronRight className="ml-auto h-4 w-4" />
          )}
        </div>
      </div>

      {/* Dropdown content */}
      {isOpen && (
        <div className={`min-w-[8rem] rounded-md`}>
          {subLinks.map(
            (subLink) =>
              subLink && (
                <div key={subLink.label} className="px-6 py-1">
                  <Link
                    to={subLink.link ?? ""}
                    onClick={() => {
                      if (subLink.onClick) {
                        subLink.onClick();
                      }
                      onToggle();
                      handleToggleButton();
                    }}
                    className="text-base hover:font-bold"
                  >
                    {subLink.label}
                  </Link>
                </div>
              ),
          )}
        </div>
      )}
    </div>
  );
};

export default MobileNavDropdown;
