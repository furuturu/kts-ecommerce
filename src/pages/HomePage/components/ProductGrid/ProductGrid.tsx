import { ProductsStore } from "store/local/ProductsStore.ts";
import styles from "../../HomePage.module.scss";
import { CardSkeleton } from "components/CardSkeleton";
import Card from "components/Card";
import Button from "components/Button";
import { Counter } from "components/Counter";
import { trashIcon } from "components/icons/TrashIcon/TrashIcon.tsx";
import { NavLink, useNavigate } from "react-router";
import React from "react";
import { useRootStore } from "hooks/store/useRootStore.ts";
import { useCartStore } from "hooks/store/useCartStore.ts";
import { observer } from "mobx-react-lite";

interface ProductGridProps {
  productStore: ProductsStore;
}

export const ProductGrid: React.FC<ProductGridProps> = observer(
  ({ productStore }: ProductGridProps) => {
    const { data, loading, error } = productStore;
    const {
      checkIfProductIsInCart,
      addItem,
      updateQuantity,
      removeItem,
      getItemQuantityById,
    } = useCartStore();
    const navigate = useNavigate();
    const rootStore = useRootStore();
    const handleAddToCart = (productId: string) => () => {
      addItem(productId);
    };
    const isInCart = (id: string) => checkIfProductIsInCart(id);
    const handleNavigateToCart = () => navigate("/cart");
    const handleUpdateQuantity = (id: string) => (quantity: number) =>
      updateQuantity(id, quantity);
    const handleRemoveFromCart = (id: string) => () => removeItem(id);
    const handleSaveQuery = () => rootStore.query.savePreviousQueryParams();
    return (
      <div className={styles.cardContainer}>
        {loading &&
          Array.from({ length: 6 }, () => Math.random()).map((skeleton) => (
            <CardSkeleton key={skeleton} className={styles.card} />
          ))}

        {data &&
          !loading &&
          !error &&
          data.data.map((product) => (
            <div
              className={styles.navCardWrapper}
              key={product.id}
              id={`${product.documentId}`}
              onClick={handleSaveQuery}
            >
              <Card
                className={styles.card}
                captionSlot={product.title}
                image={product.images[0].url}
                subtitle={product.description}
                title={product.title}
                contentSlot={`$${product.price}`}
                actionSlot={
                  isInCart(product.documentId) ? (
                    <div className={styles.isInCartWrapper}>
                      <Button
                        onClick={handleNavigateToCart}
                        className={styles.itemInCartButton}
                      >
                        Move to Cart
                      </Button>
                      <Counter
                        value={getItemQuantityById(product.documentId)}
                        onChange={handleUpdateQuantity(product.documentId)}
                        onRemove={handleRemoveFromCart(product.documentId)}
                        removeIcon={trashIcon}
                        className={styles.counter}
                      />
                    </div>
                  ) : (
                    <Button onClick={handleAddToCart(product.documentId)}>
                      Add to Cart
                    </Button>
                  )
                }
              />
              <NavLink
                to={`/products/${product.documentId}`}
                key={product.documentId}
                className={styles.productLink}
              />
            </div>
          ))}
      </div>
    );
  },
);
