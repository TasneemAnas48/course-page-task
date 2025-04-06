import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import HomeLayout from "@/Layouts/HomeLayout";
import { Toaster } from "@/components/ui/toaster";
import { protectedRoutes } from "./routes/config/ProtectedRoutes";
import { publicRoutes } from "./routes/config/PublicRoutes";

const App = () => {
  const router = createBrowserRouter([
    {
      element: <HomeLayout />,
      children: [
        {
          path: '*',
          element: <Navigate to="/course-page-task/home" replace />
        },
        publicRoutes,
        protectedRoutes,
      ]
    }
  ]);


  return (
    <>
      <main className="flex flex-col">
        <RouterProvider router={router} />
      </main>
      <Toaster />
    </>
  );
};

export default App;
