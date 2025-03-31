import { Navbar } from "components/Navbar";
import { useNavigate, useParams } from "react-router";
import { useProductDetails } from "hooks/useProductDetails.ts";
import Loader from "components/Loader";
import Text from "components/Text";
import styles from "./ProductDetails.module.scss";
import { Details } from "./components/Details";
import { RelatedItems } from "./components/RelatedItems";
import { GoBack } from "./components/GoBack/GoBack.tsx";

export const ProductDetails = () => {
  const { documentId = "" } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useProductDetails(documentId);
  console.log("ProductDetails loaded", product);

  const handleBackClick = () => navigate(-1);

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
};
