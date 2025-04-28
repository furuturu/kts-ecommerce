export interface ProductImage {
  id: number;
  documentId: string;
  name: string;
  url: string;
  formats: {
    small: {
      url: string;
    };
  };
}

export interface ProductCategory {
  documentId: string;
  id: number;
  title: string;
  image: {
    url: string;
    name: string;
  };
}

export interface ProductCategoryResponse {
  data: ProductCategory[];
}

export interface SingleProduct {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price: number;
  discountPercent: number;
  rating: number;
  isInStock: boolean;
  images: ProductImage[];
  productCategory: ProductCategory;
}

export interface SingleProductResponseByID {
  data: SingleProduct;
}

export interface StrapiProductsListResponse {
  data: SingleProduct[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface ILocalStore {
  /**
   * Любой локальный store должен реализовывать метод destroy,
   * в котором реализована логика разрушения стора при демонтировании компонента
   */
  destroy(): void;
}

export interface ApiRequestOptions {
  documentId?: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  category?: string;
}

export interface QueryParameters {
  populate: string | string[];
  pagination?: {
    page: number;
    pageSize: number;
  };
  filters?: {
    title?: {
      $containsi: string;
    };
    productCategory?: {
      id: {
        $eq: string;
      };
    };
  };
}
