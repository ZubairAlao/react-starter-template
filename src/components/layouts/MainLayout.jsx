import { Outlet } from "react-router";
import { ScrollRestoration } from "react-router";
import Header from "../header-footer/Header";
import Footer from "../header-footer/Footer";

const MainLayout = () => {
  return (
    <div className="overflow-hidden">
      <ScrollRestoration />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
