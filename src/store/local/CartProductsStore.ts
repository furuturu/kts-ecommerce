import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from "mobx";
import { rootStore, RootStore } from "../global/RootStore.ts";
import { ILocalStore, SingleProduct } from "types/types.ts";

type PrivateFields = "_products" | "_loading" | "_error";

export class CartProductsStore implements ILocalStore {
  private _products: SingleProduct[] = [];
  private _loading = false;
  private _error: string | null = null;
  private _rootStore: RootStore;
  private readonly _reactionDisposer: IReactionDisposer;

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;
    makeObservable<CartProductsStore, PrivateFields>(this, {
      _products: observable,
      _error: observable,
      _loading: observable,
      products: computed,
      totalPrice: computed,
      loading: computed,
      error: computed,
      getCartProducts: action,
      destroy: action,
    });

    this._reactionDisposer = reaction(
      () => rootStore.cart.iDs.slice(),
      () => this.getCartProducts(rootStore.cart.iDs),
      { fireImmediately: true },
    );
  }

  get products() {
    return this._products;
  }

  get loading() {
    return this._loading;
  }

  get error() {
    return this._error;
  }

  get totalPrice() {
    const selectedItems = this._rootStore.cart.selectedItems;
    return this._products.reduce((total, product) => {
      if (selectedItems.includes(product.documentId)) {
        const quantity = this._rootStore.cart.getItemQuantityById(
          product.documentId,
        );
        return total + product.price * quantity;
      }
      return total;
    }, 0);
  }

  getCartProducts = async (productIds: string[]) => {
    this._loading = true;
    if (productIds.length === 0) {
      this._products = [];
      this._loading = false;
      return;
    }
    try {
      const response: SingleProduct[] =
        await this._rootStore.api.fetchCartProducts(productIds);
      runInAction(() => {
        this._products = response;
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

  destroy() {
    this._reactionDisposer();
    this._products = [];
    this._loading = false;
    this._error = null;
  }
}

export const createCartProductsStore = () => new CartProductsStore(rootStore);
