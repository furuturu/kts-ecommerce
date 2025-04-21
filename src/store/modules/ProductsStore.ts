import {
  makeObservable,
  observable,
  action,
  runInAction,
  computed,
} from "mobx";
import { ILocalStore, StrapiProductsListResponse } from "types/types.ts";
import { rootStore, RootStore } from "../global/RootStore.ts";

type PrivateFields =
  | "_data"
  | "_loading"
  | "_error"
  | "_currentPage"
  | "_searchQuery"
  | "_selectedCategory";

export class ProductsStore implements ILocalStore {
  private _data: StrapiProductsListResponse | null = null;
  private _loading = false;
  private _error: string | null = null;
  private _currentPage = 1;
  private _searchQuery: string = "";
  private _selectedCategory: string = "";
  private _rootStore: RootStore;
  private _isInitialized: boolean = false; // 100% защита от перерендеров

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;
    makeObservable<ProductsStore, PrivateFields>(this, {
      _data: observable.ref,
      _loading: observable,
      _error: observable,
      _currentPage: observable,
      _searchQuery: observable,
      _selectedCategory: observable,
      data: computed,
      loading: computed,
      error: computed,
      currentPage: computed,
      searchQuery: computed,
      selectedCategory: computed,
      getProducts: action,
      setPage: action,
      setSearchQuery: action,
      setSelectedCategory: action,
      resetToFirstPage: action,
      initFromQueryParameters: action,
      destroy: action,
    });
  }

  get data(): StrapiProductsListResponse | null {
    return this._data;
  }

  get loading(): boolean {
    return this._loading;
  }

  get error(): string | null {
    return this._error;
  }

  get currentPage(): number {
    return this._currentPage;
  }

  get searchQuery(): string {
    return this._searchQuery;
  }

  get selectedCategory(): string {
    return this._selectedCategory;
  }

  getProducts = async (page: number = this._currentPage) => {
    this._loading = true;
    try {
      const data: StrapiProductsListResponse =
        await this._rootStore.api.fetchProducts(
          page,
          this._searchQuery,
          this._selectedCategory,
        );
      runInAction(() => {
        this._data = data;
        this._currentPage = page;
        this._rootStore.query.updateQueryParameters({
          page: this._currentPage,
          search: this._searchQuery,
          category: this._selectedCategory,
        });
      });
    } catch (error) {
      runInAction(() => {
        this._error = String(error);
      });
    } finally {
      runInAction(() => {
        this._loading = false;
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
      this._currentPage = parseInt(pageParam);
    }
    if (searchParam) {
      this._searchQuery = searchParam;
    }
    if (categoryParam) {
      this._selectedCategory = categoryParam;
    }

    this._isInitialized = true;
    this.getProducts();
  };

  setPage = (page: number) => {
    this._currentPage = page;
    this.getProducts(page);
  };

  setSearchQuery = (query: string) => {
    this._searchQuery = query.trim();
    this.resetToFirstPage();
    this.getProducts();
  };

  setSelectedCategory = (category: string) => {
    this._selectedCategory = category;
    this.resetToFirstPage();
    this.getProducts();
  };

  resetToFirstPage = () => {
    this._currentPage = 1;
  };

  destroy() {
    this._data = null;
    this._loading = false;
    this._error = null;
    this._currentPage = 1;
    this._searchQuery = "";
    this._selectedCategory = "";
    this._isInitialized = false;
  }
}

export const createProductsStore = () => new ProductsStore(rootStore);
