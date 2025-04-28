import Text from "components/Text";
import Card from "components/Card";
import style from "./RelatedItems.module.scss";
import { ProductDetailsStore } from "../../../../store/local/ProductDetailsStore.ts";
import { useEffect } from "react";
import { NavLink } from "react-router";
import { observer } from "mobx-react-lite";

interface RelatedItemsProps {
  productDetailsStore: ProductDetailsStore;
}

export const RelatedItems = observer(
  ({ productDetailsStore }: RelatedItemsProps) => {
    useEffect(() => {
      productDetailsStore.getRelatedProducts();
    }, [productDetailsStore]);

    const handleRelatedClick = () => {
      window.scrollTo(0, 0);
    };

    return (
      <>
        <Text
          tag="h2"
          weight="bold"
          view="title"
          className={style.relatedTitle}
        >
          Related Items
        </Text>
        <div className={style.cardContainer}>
          {productDetailsStore.relatedProducts &&
            productDetailsStore.relatedProducts.data
              .filter(
                (product) =>
                  product.documentId !==
                  productDetailsStore.product?.documentId,
              )
              .map((relatedItem) => (
                <div className={style.navCardWrapper} key={relatedItem.id}>
                  <Card
                    title={relatedItem.title}
                    subtitle={relatedItem.description}
                    image={relatedItem.images[0].url}
                    className={style.relatedProduct}
                  />
                  <NavLink
                    to={`/products/${relatedItem.documentId}`}
                    className={style.cardLink}
                    onClick={handleRelatedClick}
                  />
                </div>
              ))}
        </div>
      </>
    );
  },
);
