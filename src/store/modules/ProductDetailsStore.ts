import { makeObservable, observable, action, runInAction } from "mobx";
import { SingleProduct, SingleProductResponseByID } from "types/types.ts";
import { ILocalStore } from "types/types.ts";
import { rootStore, RootStore } from "../global/RootStore.ts";

class ProductDetailsStore implements ILocalStore {
  product: SingleProduct | null = null;
  loading: boolean = false;
  error: string | null = null;
  private _rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;
    makeObservable(this, {
      product: observable.ref,
      loading: observable,
      error: observable,
      getProductDetails: action,
      clearProductData: action,
    });
  }

  getProductDetails = async (documentId: string) => {
    this.loading = true;
    try {
      const response: SingleProductResponseByID =
        await this._rootStore.api.fetchProductDetails(documentId);
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

export const createProductDetailsStore = () =>
  new ProductDetailsStore(rootStore);
