import { Outlet } from "react-router-dom";
import { ScrollRestoration } from "react-router-dom";
import Header from "../header-footer/Header";
import Footer from "../header-footer/Footer";
import { Toaster } from "../ui/toaster";

const MainLayout = () => {
  return (
    <div className="overflow-hidden">
      <ScrollRestoration />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default MainLayout;
