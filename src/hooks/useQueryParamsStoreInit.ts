import { useLocation } from "react-router";
import { rootStore } from "store/global/RootStore.ts";

export const useQueryParamsStoreInit = (): void => {
  const { search } = useLocation();
  rootStore.query.setURLQueryParameters(search);
};
