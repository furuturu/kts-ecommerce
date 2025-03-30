import { RouteObject } from "react-router";
import { App } from "../App.tsx";
import { HomePage } from "../pages/HomePage";
import { ProductDetails } from "../pages/ProductDetails/ProductDetails.tsx";
export const routesConfig: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: ":documentId",
    element: <ProductDetails />,
  },
  {
    path: "/categories",
    element: <App />,
  },
  {
    path: "/about",
    element: <App />,
  },
  {
    path: "/cart",
    element: <App />,
  },
  {
    path: "/profile",
    element: <App />,
  },
];
