import { RouteObject } from "react-router";
import { HomePage } from "../pages/HomePage";
import { ProductDetails } from "../pages/ProductDetails";
import { Categories } from "../pages/Categories";
import { AboutUs } from "../pages/AboutUs";
import { Cart } from "../pages/Cart";
import { User } from "../pages/User";
import { App } from "../App.tsx";
export const routesConfig: RouteObject[] = [
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/products/:documentId",
        element: <ProductDetails />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/profile",
        element: <User />,
      },
    ],
  },
];
