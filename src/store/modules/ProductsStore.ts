import { makeObservable, observable, action, runInAction } from "mobx";
import { getProductsList } from "services/getProductsList.ts";
import { StrapiProductsListResponseByPage } from "types/types.ts";

class ProductsStore {
  //Initial State
  data: StrapiProductsListResponseByPage | null = null;
  loading = false;
  error: string | null = null;
  currentPage = 1;

  constructor() {
    makeObservable(this, {
      data: observable.ref,
      loading: observable,
      error: observable,
      currentPage: observable,
      fetchProducts: action.bound,
      setPage: action.bound,
    });
  }

  async fetchProducts(page: number) {
    this.loading = true;
    this.error = null;

    try {
      const productsListData = await getProductsList(page);
      runInAction(() => {
        if (productsListData) {
          this.data = productsListData;
          this.currentPage = page;
        }
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
  }

  setPage(page: number) {
    this.currentPage = page;
    this.fetchProducts(page);
  }
}

export const productsStore = new ProductsStore();
