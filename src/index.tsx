import { routesConfig } from "./config/routes.tsx";
import "./config/configureMobX.ts";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router";
import "./styles/index.css";

const router = createHashRouter(routesConfig);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLDivElement,
);

root.render(<RouterProvider router={router} />);

if (module.hot) {
  module.hot.accept();
}
