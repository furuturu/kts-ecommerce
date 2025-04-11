import { strapi } from "./axios.ts";
import { categoriesListQuery } from "./queries.ts";

export const getProductCategories = async () => {
  const response = await strapi.get("product-categories", {
    params: categoriesListQuery(),
  });
  return response.data.data;
};
