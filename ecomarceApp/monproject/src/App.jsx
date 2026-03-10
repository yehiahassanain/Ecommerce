import { useState } from "react";

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Product from "./components/Product/Product";
import Cart from "./components/Cart/Cart";
import Brands from "./components/Brands/Brands";
import Categories from "./components/Categories/Categories";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Notfound from "./components/Notfound/Notfound";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function App() {
  const [count, setCount] = useState(0);
  let router = createBrowserRouter([
    {  path: "/",element: <Layout />,children: [
        { index: true, element:<ProtectedRoute><Home /></ProtectedRoute> },
        { path: "product", element:<ProtectedRoute><Product /></ProtectedRoute> },
        { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: "productdetails/:id/:category", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  return (
    <UserContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </UserContextProvider>
  );
}

export default App;
