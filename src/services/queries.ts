const populateParameter = { populate: ["images", "productCategory"] };

export const productQuery = () => ({
  ...populateParameter,
});

// для пагинации
// export const listProductsQueryByPage = (page: number, pageSize: number = 9) => ({
//   ...populateParameter,
//   pagination: { page, pageSize },
// });

//для дз 4
// export const searchProductQuery = (searchQueryFromUser: string) => ({
//   ...populateParameter,
//   filters: {
//     title: {
//       $containsi: searchQueryFromUser,
//     },
//   },
// });
//
// export const filterProductsListByCategoryQuery = (category: string) => ({
//   ...populateParameter,
//   filters: {
//     productCategory: {
//       id: {
//         $eq: category,
//       },
//     },
//   },
// });
