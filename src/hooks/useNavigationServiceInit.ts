import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useRootStore } from "./store/useRootStore.ts";

export const useNavigationServiceInit = (): void => {
  const navigate = useNavigate();
  const rootStore = useRootStore();
  useEffect(() => {
    rootStore.navigation.setNavigate(navigate);
  }, [navigate, rootStore]);
};
