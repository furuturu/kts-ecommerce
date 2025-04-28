import { Navbar } from "components/Navbar";
import { useParams } from "react-router";
import Loader from "components/Loader";
import Text from "components/Text";
import styles from "./ProductDetails.module.scss";
import { Details } from "./components/Details";
import { RelatedItems } from "./components/RelatedItems";
import { GoBack } from "./components/GoBack";
import { useCallback, useEffect } from "react";
import { createProductDetailsStore } from "store/local/ProductDetailsStore.ts";
import { observer } from "mobx-react-lite";
import { useLocalStore } from "hooks/useLocalStore.ts";
import { PageTransition } from "components/PageTransition/PageTransition.tsx";
import { rootStore } from "../../store/global/RootStore.ts";

export const ProductDetails = observer(() => {
  const { documentId = "" } = useParams();
  const productDetailsStore = useLocalStore(createProductDetailsStore);
  const { product, loading, error } = productDetailsStore;

  useEffect(() => {
    productDetailsStore.getProductDetails(documentId);
  }, [documentId, productDetailsStore]);

  const handleBackClick = useCallback(() => {
    rootStore.query.navigateBack();
  }, []);

  return (
    <PageTransition>
      <Navbar />
      <div className={styles.container}>
        <GoBack handleBackClick={handleBackClick} />

        {product && (
          <>
            <Details product={product} />
            <RelatedItems productDetailsStore={productDetailsStore} />
          </>
        )}
        {loading && <Loader size="l" />}
        {error && <Text tag="h1">{error}</Text>}
      </div>
    </PageTransition>
  );
});
