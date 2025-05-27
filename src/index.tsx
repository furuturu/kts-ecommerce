import { routesConfig } from "./config/routes.tsx";
import "./config/configureMobX.ts";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router";
import "./styles/index.css";
import { RootStoreProvider } from "./context/RootStoreProvider.tsx";

const router = createHashRouter(routesConfig);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLDivElement,
);

root.render(
  <RootStoreProvider>
    <RouterProvider router={router} />
  </RootStoreProvider>,
);

if (module.hot) {
  module.hot.accept();
}
