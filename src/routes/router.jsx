import { createBrowserRouter, Navigate } from "react-router";

import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/home/HomePage";

import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../pages/dashboard/common/Profile";
import AllProducts from "../pages/products/AllProducts";
import ProductDetails from "../pages/products/ProductDetails";
import OrderPage from "../pages/Order/OrderPage";
import MyOrders from "../pages/dashboard/user/MyOrders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <HomePage></HomePage>
      },
      {
        path: "profile",
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
      },
      {
        path: "products",
        element: <AllProducts></AllProducts>
      },
      {
        path: "products/:id",
        element: <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>
      },
      {
        path: "order/:id",
        element: <PrivateRoute><OrderPage></OrderPage></PrivateRoute>
      }
    ]
  },
  {
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "login",
        element: <Login></Login>
      },
      {
        path: "register",
        element: <Register></Register>
      }
    ]
  },
  {
    path: "dashboard",
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        index: true, 
        element: <Navigate to="/dashboard/profile" replace />
      },
      {
        path: "my-orders", 
        element: <MyOrders></MyOrders>
      },
      {
        path: "profile",
        element: <Profile></Profile>
      }
    ]
  }
]);