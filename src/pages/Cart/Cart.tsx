import React from "react";
import { Navbar } from "components/Navbar";
import { observer } from "mobx-react-lite";
import style from "./Cart.module.scss";
import CheckBox from "components/CheckBox";
import Text from "components/Text";
import { useLocalStore } from "hooks/useLocalStore.ts";
import { createCartProductsStore } from "store/local/CartProductsStore.ts";
import { rootStore } from "store/global/RootStore.ts";
import { CartProduct } from "./components/CartProduct";
import { getTovarEnding } from "utils/getTovarEnding.ts";
import { Checkout } from "./components/Checkout";
import cn from "classnames";
import Button from "components/Button";
import { trashIcon } from "components/icons/TrashIcon/TrashIcon.tsx";
import { PageTransition } from "components/PageTransition";

export const Cart: React.FC = observer(() => {
  const cartProductStore = useLocalStore(createCartProductsStore);
  const { products, totalPrice, error } = cartProductStore;

  const items = rootStore.cart.items;
  const isChecked = rootStore.cart.isAllSelected;
  const handleClearCart = () => {
    rootStore.cart.clearCart();
  };

  const handleCheckBoxClick = () => {
    if (isChecked) {
      rootStore.cart.clearSelectedItems();
    } else {
      rootStore.cart.selectAllItems();
    }
  };

  return (
    <PageTransition>
      <Navbar />
      <div className={style.container}>
        {error && <div>{error}</div>}
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
              checked={isChecked}
              className={style.selectAllCheckbox}
            />
            <Text tag={"span"} className={style.selectAllLabel}>
              Выбрать все товары
            </Text>
            {isChecked && (
              <Button className={style.trash} onClick={handleClearCart}>
                {trashIcon}
              </Button>
            )}
            <Text
              tag={"span"}
              className={cn(style.selectAllNote, {
                [style.noteHidden]: !isChecked,
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
