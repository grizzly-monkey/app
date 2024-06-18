import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout";
import Dashboard from "./pages/dashboard";
import Login from "./pages/auth/login";
import routePaths from "./config/routePaths";
import UserManagement from "./pages/userManagement";
import SignUp from "./pages/auth/signUp";
import ForgotPassword from "./pages/auth/forgotPassword";
import Farm from "./pages/farm";
import Polyhouse from "./pages/polyhouse";
import Reservoirs from "./pages/reservoirs";
import Inventory from "./pages/inventory";
import Tasks from "./pages/tasks";
import Workflow from "./pages/workflow";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: routePaths.userManagement,
        element: <UserManagement />,
      },
      {
        path: routePaths.farm,
        element: <Farm />,
      },
      {
        path: routePaths.polyhouse,
        element: <Polyhouse />,
      },
      {
        path: routePaths.reservoirs,
        element: <Reservoirs />,
      },
      {
        path: routePaths.inventory,
        element: <Inventory />,
      },
      {
        path: routePaths.tasks,
        element: <Tasks />,
      },
      {
        path: routePaths.workflow,
        element: <Workflow />,
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
