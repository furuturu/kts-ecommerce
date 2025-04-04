const populateParameter = { populate: ["images", "productCategory"] };

export const productQuery = () => ({
  ...populateParameter,
});

export const listProductsByPageQuery = (
  page: number,
  pageSize: number = 9,
) => ({
  ...populateParameter,
  pagination: { page, pageSize },
});

export const searchProductQuery = (searchQueryFromUser: string) => ({
  ...populateParameter,
  filters: {
    title: {
      $containsi: searchQueryFromUser,
    },
  },
});

export const filterProductsListByCategoryQuery = (category: string) => ({
  ...populateParameter,
  filters: {
    productCategory: {
      id: {
        $eq: category,
      },
    },
  },
});
