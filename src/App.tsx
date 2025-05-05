import { Outlet, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import { useQueryParamsStoreInit } from "./hooks/useQueryParamsStoreInit.ts";
import { useNavigationServiceInit } from "./hooks/useNavigationServiceInit.ts";

export const App = () => {
  const location = useLocation();
  useQueryParamsStoreInit();
  useNavigationServiceInit();

  return (
    <div>
      <AnimatePresence mode="wait" initial={false}>
        <div key={location.pathname}>
          <Outlet />
        </div>
      </AnimatePresence>
    </div>
  );
};
