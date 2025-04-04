import { strapi } from "./axios.ts";
import { listProductsByPageQuery } from "./queries.ts";

export const getProductsList = async (page: number) => {
  const response = await strapi.get("", {
    params: listProductsByPageQuery(page),
  });
  return response.data;
};
