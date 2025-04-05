import { strapi } from "./axios.ts";
import { listProductsByUserSearchAndCategory } from "./queries.ts";

export const getProductsBySearchAndCategory = async (
  page: number = 1,
  searchInput: string = "",
  selectedCategory: string = "",
) => {
  const response = await strapi.get("products", {
    params: listProductsByUserSearchAndCategory(
      page,
      searchInput,
      selectedCategory,
    ),
  });
  return response.data;
};
