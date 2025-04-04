import { Navbar } from "components/Navbar";
import { useNavigate, useParams } from "react-router";
import Loader from "components/Loader";
import Text from "components/Text";
import styles from "./ProductDetails.module.scss";
import { Details } from "./components/Details";
import { RelatedItems } from "./components/RelatedItems";
import { GoBack } from "./components/GoBack/GoBack.tsx";
import { useCallback, useEffect } from "react";
import { productsDetailsStore } from "../../store/modules/ProductsDetailsStore.ts";
import { observer } from "mobx-react-lite";

export const ProductDetails = observer(() => {
  const { documentId = "" } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = productsDetailsStore;

  useEffect(() => {
    productsDetailsStore.fetchProductDetails(documentId);
    return () => {
      productsDetailsStore.clearProductData();
    };
  }, [documentId]);

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
