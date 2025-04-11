import { strapi } from "./axios.ts";
import { searchProductQuery } from "./queries.ts";

export const getProductsBySearch = async (searchQuery: string) => {
  const response = await strapi.get("products", {
    params: searchProductQuery(searchQuery),
  });
  return response.data;
};
