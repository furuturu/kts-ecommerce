import { useRootStore } from "./useRootStore.ts";
import { useLocalStore } from "../useLocalStore.ts";
import { createCartProductsStore } from "store/local/CartProductsStore.ts";

export const useCartProductsStore = () => {
  const rootStore = useRootStore();
  const store = useLocalStore(() => createCartProductsStore(rootStore));

  return {
    products: store.products,
    loading: store.loading,
    error: store.error,
    totalPrice: store.totalPrice,
  };
};
