import React from "react";
import { Navbar } from "components/Navbar";
import { observer } from "mobx-react-lite";
import style from "./Cart.module.scss";
import CheckBox from "components/CheckBox";
import Text from "components/Text";
import { CartProduct } from "./components/CartProduct";
import { getTovarEnding } from "utils/getTovarEnding.ts";
import { Checkout } from "./components/Checkout";
import cn from "classnames";
import Button from "components/Button";
import { trashIcon } from "components/icons/TrashIcon/TrashIcon.tsx";
import { PageTransition } from "components/PageTransition";
import { useCartStore } from "hooks/store/useCartStore.ts";
import { useCartProductsStore } from "../../hooks/store/useCartProductStore.ts";

export const Cart: React.FC = observer(() => {
  const { products, totalPrice, error } = useCartProductsStore();
  const {
    items,
    isAllSelected,
    clearSelectedItems,
    selectAllItems,
    clearCart,
  } = useCartStore();
  const handleClearCart = () => clearCart();
  const handleCheckBoxClick = () =>
    isAllSelected ? clearSelectedItems() : selectAllItems();

  return (
    <PageTransition>
      <Navbar />
      <div className={style.container}>
        {error && <div>{error.message}</div>}
        <div className={style.itemsContainer}>
          <div className={style.header}>
            <Text tag={"h1"}>Корзина</Text>
            <div className={style.itemsCountWrapper}>
              <Text tag={"span"} className={style.itemsCount}>
                {items.length} {getTovarEnding(items.length)}
              </Text>
            </div>
          </div>

          <div className={style.selectAllRow}>
            <CheckBox
              onChange={handleCheckBoxClick}
              checked={isAllSelected}
              className={style.selectAllCheckbox}
            />
            <Text tag={"span"} className={style.selectAllLabel}>
              Выбрать все товары
            </Text>
            {isAllSelected && (
              <Button className={style.trash} onClick={handleClearCart}>
                {trashIcon}
              </Button>
            )}
            <Text
              tag={"span"}
              className={cn(style.selectAllNote, {
                [style.noteHidden]: !isAllSelected,
              })}
            >
              Выбраны все товары
            </Text>
          </div>

          {products &&
            products.map((product) => (
              <CartProduct key={product.documentId} product={product} />
            ))}
        </div>
        <Checkout totalPrice={totalPrice} />
      </div>
    </PageTransition>
  );
});
