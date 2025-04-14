import React, { useCallback, useEffect } from "react";
import styles from "./HomePage.module.scss";
import { Navbar } from "components/Navbar";
import { TitleDescription } from "./components/TitleDescription";
import { SearchFilterPanel } from "./components/SearchFilterPanel";
import Loader from "components/Loader";
import Card from "components/Card";
import Text from "components/Text";
import { NavLink } from "react-router";
import { Pagination } from "./components/Pagination";
import { observer } from "mobx-react-lite";
import { useLocalStore } from "hooks/useLocalStore.ts";
import { createProductsStore } from "store/modules/ProductsStore.ts";
import { createCategoriesStore } from "store/modules/CategoryStore.ts";
import { useQueryParamsStoreInit } from "hooks/useQueryParamsStoreInit.ts";

export const HomePage: React.FC = observer(() => {
  useQueryParamsStoreInit();
  const productStore = useLocalStore(() => createProductsStore());
  const categoriesStore = useLocalStore(createCategoriesStore);

  useEffect(() => {
    productStore.initFromQueryParameters();
  }, [productStore]);

  const { data, loading, error } = productStore;

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
          categoriesStore={categoriesStore}
          productsStore={productStore}
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
                  to={`/${product.documentId}`}
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
