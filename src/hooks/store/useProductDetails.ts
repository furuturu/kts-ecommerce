import { createProductDetailsStore } from "../../store/local/ProductDetailsStore.ts";
import { useLocalStore } from "../useLocalStore.ts";
import { useRootStore } from "./useRootStore.ts";

export const useProductDetails = () => {
  const rootStore = useRootStore();
  const productDetails = useLocalStore(() =>
    createProductDetailsStore(rootStore),
  );
  return {
    product: productDetails.product,
    loading: productDetails.loading,
    error: productDetails.error,
    getProductDetails: productDetails.getProductDetails,
    store: productDetails,
  };
};
