import styles from "./Details.module.scss";
import { SingleProduct } from "types/types.ts";
import Text from "components/Text";
import Button from "components/Button";
import { NavLink } from "react-router";
import { rootStore } from "store/global/RootStore.ts";
import { Counter } from "components/Counter/Counter.tsx";
import { observer } from "mobx-react-lite";

interface Props {
  product: SingleProduct;
}

export const Details = observer(({ product }: Props) => {
  const cart = rootStore?.cart;
  const handleAddToCart = () => {
    cart?.addItem(product.documentId);
  };
  const isInCart = cart?.checkIfProductIsInCart(product.documentId);

  const handleUpdateQuantity = (quantity: number) => {
    return cart?.updateQuantity(product.documentId, quantity);
  };
  const handleRemoveFromCart = () => {
    cart?.removeItem(product.documentId);
  };

  const inputValue = cart?.getItemQuantityById(product.documentId);

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img src={product.images[0].url} alt={product.images[0].name} />
      </div>
      <div className={styles.information}>
        <div className={styles.descriptionSection}>
          <Text tag="h1" color="primary" weight="bold" className={styles.title}>
            {product.title}
          </Text>
          <Text
            tag="p"
            color="secondary"
            weight="normal"
            className={styles.description}
          >
            {product.description}
          </Text>
        </div>
        <div className={styles.priceSection}>
          <Text color="primary" weight="bold">
            ${product.price}
          </Text>
        </div>
        <div className={styles.buttonsSection}>
          <Button className={styles.buttonBuy} onClick={handleAddToCart}>
            <NavLink to={"/cart"} className={styles.buttonLink}>
              Buy Now
            </NavLink>
          </Button>
          {!isInCart && (
            <Button className={styles.buttonCart} onClick={handleAddToCart}>
              Add to Cart
            </Button>
          )}
          {isInCart && (
            <Counter
              value={inputValue}
              onChange={handleUpdateQuantity}
              onRemove={handleRemoveFromCart}
            />
          )}
        </div>
      </div>
    </div>
  );
});
