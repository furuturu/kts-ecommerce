import { makeObservable, observable, action, runInAction } from "mobx";
import { getProductDetails } from "services/getProductDetails.ts";
import { SingleProduct } from "types/types.ts";
import { ILocalStore } from "types/types.ts";

class ProductDetailsStore implements ILocalStore {
  product: SingleProduct | null = null;
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeObservable(this, {
      product: observable.ref,
      loading: observable,
      error: observable,
      fetchProductDetails: action,
      clearProductData: action,
    });
  }

  fetchProductDetails = async (documentId: string) => {
    this.loading = true;
    try {
      const response = await getProductDetails(documentId);
      runInAction(() => {
        if (response.data) {
          this.product = response.data;
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

  clearProductData = () => {
    this.product = null;
  };

  destroy() {
    this.clearProductData();
  }
}

export const createProductDetailsStore = () => new ProductDetailsStore();
