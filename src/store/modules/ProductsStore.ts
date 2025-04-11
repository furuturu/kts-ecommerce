import {
  makeObservable,
  observable,
  action,
  runInAction,
  reaction,
} from "mobx";
import { ILocalStore, StrapiProductsListResponseByPage } from "types/types.ts";
import { getProductsList } from "services/getProductsList.ts";
import { getProductsBySearchAndCategory } from "services/getProductsBySearchAndCategory.ts";
import { getProductsBySearch } from "services/getProductsBySearch.ts";
import { getProductsByCategory } from "services/getProductsByCategory.ts";
import { SearchFilterStore } from "./SearchFilterStore.ts";

export class ProductsStore implements ILocalStore {
  data: StrapiProductsListResponseByPage | null = null;
  loading = false;
  error: string | null = null;
  currentPage = 1;
  private readonly reactionDisposer: () => void;

  constructor(private searchFilterStore: SearchFilterStore) {
    makeObservable(this, {
      data: observable.ref,
      loading: observable,
      error: observable,
      currentPage: observable,
      fetchProducts: action,
      setPage: action,
      resetToFirstPage: action,
      destroy: action,
    });

    this.reactionDisposer = reaction(
      () => ({
        category: this.searchFilterStore.selectedCategory,
      }),
      () => {
        this.resetToFirstPage();
        this.fetchProducts();
      },
    );
  }

  fetchProducts = async (page: number = this.currentPage) => {
    this.loading = true;
    try {
      const { searchQuery, selectedCategory } = this.searchFilterStore;
      let data;
      if (searchQuery && selectedCategory) {
        data = await getProductsBySearchAndCategory(
          page,
          searchQuery,
          selectedCategory,
        );
      } else if (searchQuery) {
        data = await getProductsBySearch(searchQuery);
      } else if (selectedCategory) {
        data = await getProductsByCategory(selectedCategory);
      } else {
        data = await getProductsList(page);
      }
      runInAction(() => {
        this.data = data;
        this.currentPage = page;
      });
    } catch (error) {
      runInAction(() => {
        this.error = String(error);
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  setPage = (page: number) => {
    this.currentPage = page;
    this.fetchProducts(page);
  };

  resetToFirstPage = () => {
    this.currentPage = 1;
  };

  destroy() {
    this.reactionDisposer();
    this.data = null;
    this.loading = false;
    this.error = null;
    this.currentPage = 1;
  }
}

export const createProductsStore = (searchFilterStore: SearchFilterStore) =>
  new ProductsStore(searchFilterStore);
