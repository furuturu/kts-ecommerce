import {
  makeObservable,
  action,
  observable,
  runInAction,
  computed,
} from "mobx";
import { getProductCategories } from "services/getProductCategories.ts";
import { ILocalStore, ProductCategory } from "types/types.ts";

export class SearchFilterStore implements ILocalStore {
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
      setSelectedCategory: action,
      fetchCategories: action,
      categoryOptions: computed,
      destroy: action,
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
    this.searchQuery = query.trim();
  };

  setSelectedCategory = (category: string) => {
    this.selectedCategory = category;
  };

  get categoryOptions() {
    return [
      { key: "", value: "Все категории" },
      ...this.categories.map((category) => ({
        key: category.id,
        value: category.title,
      })),
    ];
  }

  destroy = () => {
    this.searchQuery = "";
    this.selectedCategory = "";
  };
}

export const createSearchFilterStore = () => new SearchFilterStore();
