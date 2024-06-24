import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout";
// import Dashboard from "./pages/dashboard";
import Login from "./pages/auth/login";
import routePaths from "./config/routePaths";
import UserManagement from "./pages/userManagement";
import SignUp from "./pages/auth/signUp";
import ForgotPassword from "./pages/auth/forgotPassword";
import Organization from "./pages/organization";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: routePaths.organization,
        element: <Organization />,
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
  {
    path: routePaths.signUp,
    element: <SignUp />,
  },
  {
    path: routePaths.forgotPassword,
    element: <ForgotPassword />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
