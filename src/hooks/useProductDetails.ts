import { useEffect, useState } from "react";
import { getProductDetails } from "../services/getProductDetails.ts";
import { SingleProductResponseByID } from "../types/types.ts";

export const useProductDetails = (documentId: string) => {
  const [product, setProduct] = useState<SingleProductResponseByID | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productData = await getProductDetails(documentId);
        setProduct(productData);
      } catch (error) {
        setError(String(error));
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [documentId]);
  return { product: product?.data, loading, error };
};
