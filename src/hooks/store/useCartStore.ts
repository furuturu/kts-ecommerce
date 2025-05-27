import { useRootStore } from "./useRootStore.ts";

export const useCartStore = () => {
  const rootStore = useRootStore();
  const cartInitialized = rootStore && rootStore.cart;

  // корзина не успевает инициализироваться до первого рендера компонентов, поэтому некоторым методам нужны безопасные
  // заглушки на эти мгновения

  return {
    items: cartInitialized ? rootStore.cart.items : [],
    addItem: rootStore.cart.addItem,
    removeItem: rootStore.cart.removeItem,
    updateQuantity: rootStore.cart.updateQuantity,
    checkIfProductIsInCart: (productId: string) => {
      return cartInitialized
        ? rootStore.cart.checkIfProductIsInCart(productId)
        : false;
    },
    getItemQuantityById: (productId: string) => {
      return cartInitialized
        ? rootStore.cart.getItemQuantityById(productId)
        : 0;
    },
    clearCart: rootStore.cart.clearCart,
    isProductSelected: (productId: string) => {
      return cartInitialized
        ? rootStore.cart.isProductSelected(productId)
        : false;
    },
    totalItems: rootStore.cart.totalItems,
    toggleItemSelection: rootStore.cart.toggleItemSelection,
    selectAllItems: rootStore.cart.selectAllItems,
    clearSelectedItems: rootStore.cart.clearSelectedItems,
    isAllSelected: rootStore.cart.isAllSelected,
    totalSelectedItems: rootStore.cart.totalSelectedItems,
  };
};
