import React, { useCallback, useEffect } from "react";
import styles from "./HomePage.module.scss";
import { Navbar } from "components/Navbar";
import { TitleDescription } from "./components/TitleDescription";
import { SearchFilterPanel } from "./components/SearchFilterPanel";
import Loader from "components/Loader";
import Card from "components/Card";
import Text from "components/Text";
import { NavLink, useLocation, useNavigate } from "react-router";
import { Pagination } from "./components/Pagination";
import { observer } from "mobx-react-lite";
import { useLocalStore } from "hooks/useLocalStore.ts";
import {
  createSearchFilterStore,
  SearchFilterStore,
} from "store/modules/SearchFilterStore.ts";
import { createProductsStore } from "store/modules/ProductsStore.ts";
import { rootStore } from "store/global/RootStore.ts";
import qs from "qs";

interface UrlParams {
  category?: string;
  search?: string;
  page?: string | number;
}

export const HomePage: React.FC = observer(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchFilterStore = useLocalStore(createSearchFilterStore);
  const productStore = useLocalStore(() =>
    createProductsStore(searchFilterStore),
  );

  const { data, loading, error } = productStore;

  useEffect(() => {
    const params = rootStore.query.params;
    const initialParams: Partial<SearchFilterStore> = {};

    if (params.category) {
      initialParams.selectedCategory = params.category as string;
    }

    if (params.search) {
      initialParams.searchQuery = params.search as string;
    }

    if (params.page) {
      productStore.currentPage = Number(params.page);
    }

    searchFilterStore.setSearchQuery(initialParams.searchQuery || "");
    searchFilterStore.setSelectedCategory(initialParams.selectedCategory || "");

    productStore.fetchProducts();
  }, [productStore, searchFilterStore]);

  useEffect(() => {
    const updateUrlParams = () => {
      const params: UrlParams = {};

      if (searchFilterStore.selectedCategory) {
        params.category = searchFilterStore.selectedCategory;
      }

      if (productStore.currentPage !== 1) {
        params.page = String(productStore.currentPage);
      }

      const queryString = qs.stringify(params);
      navigate(`?${queryString}`, { replace: true });
    };

    updateUrlParams();
  }, [searchFilterStore.selectedCategory, productStore.currentPage, navigate]);

  const handleFiltersApply = useCallback(() => {
    productStore.resetToFirstPage();
    const params: UrlParams = {};

    if (searchFilterStore.selectedCategory) {
      params.category = searchFilterStore.selectedCategory;
    }

    if (searchFilterStore.searchQuery) {
      params.search = searchFilterStore.searchQuery;
    }

    const queryString = qs.stringify(params);
    navigate(`?${queryString}`, { replace: true });
    productStore.fetchProducts();
  }, [searchFilterStore, productStore, navigate]);

  const handlePageChange = useCallback(
    (page: number) => {
      productStore.setPage(page);
    },
    [productStore],
  );

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <TitleDescription />
        <SearchFilterPanel
          searchFilterStore={searchFilterStore}
          onFilterApply={handleFiltersApply}
        />
        <div className={styles.cardContainer}>
          {loading && <Loader size="l" />}
          {/* todo: юзер френдли еррор компонент*/}
          {error && <Text tag="h1">{error}</Text>}
          {data &&
            !loading &&
            !error &&
            data.data?.map((product) => (
              <Card
                key={product.id}
                className={styles.card}
                captionSlot={product.title}
                image={product.images[0].url}
                subtitle={product.description}
                title={product.title}
              >
                <NavLink
                  to={`/product/${product.documentId}${location.search}`}
                  key={product.documentId}
                  className={styles.productLink}
                />
              </Card>
            ))}
          {data?.data?.length === 0 && !loading && (
            <Text tag="h3">
              Ничего не найдено. Попробуйте изменить параметры поиска.
            </Text>
          )}
        </div>
        {data && !loading && !error && data?.data?.length !== 0 && (
          <Pagination
            totalPages={data.meta?.pagination.pageCount}
            currentPage={productStore.currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
});
