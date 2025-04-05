import { makeObservable, observable, action, runInAction } from "mobx";
import { getProductsList } from "services/getProductsList.ts";
import { StrapiProductsListResponseByPage } from "types/types.ts";
import { getProductsBySearchAndCategory } from "../../services/getProductsBySearchAndCategory.ts";

class ProductsStore {
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
      fetchProducts: action,
      setPage: action,
      fetchProductsBySearchAndCategory: action,
    });
  }

  fetchProducts = async (page: number) => {
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
  };

  setPage = (page: number) => {
    this.currentPage = page;
    this.fetchProducts(page);
  };

  fetchProductsBySearchAndCategory = async (
    page: number,
    search: string,
    category: string,
  ) => {
    this.loading = true;
    try {
      const filteredProductsData = await getProductsBySearchAndCategory(
        page,
        search,
        category,
      );
      runInAction(() => {
        if (filteredProductsData) {
          this.data = filteredProductsData;
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
  };
}

export const productsStore = new ProductsStore();
