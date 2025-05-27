import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
} from "mobx";
import { handleError } from "utils/handleError.ts";
import { ApiError } from "types/error.ts";

interface CartItem {
  documentId: string;
  quantity: number;
}

type PrivateFields = "_items" | "_error" | "_selectedItems";

export class CartStore {
  private _items: CartItem[] = [];
  private _error: ApiError | null = null;
  private _selectedItems: string[] = [];
  private readonly _reactionDisposer: IReactionDisposer;

  constructor() {
    makeObservable<CartStore, PrivateFields>(this, {
      _items: observable,
      _error: observable,
      _selectedItems: observable,
      items: computed,
      error: computed,
      selectedItems: computed,

      addItem: action,
      removeItem: action,
      updateQuantity: action,
      _handleStorageChange: action,
      clearCart: action,

      totalItems: computed,
      iDs: computed,

      toggleItemSelection: action,
      selectAllItems: action,
      clearSelectedItems: action,

      isAllSelected: computed,
      totalSelectedItems: computed,

      destroy: action,
    });
    this.initFromLocalStorage();
    this._reactionDisposer = reaction(
      () => [this._items.slice(), this._selectedItems.slice()],
      () => this.saveToLocalStorage(),
      { fireImmediately: true },
    );

    if (typeof window !== "undefined") {
      window.addEventListener("storage", this._handleStorageChange);
    }
  }

  _handleStorageChange = (event: StorageEvent) => {
    if (event.key === "cart" && event.newValue) {
      try {
        this._items = JSON.parse(event.newValue);
      } catch (error) {
        this._error = handleError(error);
      }
    }

    if (event.key === "selectedItemsInCart" && event.newValue) {
      try {
        this._selectedItems = JSON.parse(event.newValue);
      } catch (e) {
        this._error = handleError(e);
      }
    }
  };

  get items(): CartItem[] {
    return this._items;
  }

  get selectedItems(): string[] {
    return this._selectedItems;
  }

  isProductSelected(itemId: string) {
    return this._selectedItems.includes(itemId);
  }

  get isAllSelected() {
    return (
      this._items.length > 0 &&
      this._selectedItems.length === this._items.length
    );
  }

  get totalSelectedItems(): number {
    return this._selectedItems.reduce((total, itemId) => {
      const item = this._items.find((item) => item.documentId === itemId);
      return total + (item ? item.quantity : 0);
    }, 0);
  }

  selectAllItems = () => {
    this._selectedItems = this._items.map((item) => item.documentId);
  };

  clearSelectedItems = () => {
    this._selectedItems = [];
  };

  get totalItems() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get error() {
    return this._error;
  }

  get iDs() {
    return this._items.map((item) => item.documentId);
  }

  getItemQuantityById(id: string) {
    return this._items.find((item) => item.documentId === id)?.quantity || 0;
  }

  checkIfProductIsInCart(id: string) {
    if (!this._items) return false;
    return this._items.some((item) => item.documentId === id);
  }

  addItem = (itemId: string) => {
    if (!this._items) this._items = [];
    const itemInCart = this._items?.find(
      (product) => product.documentId === itemId,
    );
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      this._items.push({ documentId: itemId, quantity: 1 });
    }
  };

  removeItem = (productId: string) => {
    this._items = this._items.filter((item) => item.documentId !== productId);
    this._selectedItems = this._selectedItems.filter((id) => id !== productId);
  };

  clearCart = () => {
    this._items = [];
  };

  updateQuantity = (productId: string, newQuantity: number) => {
    const item = this._items.find((item) => item.documentId === productId);
    if (item) {
      item.quantity = Math.max(1, newQuantity);
    }
    this.saveToLocalStorage();
  };

  toggleItemSelection = (id: string) => {
    if (this._selectedItems.includes(id)) {
      this._selectedItems = this._selectedItems.filter(
        (itemID) => itemID !== id,
      );
    } else {
      this._selectedItems.push(id);
    }
  };

  private initFromLocalStorage() {
    const saved = localStorage.getItem("cart");
    const selection = localStorage.getItem("selectedItemsInCart");

    this._items = [];
    this._selectedItems = [];

    if (saved) {
      try {
        this._items = JSON.parse(saved);
      } catch (error) {
        this._error = handleError(error);
      }
    }
    if (selection) {
      try {
        this._selectedItems = JSON.parse(selection);
      } catch (error) {
        this._error = handleError(error);
      }
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(this._items));
    localStorage.setItem(
      "selectedItemsInCart",
      JSON.stringify(this._selectedItems),
    );
  }

  destroy() {
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", this._handleStorageChange);
    }
    this._reactionDisposer();
  }
}
