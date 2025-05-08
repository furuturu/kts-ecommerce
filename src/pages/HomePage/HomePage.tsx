import React, { useCallback, useEffect, useState } from "react";
import styles from "./HomePage.module.scss";
import { Navbar } from "components/Navbar";
import { TitleDescription } from "./components/TitleDescription";
import { SearchFilterPanel } from "./components/SearchFilterPanel";
import Text from "components/Text";
import { Pagination } from "./components/Pagination";
import { observer } from "mobx-react-lite";
import { PageTransition } from "components/PageTransition";
import { useProductStore } from "hooks/store/useProducts.ts";
import { PageAnimation } from "./components/PageAnimation/PageAnimation.tsx";
import { ProductGrid } from "./components/ProductGrid/ProductGrid.tsx";

type AnimationDirection = "forward" | "backward";

export const HomePage: React.FC = observer(() => {
  const {
    data,
    error,
    currentPage,
    loading,
    resetAllFilters,
    initFromQueryParameters,
    setPage,
    pagination,
    store,
  } = useProductStore();

  useEffect(() => {
    initFromQueryParameters();
  }, [initFromQueryParameters]);

  const handleFiltersReset = () => resetAllFilters();

  const [direction, setDirection] = useState<AnimationDirection>("forward");
  const handlePageChange = useCallback(
    (page: number) => {
      if (page > currentPage) {
        setDirection("forward");
      } else {
        setDirection("backward");
      }
      setPage(page);
      document.getElementById("searchFilterPanel")?.scrollIntoView();
    },
    [setPage, currentPage],
  );

  return (
    <PageTransition>
      <div className={styles.megaContainer}>
        <Navbar handleFiltersReset={handleFiltersReset} />
        <div className={styles.container}>
          <TitleDescription />
          <SearchFilterPanel productsStore={store} />
          <div className={styles.totalProducts}>
            <Text
              tag={"h2"}
              weight={"bold"}
              className={styles.totalProductsTitle}
            >
              Total products
            </Text>
            <Text
              tag={"span"}
              weight={"bold"}
              color={"accent"}
              className={styles.totalProductsQuantity}
            >
              {pagination?.total}
            </Text>
          </div>
          <PageAnimation direction={direction} currentPage={currentPage}>
            <ProductGrid productStore={store} />
            {/*<div className={styles.cardContainer}>*/}
            {/*  {loading &&*/}
            {/*    Array.from({ length: 6 }, () => Math.random()).map(*/}
            {/*      (skeleton) => (*/}
            {/*        <CardSkeleton key={skeleton} className={styles.card} />*/}
            {/*      ),*/}
            {/*    )}*/}
            {/*  {data &&*/}
            {/*    !loading &&*/}
            {/*    !error &&*/}
            {/*    data.map((product) => (*/}
            {/*      <div*/}
            {/*        className={styles.navCardWrapper}*/}
            {/*        key={product.id}*/}
            {/*        id={`${product.documentId}`}*/}
            {/*        onClick={handleSaveQuery}*/}
            {/*      >*/}
            {/*        <Card*/}
            {/*          className={styles.card}*/}
            {/*          captionSlot={product.title}*/}
            {/*          image={product.images[0].url}*/}
            {/*          subtitle={product.description}*/}
            {/*          title={product.title}*/}
            {/*          contentSlot={`$${product.price}`}*/}
            {/*          actionSlot={*/}
            {/*            isInCart(product.documentId) ? (*/}
            {/*              <div className={styles.isInCartWrapper}>*/}
            {/*                <Button*/}
            {/*                  onClick={handleNavigateToCart}*/}
            {/*                  className={styles.itemInCartButton}*/}
            {/*                >*/}
            {/*                  Move to Cart*/}
            {/*                </Button>*/}
            {/*                <Counter*/}
            {/*                  value={getItemQuantityById(product.documentId)}*/}
            {/*                  onChange={handleUpdateQuantity(*/}
            {/*                    product.documentId,*/}
            {/*                  )}*/}
            {/*                  onRemove={handleRemoveFromCart(*/}
            {/*                    product.documentId,*/}
            {/*                  )}*/}
            {/*                  removeIcon={trashIcon}*/}
            {/*                  className={styles.counter}*/}
            {/*                />*/}
            {/*              </div>*/}
            {/*            ) : (*/}
            {/*              <Button onClick={handleAddToCart(product.documentId)}>*/}
            {/*                Add to Cart*/}
            {/*              </Button>*/}
            {/*            )*/}
            {/*          }*/}
            {/*        />*/}
            {/*        <NavLink*/}
            {/*          to={`/products/${product.documentId}`}*/}
            {/*          key={product.documentId}*/}
            {/*          className={styles.productLink}*/}
            {/*        />*/}
            {/*      </div>*/}
            {/*    ))}*/}
            {/*</div>*/}
          </PageAnimation>
          {error && <Text tag="h1">{error}</Text>}
          {data?.length === 0 && !loading && (
            <Text tag="h3">
              Ничего не найдено. Попробуйте изменить параметры поиска.
            </Text>
          )}
          {data && !loading && !error && data?.length !== 0 && pagination && (
            <Pagination
              totalPages={pagination.pageCount}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </PageTransition>
  );
});
