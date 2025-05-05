import { useLocation } from "react-router";
import { useRootStore } from "./store/useRootStore.ts";

export const useQueryParamsStoreInit = (): void => {
  const rootStore = useRootStore();
  const { search } = useLocation();
  rootStore.query.setURLQueryParameters(search);
};
