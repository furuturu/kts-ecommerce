import { useContext } from "react";
import { RootStoreContext } from "../../context/RootStoreContext.ts";

export const useRootStore = () => {
  const store = useContext(RootStoreContext);
  if (!store) throw new Error("useRootStore must be used within context");
  return store;
};
