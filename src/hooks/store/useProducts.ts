import { useRootStore } from "./useRootStore.ts";
import { useLocalStore } from "../useLocalStore";
import { createProductsStore } from "store/local/ProductsStore.ts";

export const useProductStore = () => {
  const rootStore = useRootStore();
  const productStore = useLocalStore(() => createProductsStore(rootStore));

  return {
    data: productStore.data?.data || [],
    loading: productStore.loading,
    error: productStore.error,
    pagination: productStore.data?.meta.pagination,
    currentPage: productStore.currentPage,
    setPage: productStore.setPage,
    setSearchQuery: productStore.setSearchQuery,
    setSelectedCategory: productStore.setSelectedCategory,
    resetAllFilters: productStore.resetAllFilters,
    initFromQueryParameters: productStore.initFromQueryParameters,
    store: productStore,
  };
};
