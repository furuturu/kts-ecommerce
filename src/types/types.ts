export interface ProductImage {
  id: number;
  documentId: string;
  name: string;
  url: string;
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

export interface StrapiProductsListResponseByPage {
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
