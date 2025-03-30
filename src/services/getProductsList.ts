import { strapi } from "./axios.ts";
import { productQuery } from "./queries.ts";

export const getProductsList = async () => {
  const response = await strapi.get("", {
    params: productQuery(),
  });
  return response.data;
};
