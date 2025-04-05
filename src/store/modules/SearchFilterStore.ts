import { makeObservable, action, observable, runInAction } from "mobx";
import { productsStore } from "./ProductsStore.ts";
import { getProductCategories } from "services/getProductCategories.ts";
import { ProductCategory } from "types/types.ts";

class SearchFilterStore {
  searchQuery: string = "";
  categories: ProductCategory[] = [];
  selectedCategory: string = "";
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeObservable(this, {
      searchQuery: observable,
      categories: observable,
      selectedCategory: observable,
      loading: observable,
      error: observable,
      setSearchQuery: action,
      fetchCategories: action,
      setSelectedCategory: action,
      applySearchAndCategory: action,
    });
  }

  fetchCategories = async () => {
    this.loading = true;
    try {
      const categoriesData = await getProductCategories();
      runInAction(() => {
        if (categoriesData) {
          this.categories = categoriesData;
        }
      });
    } catch (error) {
      this.error = String(error);
    } finally {
      this.loading = false;
    }
  };

  setSearchQuery = (query: string) => {
    this.searchQuery = query;
  };

  setSelectedCategory = (category: string) => {
    this.selectedCategory = category;
  };

  applySearchAndCategory = () => {
    productsStore.fetchProductsBySearchAndCategory(
      1,
      this.searchQuery,
      this.selectedCategory,
    );
  };
}

export const searchFilterStore = new SearchFilterStore();
