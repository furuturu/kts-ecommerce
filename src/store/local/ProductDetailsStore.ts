import {
  makeObservable,
  observable,
  action,
  runInAction,
  computed,
} from "mobx";
import {
  SingleProduct,
  SingleProductResponseByID,
  StrapiProductsListResponse,
} from "types/types.ts";
import { ILocalStore } from "types/types.ts";
import { RootStore } from "../global/RootStore.ts";

type PrivateFields = "_product" | "_loading" | "_error" | "_relatedProducts";

export class ProductDetailsStore implements ILocalStore {
  private _product: SingleProduct | null = null;
  private _relatedProducts: StrapiProductsListResponse | null = null;
  private _loading: boolean = false;
  private _error: string | null = null;
  private _rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;
    makeObservable<ProductDetailsStore, PrivateFields>(this, {
      _product: observable.ref,
      _relatedProducts: observable,
      _loading: observable,
      _error: observable,
      product: computed,
      loading: computed,
      error: computed,
      relatedProducts: computed,
      getProductDetails: action,
      getRelatedProducts: action,
      clearProductData: action,
    });
  }

  get product(): SingleProduct | null {
    return this._product;
  }

  get loading(): boolean {
    return this._loading;
  }

  get error(): string | null {
    return this._error;
  }

  get relatedProducts(): StrapiProductsListResponse | null {
    return this._relatedProducts;
  }

  getProductDetails = async (documentId: string) => {
    this._loading = true;
    try {
      const response: SingleProductResponseByID =
        await this._rootStore.api.fetchProductDetails(documentId);
      runInAction(() => {
        if (response.data) {
          this._product = response.data;
        }
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

  getRelatedProducts = async () => {
    this._loading = true;
    try {
      const response: StrapiProductsListResponse =
        await this._rootStore.api.fetchRelatedProducts(
          String(this._product?.productCategory.id),
        );
      runInAction(() => {
        if (response.data) {
          this._relatedProducts = response;
        }
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

  clearProductData = () => {
    this._product = null;
  };

  destroy() {
    this.clearProductData();
  }
}

export const createProductDetailsStore = (rootStore: RootStore) =>
  new ProductDetailsStore(rootStore);
