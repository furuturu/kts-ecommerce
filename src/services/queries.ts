const populateParameter = { populate: ["images", "productCategory"] };

export const productQuery = () => ({
  ...populateParameter,
});

export const categoriesListQuery = () => ({
  populate: ["image"],
});

export const listProductsByPageQuery = (
  page: number,
  pageSize: number = 9,
) => ({
  ...populateParameter,
  pagination: { page, pageSize },
});

export const listProductsByUserSearchAndCategory = (
  page: number = 1,
  searchQueryFromUser: string,
  category: string,
) => ({
  ...populateParameter,
  filters: {
    title: {
      $containsi: searchQueryFromUser,
    },
    productCategory: {
      id: {
        $eq: category,
      },
    },
  },
  pagination: { page, pageSize: 9 },
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
