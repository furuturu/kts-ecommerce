import { useRootStore } from "./useRootStore.ts";
import { useLocalStore } from "../useLocalStore.ts";
import { createCategoriesStore } from "store/local/CategoryStore.ts";

export const useCategoryStore = () => {
  const rootStore = useRootStore();
  const categoryStore = useLocalStore(() => createCategoriesStore(rootStore));

  return {
    categories: categoryStore.categories,
    loading: categoryStore.loading,
    error: categoryStore.error,
    getCategories: categoryStore.getCategories,
    categoryOptions: categoryStore.categoryOptions,
  };
};
