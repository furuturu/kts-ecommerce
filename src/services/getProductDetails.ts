import { strapi } from "./axios.ts";
import { productQuery } from "./queries.ts";

export const getProductDetails = async (documentId: string) => {
  const response = await strapi.get(`/${documentId}`, {
    params: productQuery(),
  });
  return response.data;
};
