import { Outlet, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";

export const App = () => {
  const location = useLocation();

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
