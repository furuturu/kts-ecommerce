import styles from "./Details.module.scss";
import { SingleProduct } from "types/types.ts";
import Text from "components/Text";
import Button from "components/Button";

interface Props {
  product: SingleProduct;
}

export const Details = ({ product }: Props) => {
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
          <Button className={styles.buttonBuy}>Buy Now</Button>
          <Button className={styles.buttonCart}>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};
