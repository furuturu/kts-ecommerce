import { Navbar } from "components/Navbar";
import { useParams } from "react-router";
import Loader from "components/Loader";
import Text from "components/Text";
import styles from "./ProductDetails.module.scss";
import { Details } from "./components/Details";
import { RelatedItems } from "./components/RelatedItems";
import { GoBack } from "./components/GoBack";
import { useCallback, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { PageTransition } from "components/PageTransition/PageTransition.tsx";
import { useRootStore } from "hooks/store/useRootStore.ts";
import { useProductDetails } from "hooks/store/useProductDetails.ts";

export const ProductDetails = observer(() => {
  const { query } = useRootStore();
  const { documentId = "" } = useParams();
  const { product, loading, error, getProductDetails, store } =
    useProductDetails();

  useEffect(() => {
    getProductDetails(documentId);
  }, [getProductDetails, documentId]);

  const handleBackClick = useCallback(() => {
    query.navigateBack();
  }, [query]);

  return (
    <PageTransition>
      <Navbar />
      <div className={styles.container}>
        <GoBack handleBackClick={handleBackClick} />

        {product && (
          <>
            <Details product={product} />
            <RelatedItems productDetailsStore={store} />
          </>
        )}
        {loading && <Loader size="l" />}
        {error && <Text tag="h1">{error}</Text>}
      </div>
    </PageTransition>
  );
});
