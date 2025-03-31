import { routesConfig } from "./config/routes.tsx";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "styles/index.css";

const router = createBrowserRouter(routesConfig);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLDivElement,
);

root.render(<RouterProvider router={router} />);
