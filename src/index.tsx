import { routesConfig } from "./config/routes.tsx";
import "./config/configureMobX.ts";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./styles/index.css";
import "./styles/Roboto/fonts.css";

const router = createBrowserRouter(routesConfig);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLDivElement,
);

root.render(<RouterProvider router={router} />);

if (module.hot) {
  module.hot.accept();
}
