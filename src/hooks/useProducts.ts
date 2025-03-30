import { useEffect, useState } from "react";
import { getProductsList } from "../services/getProductsList.ts";
import { StrapiBaseUrlProductsListResponse } from "../types/types.ts";

export const useProducts = () => {
  const [data, setData] = useState<StrapiBaseUrlProductsListResponse | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsListData = await getProductsList();
        setData(productsListData);
      } catch (error) {
        setError(String(error));
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  return { data: data?.data, loading, error };
};
