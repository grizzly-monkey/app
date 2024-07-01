import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout";
// import Dashboard from "./pages/dashboard";
import Login from "./pages/auth/login";
import routePaths from "./config/routePaths";
import UserManagement from "./pages/userManagement";
import SignUp from "./pages/auth/signUp";
import ForgotPassword from "./pages/auth/forgotPassword";
import Organization from "./pages/organization";
import AddInventory from "./pages/inventory/addInventory";
import Inventory from "./pages/inventory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: routePaths.organization,
        element: <Organization />,
      },
      {
        path: routePaths.userManagement,
        element: <UserManagement />,
      },
      {
        path: routePaths.inventory,
        element: <Inventory />,
      },
      {
        path: routePaths.addInventory,
        element: <AddInventory />,
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
