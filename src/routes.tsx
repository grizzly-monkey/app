import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import routePaths from "./config/routePaths";
import UserManagement from "./pages/userManagement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: routePaths.userManagement,
    element: <Layout />,
    children: [
      {
        path: routePaths.userManagement,
        element: <UserManagement />,
      },
    ],
  },
  {
    path: routePaths.login,
    element: <Login />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
