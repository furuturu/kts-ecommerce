import { makeObservable, observable, action, runInAction } from "mobx";
import { ILocalStore, StrapiProductsListResponse } from "types/types.ts";
import { rootStore, RootStore } from "../global/RootStore.ts";

export class ProductsStore implements ILocalStore {
  data: StrapiProductsListResponse | null = null;
  loading = false;
  error: string | null = null;
  currentPage = 1;
  searchQuery: string = "";
  selectedCategory: string = "";
  private _rootStore: RootStore;
  private _isInitialized: boolean = false; // 100% защита от перерендеров

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;
    makeObservable(this, {
      data: observable.ref,
      loading: observable,
      error: observable,
      currentPage: observable,
      searchQuery: observable,
      selectedCategory: observable,
      getProducts: action,
      setPage: action,
      setSearchQuery: action,
      setSelectedCategory: action,
      resetToFirstPage: action,
      initFromQueryParameters: action,
      updateQueryParameters: action,
      destroy: action,
    });
  }

  getProducts = async (page: number = this.currentPage) => {
    this.loading = true;
    try {
      const data: StrapiProductsListResponse =
        await this._rootStore.api.fetchProducts(
          page,
          this.searchQuery,
          this.selectedCategory,
        );
      runInAction(() => {
        this.data = data;
        this.currentPage = page;
        this.updateQueryParameters();
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

  initFromQueryParameters = () => {
    if (this._isInitialized) return;

    const pageParam = this._rootStore.query.getParameterValue("page") as string;
    const searchParam = this._rootStore.query.getParameterValue(
      "search",
    ) as string;
    const categoryParam = this._rootStore.query.getParameterValue(
      "category",
    ) as string;

    if (pageParam) {
      this.currentPage = parseInt(pageParam);
    }
    if (searchParam) {
      this.searchQuery = searchParam;
    }
    if (categoryParam) {
      this.selectedCategory = categoryParam;
    }

    this._isInitialized = true;
    this.getProducts();
  };

  updateQueryParameters = () => {
    const queryParams: Record<string, string> = {};
    if (this.currentPage > 1) {
      queryParams.page = String(this.currentPage);
    }

    if (this.searchQuery) {
      queryParams.search = this.searchQuery;
    }
    if (this.selectedCategory) {
      queryParams.category = this.selectedCategory;
    }

    const queryParamsParsedToString = new URLSearchParams(
      queryParams,
    ).toString();

    const newUrl =
      window.location.pathname +
      (queryParamsParsedToString ? `?${queryParamsParsedToString}` : "");

    if (window.location.pathname + window.location.search !== newUrl) {
      window.history.pushState({}, "", newUrl);
    }

    this._rootStore.query.setURLQueryParameters(queryParamsParsedToString);
  };

  setPage = (page: number) => {
    this.currentPage = page;
    this.getProducts(page);
  };

  setSearchQuery = (query: string) => {
    this.searchQuery = query.trim();
    this.resetToFirstPage();
    this.getProducts();
  };

  setSelectedCategory = (category: string) => {
    this.selectedCategory = category;
    this.resetToFirstPage();
    this.getProducts();
  };

  resetToFirstPage = () => {
    this.currentPage = 1;
  };

  destroy() {
    this.data = null;
    this.loading = false;
    this.error = null;
    this.currentPage = 1;
    this.searchQuery = "";
    this.selectedCategory = "";
    this._isInitialized = false;
  }
}

export const createProductsStore = () => new ProductsStore(rootStore);
