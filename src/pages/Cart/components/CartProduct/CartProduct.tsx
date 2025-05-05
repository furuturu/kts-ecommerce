import React from "react";
import { observer } from "mobx-react-lite";
import style from "./CartProduct.module.scss";
import CheckBox from "components/CheckBox";
import Text from "components/Text";
import { SingleProduct } from "types/types.ts";
import { Counter } from "components/Counter/Counter.tsx";
import { trashIcon } from "components/icons/TrashIcon/TrashIcon.tsx";
import { useCartStore } from "hooks/store/useCartStore.ts";

interface CartProductProps {
  product: SingleProduct;
}
export const CartProduct: React.FC<CartProductProps> = observer(
  ({ product }) => {
    const {
      getItemQuantityById,
      isProductSelected,
      toggleItemSelection,
      updateQuantity,
      removeItem,
    } = useCartStore();
    const id = product.documentId;
    const quantity = getItemQuantityById(id);

    const handleCheckBoxClick = () => toggleItemSelection(id);

    const isSelected = isProductSelected(id);

    const handleQuantityChange = (newQuantity: number) => {
      updateQuantity(id, newQuantity);
    };

    const handleRemoveItem = () => removeItem(id);

    return (
      <>
        <div className={style.cartItem} key={product.documentId}>
          <div className={style.itemImageWrapper}>
            <CheckBox
              onChange={handleCheckBoxClick}
              checked={isSelected}
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
