import React from "react";
import { Link } from "react-router";
import { useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();
  // console.log(error);

  return (
    <section className="bg-black">
      <div className="container flex min-h-screen flex-col items-center justify-center py-5">
        <h1 className="text-[36px] font-bold text-red-500">{error.message}</h1>
        <p className="mb-8 mt-4 text-[30px] font-light">
          Oops!
          {error.statusText}
        </p>
        <Link
          to="/"
          className="rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white shadow-md transition-all duration-300 hover:bg-blue-600"
        >
          Go back to Home
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
