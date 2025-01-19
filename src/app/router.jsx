import { useMemo } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router';
import LandingPage from './routes/LandingPage';
import NotFoundPage  from "./routes/NotFoundPage";
import ErrorPage from "@/components/ErrorPage";
import MainLayout from "@/components/layouts/MainLayout";

export const createAppRouter = () => {
    return createBrowserRouter([
      {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <LandingPage />,
          },
    
          {
            path: "*",
            element: <NotFoundPage />,
          },
        ],
      },
    ]);
  };
  
  export const AppRouter = () => {
    const router = useMemo(() => createAppRouter(), []);
    return <RouterProvider router={router} />;
  };
