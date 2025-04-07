import { strapi } from "./axios.ts";
import { filterProductsListByCategoryQuery } from "./queries.ts";

export const getProductsByCategory = async (category: string) => {
  const response = await strapi.get("products", {
    params: filterProductsListByCategoryQuery(category),
  });
  return response.data;
};
