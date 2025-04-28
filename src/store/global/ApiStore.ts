import { makeObservable, action } from "mobx";
import { strapi } from "services/axios.ts";
import { ApiRequestOptions, QueryParameters } from "types/types.ts";
import { PRODUCTS_ENDPOINT, CATEGORY_ENDPOINT } from "constants/api.ts";

export class ApiStore {
  constructor() {
    makeObservable(this, {
      _fetchFromStrapi: action,
      fetchProducts: action,
      fetchProductCategories: action,
      fetchProductDetails: action,
      fetchCartProducts: action,
    });
  }

  /** Одна функция запроса чтобы управлять всеми
   * @param options - параметры запроса, которые включаются в url, все необязательные
   * @param endpoint - эндпоинт, по которому происходит запрос, по умолчанию /products
   * @returns Promise с данными
   */
  _fetchFromStrapi = async <T>(
    options: ApiRequestOptions = {},
    endpoint: string = PRODUCTS_ENDPOINT,
  ): Promise<T> => {
    const { documentId, page, pageSize = 9, category, searchQuery } = options;
    if (endpoint === PRODUCTS_ENDPOINT && !documentId) {
      await new Promise((resolve) => setTimeout(resolve, 600));
    }
    const url = documentId ? `${endpoint}/${documentId}` : endpoint;

    const queryParameters: QueryParameters = {
      populate:
        endpoint === CATEGORY_ENDPOINT
          ? ["image"]
          : ["images", "productCategory"],
    };

    if (page) {
      queryParameters.pagination = { page, pageSize };
    }
    if (category || searchQuery) {
      queryParameters.filters = {};

      if (category) {
        queryParameters.filters.productCategory = { id: { $eq: category } };
      }
      if (searchQuery) {
        queryParameters.filters.title = { $containsi: searchQuery };
      }
    }

    const response = await strapi.get(url, { params: queryParameters });
    return response.data;
  };

  async fetchProductCategories<T>(): Promise<T> {
    return this._fetchFromStrapi<T>({}, CATEGORY_ENDPOINT);
  }

  async fetchProductDetails<T>(documentId: string): Promise<T> {
    return this._fetchFromStrapi<T>({ documentId });
  }

  async fetchProducts<T>(
    page: number,
    searchQuery: string,
    category: string,
  ): Promise<T> {
    return this._fetchFromStrapi<T>({ page, searchQuery, category });
  }

  async fetchRelatedProducts<T>(category: string): Promise<T> {
    return this._fetchFromStrapi<T>({ category });
  }

  async fetchCartProducts<T>(ids: string[]): Promise<T> {
    const query = {
      filters: {
        documentId: { $in: ids },
      },
      populate: ["images"],
    };

    const response = await strapi.get(PRODUCTS_ENDPOINT, { params: query });
    return response.data.data;
  }
}
