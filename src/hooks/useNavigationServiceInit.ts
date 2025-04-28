import { useNavigate } from "react-router";
import { useEffect } from "react";
import { rootStore } from "../store/global/RootStore.ts";

export const useNavigationServiceInit = (): void => {
  const navigate = useNavigate();
  useEffect(() => {
    rootStore.navigation.setNavigate(navigate);
  }, [navigate]);
};
