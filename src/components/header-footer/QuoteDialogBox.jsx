import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { NotepadTextIcon, Phone } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const CancelIcon = ({ size = 24, color = "black" }) => (
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

const QuoteDialogBox = ({ fullwidth = false }) => {
  const [isFreeAccountDialogOpen, setFreeAccountDialogOpen] = useState(false);
  const [isQuoteDialogOpen, setQuoteDialogOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const openQuoteDialog = () => {
    setQuoteDialogOpen(true); // Open the QuoteDialogBox
  };

  const closeQuoteDialog = () => {
    setQuoteDialogOpen(false); // Close the QuoteDialogBox
  };

  const openFreeAccountDialog = () => {
    const accessToken = localStorage.getItem("mes_access");
    if (accessToken) {
      navigate("/quote");
      return;
    }
    setFreeAccountDialogOpen(true); // Open the FreeAccountDialogBox
  };

  const closeFreeAccountDialog = () => {
    setFreeAccountDialogOpen(false); // Close the FreeAccountDialogBox
  };

  return (
    <div>
      {/* First Alert Dialog (Quote Dialog) */}
      <AlertDialog open={isQuoteDialogOpen} onOpenChange={setQuoteDialogOpen}>
        <AlertDialogTrigger
          className={`bg-lime-green text-deep-indigo ${fullwidth ? "w-full" : ""} inline-flex h-10 items-center justify-center rounded-3xl border-[2px] px-8 py-4 text-base font-semibold hover:scale-95`}
        >
          Free Quote
        </AlertDialogTrigger>
        <AlertDialogContent className="max-md:max-w-[20rem]">
          <AlertDialogHeader>
            <AlertDialogCancel className="mx-auto h-10 w-10 rounded-full">
              <CancelIcon />
            </AlertDialogCancel>
            <AlertDialogTitle className="text-center">
              ARE YOU READY FOR A FREE QUOTE?
            </AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col items-center justify-center"></AlertDialogDescription>
          </AlertDialogHeader>

          <div
            className="flex items-center justify-center gap-8"
            onClick={closeQuoteDialog}
          >
            <div className="bg-transparent">
              <a
                href="tel:4234028356"
                className="flex flex-col items-center justify-center gap-4 text-sm text-blue-primary"
              >
                <Phone size={32} />
                <span className="font-semibold text-black">(423) 402-8356</span>
              </a>
            </div>

            <div
              className="cursor-pointer bg-transparent"
              onClick={openFreeAccountDialog}
            >
              <div className="flex flex-col items-center justify-center gap-4 text-sm text-blue-primary">
                <NotepadTextIcon size={32} />
                <span className="font-semibold text-black">Online Quote</span>
              </div>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Second Alert Dialog (Free Account Dialog) */}
      <AlertDialog
        open={isFreeAccountDialogOpen}
        onOpenChange={setFreeAccountDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogCancel className="mx-auto h-10 w-10 rounded-full">
              <CancelIcon />
            </AlertDialogCancel>
            <AlertDialogTitle className="text-center">
              Create your Free account
            </AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col items-center justify-center gap-4">
              <div>
                Creating an account gives you access to a customized Dashboard
                which allows you to update information after submitting a quote
                and helps you stay in touch with important updates about your
                requested service. It takes less than 2 minutes to set up and
                this gives you more control
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex items-center justify-center gap-8">
            <AlertDialogCancel onClick={closeFreeAccountDialog}>
              <Link to="/quote">Not Now</Link>
            </AlertDialogCancel>

            <AlertDialogAction onClick={closeFreeAccountDialog}>
              <Link to="/account/sign-up" state={{ from: pathname }}>
                Continue
              </Link>
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default QuoteDialogBox;
