import { Navbar } from "components/Navbar";
import { useNavigate, useParams } from "react-router";
import Loader from "components/Loader";
import Text from "components/Text";
import styles from "./ProductDetails.module.scss";
import { Details } from "./components/Details";
import { RelatedItems } from "./components/RelatedItems";
import { GoBack } from "./components/GoBack/GoBack.tsx";
import { useCallback, useEffect } from "react";
import { createProductDetailsStore } from "store/modules/ProductDetailsStore.ts";
import { observer } from "mobx-react-lite";
import { useLocalStore } from "hooks/useLocalStore.ts";

export const ProductDetails = observer(() => {
  const { documentId = "" } = useParams();
  const navigate = useNavigate();
  const productDetailsStore = useLocalStore(createProductDetailsStore);
  const { product, loading, error } = productDetailsStore;

  useEffect(() => {
    productDetailsStore.getProductDetails(documentId);
  }, [documentId, productDetailsStore]);

  const handleBackClick = useCallback(() => navigate(-1), [navigate]);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <GoBack handleBackClick={handleBackClick} />
        {loading && <Loader size="l" />}
        {error && <Text tag="h1">{error}</Text>}
        {product && (
          <>
            <Details product={product} />{" "}
            <RelatedItems productCategory={product.productCategory} />
          </>
        )}
      </div>
    </>
  );
});
