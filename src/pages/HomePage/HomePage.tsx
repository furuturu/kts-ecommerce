import React, { useCallback, useEffect, useState } from "react";
import styles from "./HomePage.module.scss";
import { Navbar } from "components/Navbar";
import { TitleDescription } from "./components/TitleDescription";
import { SearchFilterPanel } from "./components/SearchFilterPanel";
import Card from "components/Card";
import Text from "components/Text";
import { NavLink } from "react-router";
import { Pagination } from "./components/Pagination";
import { observer } from "mobx-react-lite";
import { useLocalStore } from "hooks/useLocalStore.ts";
import { createProductsStore } from "store/local/ProductsStore.ts";
import { createCategoriesStore } from "store/local/CategoryStore.ts";
import { useQueryParamsStoreInit } from "hooks/useQueryParamsStoreInit.ts";
import { motion, AnimatePresence, TargetAndTransition } from "framer-motion";
import { CardSkeleton } from "components/CardSkeleton";
import Button from "components/Button";
import { rootStore } from "store/global/RootStore.ts";
import { useNavigationServiceInit } from "hooks/useNavigationServiceInit.ts";
import { Counter } from "components/Counter/Counter.tsx";
import { trashIcon } from "components/icons/TrashIcon/TrashIcon.tsx";
import { PageTransition } from "components/PageTransition";

type AnimationDirection = "forward" | "backward";

export const HomePage: React.FC = observer(() => {
  useQueryParamsStoreInit();
  useNavigationServiceInit();

  const productStore = useLocalStore(() => createProductsStore(rootStore));
  const categoriesStore = useLocalStore(createCategoriesStore);
  useEffect(() => {
    productStore.initFromQueryParameters();
  }, [productStore]);
  const { data, error, currentPage, loading } = productStore;

  const handleFiltersReset = () => {
    productStore.resetAllFilters();
  };

  const cart = rootStore?.cart;
  const handleAddToCart = (productId: string) => () => {
    cart?.addItem(productId);
  };
  const isInCart = (id: string) => cart?.checkIfProductIsInCart(id);
  const handleNavigateToCart = () => {
    rootStore.navigation.navigateTo("/cart");
  };
  const handleUpdateQuantity = (id: string) => (quantity: number) => {
    return cart?.updateQuantity(id, quantity);
  };
  const handleRemoveFromCart = (id: string) => () => {
    cart?.removeItem(id);
  };

  const handleSaveQuery = () => {
    rootStore.query.savePreviousQueryParams();
  };

  const [direction, setDirection] = useState<AnimationDirection>("forward");
  const handlePageChange = useCallback(
    (page: number) => {
      if (page > currentPage) {
        setDirection("forward");
      } else {
        setDirection("backward");
      }
      productStore.setPage(page);
      document.getElementById("searchFilterPanel")?.scrollIntoView();
    },
    [productStore, currentPage],
  );
  const animationVariants = {
    initial: (direction: AnimationDirection): TargetAndTransition => ({
      x: direction === "forward" ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: AnimationDirection): TargetAndTransition => ({
      x: direction === "forward" ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <PageTransition>
      <Navbar handleFiltersReset={handleFiltersReset} />
      <div className={styles.container}>
        <TitleDescription />
        <SearchFilterPanel
          categoriesStore={categoriesStore}
          productsStore={productStore}
        />
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
            {data?.meta.pagination.total}
          </Text>
        </div>
        <AnimatePresence mode={"wait"} custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={animationVariants}
            initial={"initial"}
            animate={"center"}
            exit={"exit"}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.cardContainer}>
              {loading &&
                Array.from({ length: 6 }, () => Math.random()).map(
                  (skeleton) => (
                    <CardSkeleton key={skeleton} className={styles.card} />
                  ),
                )}

              {data &&
                !loading &&
                !error &&
                data.data?.map((product) => (
                  <div
                    className={styles.navCardWrapper}
                    key={product.id}
                    id={`${product.documentId}`}
                    onClick={handleSaveQuery}
                  >
                    <Card
                      className={styles.card}
                      captionSlot={product.title}
                      image={product.images[0].url}
                      subtitle={product.description}
                      title={product.title}
                      contentSlot={`$${product.price}`}
                      actionSlot={
                        isInCart(product.documentId) ? (
                          <div className={styles.isInCartWrapper}>
                            <Button
                              onClick={handleNavigateToCart}
                              className={styles.itemInCartButton}
                            >
                              Move to Cart
                            </Button>
                            <Counter
                              value={cart?.getItemQuantityById(
                                product.documentId,
                              )}
                              onChange={handleUpdateQuantity(
                                product.documentId,
                              )}
                              onRemove={handleRemoveFromCart(
                                product.documentId,
                              )}
                              removeIcon={trashIcon}
                              className={styles.counter}
                            />
                          </div>
                        ) : (
                          <Button onClick={handleAddToCart(product.documentId)}>
                            Add to Cart
                          </Button>
                        )
                      }
                    />
                    <NavLink
                      to={`/products/${product.documentId}`}
                      key={product.documentId}
                      className={styles.productLink}
                    />
                  </div>
                ))}
            </div>
          </motion.div>
        </AnimatePresence>
        {error && <Text tag="h1">{error}</Text>}
        {data?.data?.length === 0 && !loading && (
          <Text tag="h3">
            Ничего не найдено. Попробуйте изменить параметры поиска.
          </Text>
        )}
        {data && !loading && !error && data?.data?.length !== 0 && (
          <Pagination
            totalPages={data.meta?.pagination.pageCount}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </PageTransition>
  );
});
