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

// Buyer Pages
import MyOrders from "../pages/dashboard/user/MyOrders";
import Payment from "../pages/dashboard/user/Payment";
import PaymentSuccess from "../pages/dashboard/user/PaymentSuccess";
import PaymentCancelled from "../pages/dashboard/user/PaymentCancelled";
import PaymentHistory from "../pages/dashboard/user/PaymentHistory";
import TrackOrder from "../pages/dashboard/user/TrackOrder";

// Admin Pages
import ManageUsers from "../pages/dashboard/admin/ManageUsers";

// Manager Pages
import AddProduct from "../pages/dashboard/manager/AddProduct";
import ManageProducts from "../pages/dashboard/manager/ManageProducts";
import PendingOrders from "../pages/dashboard/manager/PendingOrders";
import ApprovedOrders from "../pages/dashboard/manager/ApprovedOrders";
import AdminAllProducts from "../pages/dashboard/admin/AdminAllProducts";
import AdminAllOrders from "../pages/dashboard/admin/AdminAllOrders";
import UpdateProduct from "../pages/dashboard/manager/UpdateProduct";

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
        path: "profile",
        element: <Profile></Profile>
      },
      // Buyer Routes
      {
        path: "my-orders",
        element: <MyOrders></MyOrders>
      },
      {
        path: "payment/:id",
        element: <Payment></Payment>
      },
      {
        path: "payment/success",
        element: <PaymentSuccess></PaymentSuccess>
      },
      {
        path: "payment/cancelled",
        element: <PaymentCancelled></PaymentCancelled>
      },
      {
        path: "payment-history",
        element: <PaymentHistory></PaymentHistory>
      },
      {
        path: "track-order/:orderId",
        element: <TrackOrder></TrackOrder>
      },
      // Admin Routes
      {
        path: "manage-users",
        element: <ManageUsers></ManageUsers>
      },
      {
        path: "all-products",
        element: <AdminAllProducts></AdminAllProducts>
      },
      {
        path: "all-orders",
        element: <AdminAllOrders></AdminAllOrders>
      },
      // Manager Routes
      {
        path: "add-product",
        element: <AddProduct></AddProduct>
      },
      {
        path: "manage-products",
        element: <ManageProducts></ManageProducts>
      },
      {
        path: "pending-orders",
        element: <PendingOrders></PendingOrders>
      },
      {
        path: "approved-orders",
        element: <ApprovedOrders></ApprovedOrders>
      },
      {
        path: "update-product/:id",
        element: <UpdateProduct></UpdateProduct>
      },
    ]
  }
]);