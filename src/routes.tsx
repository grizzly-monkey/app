import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout";
// import Dashboard from "./pages/dashboard";
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
        element: <Login />,
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
  {
    path: routePaths.farm,
    element: <Layout />,
    children: [
      {
        path: routePaths.farm,
        element: <Farm />,
      },
    ],
  },
  {
    path: routePaths.polyhouse,
    element: <Layout />,
    children: [
      {
        path: routePaths.polyhouse,
        element: <Polyhouse />,
      },
    ],
  },
  {
    path: routePaths.reservoirs,
    element: <Layout />,
    children: [
      {
        path: routePaths.reservoirs,
        element: <Reservoirs />,
      },
    ],
  },
  {
    path: routePaths.inventory,
    element: <Layout />,
    children: [
      {
        path: routePaths.inventory,
        element: <Inventory />,
      },
    ],
  },
  {
    path: routePaths.tasks,
    element: <Layout />,
    children: [
      {
        path: routePaths.tasks,
        element: <Tasks />,
      },
    ],
  },
  {
    path: routePaths.workflow,
    element: <Layout />,
    children: [
      {
        path: routePaths.workflow,
        element: <Workflow />,
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
