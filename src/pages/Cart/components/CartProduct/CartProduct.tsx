import React from "react";
import { observer } from "mobx-react-lite";
import { rootStore } from "store/global/RootStore.ts";
import style from "./CartProduct.module.scss";
import CheckBox from "components/CheckBox";
import Text from "components/Text";
import { SingleProduct } from "types/types.ts";
import { Counter } from "components/Counter/Counter.tsx";
import { trashIcon } from "components/icons/TrashIcon/TrashIcon.tsx";

interface CartProductProps {
  product: SingleProduct;
}
export const CartProduct: React.FC<CartProductProps> = observer(
  ({ product }) => {
    const id = product.documentId;
    const quantity = rootStore.cart.getItemQuantityById(id);

    const handleCheckBoxClick = () => {
      rootStore.cart.toggleItemSelection(id);
    };

    const isProductSelected = rootStore.cart.isProductSelected(id);

    const handleQuantityChange = (newQuantity: number) => {
      rootStore.cart.updateQuantity(id, newQuantity);
    };

    const handleRemoveItem = () => {
      rootStore.cart.removeItem(id);
    };

    return (
      <>
        <div className={style.cartItem} key={product.documentId}>
          <div className={style.itemImageWrapper}>
            <CheckBox
              onChange={handleCheckBoxClick}
              checked={isProductSelected}
              className={style.itemCheckbox}
              size={"small"}
            />
            <img
              src={product.images[0]?.formats.small.url}
              alt={product.title}
              className={style.itemImage}
            />
          </div>
          <div className={style.itemInfo}>
            <Text tag={"h3"} className={style.itemName}>
              {product.title}
            </Text>
            <Counter
              value={quantity}
              onChange={handleQuantityChange}
              onRemove={handleRemoveItem}
              className={style.quantityControls}
              removeIcon={trashIcon}
            />
          </div>
          <Text tag={"div"} className={style.itemPrice}>
            ${product.price * quantity}
          </Text>
        </div>
      </>
    );
  },
);
