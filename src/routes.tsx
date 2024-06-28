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
<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
