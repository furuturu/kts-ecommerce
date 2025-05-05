import React, { useCallback, useEffect, useState } from "react";
import styles from "./HomePage.module.scss";
import { Navbar } from "components/Navbar";
import { TitleDescription } from "./components/TitleDescription";
import { SearchFilterPanel } from "./components/SearchFilterPanel";
import Card from "components/Card";
import Text from "components/Text";
import { NavLink, useNavigate } from "react-router";
import { Pagination } from "./components/Pagination";
import { observer } from "mobx-react-lite";
import { motion, AnimatePresence, TargetAndTransition } from "framer-motion";
import { CardSkeleton } from "components/CardSkeleton";
import Button from "components/Button";
import { Counter } from "components/Counter/Counter.tsx";
import { trashIcon } from "components/icons/TrashIcon/TrashIcon.tsx";
import { PageTransition } from "components/PageTransition";
import { useProductStore } from "hooks/store/useProducts.ts";
import { useCartStore } from "../../hooks/store/useCartStore.ts";
import { useRootStore } from "../../hooks/store/useRootStore.ts";

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
  const {
    checkIfProductIsInCart,
    addItem,
    updateQuantity,
    removeItem,
    getItemQuantityById,
  } = useCartStore();
  const navigate = useNavigate();
  const rootStore = useRootStore();

  useEffect(() => {
    initFromQueryParameters();
  }, [initFromQueryParameters]);

  const handleFiltersReset = () => resetAllFilters();

  const handleAddToCart = (productId: string) => () => {
    addItem(productId);
  };
  const isInCart = (id: string) => checkIfProductIsInCart(id);
  const handleNavigateToCart = () => navigate("/cart");
  const handleUpdateQuantity = (id: string) => (quantity: number) =>
    updateQuantity(id, quantity);
  const handleRemoveFromCart = (id: string) => () => removeItem(id);
  const handleSaveQuery = () => rootStore.query.savePreviousQueryParams();

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
                  data.map((product) => (
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
                                value={getItemQuantityById(product.documentId)}
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
                            <Button
                              onClick={handleAddToCart(product.documentId)}
                            >
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
