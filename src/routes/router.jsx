import { createBrowserRouter } from "react-router";

import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/home/HomePage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import NotFound from "../pages/error/NotFound";
import About from "../pages/common/About";
import Contact from "../pages/common/Contact";

// Protected Routes
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ManagerRoute from "./ManagerRoute";

// Dashboard Pages
import Profile from "../pages/dashboard/common/Profile";
import DashboardHome from "../pages/dashboard/common/DashboardHome";

// User Pages
import MyOrders from "../pages/dashboard/user/MyOrders";
import Payment from "../pages/dashboard/user/Payment";
import PaymentSuccess from "../pages/dashboard/user/PaymentSuccess";
import PaymentCancelled from "../pages/dashboard/user/PaymentCancelled";
import PaymentHistory from "../pages/dashboard/user/PaymentHistory";
import TrackOrder from "../pages/dashboard/user/TrackOrder";

// Manager Pages
import AddProduct from "../pages/dashboard/manager/AddProduct";
import ManageProducts from "../pages/dashboard/manager/ManageProducts";
import PendingOrders from "../pages/dashboard/manager/PendingOrders";
import ApprovedOrders from "../pages/dashboard/manager/ApprovedOrders";
import UpdateProduct from "../pages/dashboard/manager/UpdateProduct";

// Admin Pages
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import AdminAllProducts from "../pages/dashboard/admin/AdminAllProducts";
import AdminAllOrders from "../pages/dashboard/admin/AdminAllOrders";

// Public Pages
import AllProducts from "../pages/products/AllProducts";
import ProductDetails from "../pages/products/ProductDetails";
import OrderPage from "../pages/Order/OrderPage";
import AdminManagerRoute from "./AdminManagerRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "products", element: <AllProducts /> },
      { 
        path: "products/:id", 
        element: <PrivateRoute><ProductDetails /></PrivateRoute> 
      },
      { 
        path: "order/:id", 
        element: <PrivateRoute><OrderPage /></PrivateRoute> 
      },
      { 
        path: "profile", 
        element: <PrivateRoute><Profile /></PrivateRoute> 
      }
    ]
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> }
    ]
  },
  {
    path: "dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <DashboardHome /> 
      },
      {
        path: "profile",
        element: <Profile />
      },
      
      // Admin Routes
      {
        path: "manage-users",
        element: <AdminRoute><ManageUsers /></AdminRoute>
      },
      {
        path: "all-products",
        element: <AdminRoute><AdminAllProducts /></AdminRoute>
      },
      {
        path: "all-orders",
        element: <AdminRoute><AdminAllOrders /></AdminRoute>
      },

      // Manager Routes
      {
        path: "add-product",
        element: <ManagerRoute><AddProduct /></ManagerRoute>
      },
      {
        path: "manage-products",
        element: <ManagerRoute><ManageProducts /></ManagerRoute>
      },
      {
        path: "update-product/:id",
        element: <AdminManagerRoute><UpdateProduct /></AdminManagerRoute>
      },
      {
        path: "pending-orders",
        element: <ManagerRoute><PendingOrders /></ManagerRoute>
      },
      {
        path: "approved-orders",
        element: <ManagerRoute><ApprovedOrders /></ManagerRoute>
      },

      // Buyer Routes
      {
        path: "my-orders",
        element: <MyOrders />
      },
      {
        path: "payment/:id",
        element: <Payment />
      },
      {
        path: "payment/success",
        element: <PaymentSuccess />
      },
      {
        path: "payment/cancelled",
        element: <PaymentCancelled />
      },
      {
        path: "payment-history",
        element: <PaymentHistory />
      },
      {
        path: "track-order/:orderId",
        element: <TrackOrder />
      }
    ]
  }
]);