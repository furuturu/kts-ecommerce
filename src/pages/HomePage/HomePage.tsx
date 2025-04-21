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
import { createProductsStore } from "store/modules/ProductsStore.ts";
import { createCategoriesStore } from "store/modules/CategoryStore.ts";
import { useQueryParamsStoreInit } from "hooks/useQueryParamsStoreInit.ts";
import { motion, AnimatePresence, TargetAndTransition } from "framer-motion";
import { CardSkeleton } from "../../components/CardSkeleton";

type AnimationDirection = "forward" | "backward";

export const HomePage: React.FC = observer(() => {
  useQueryParamsStoreInit();
  const productStore = useLocalStore(() => createProductsStore());
  const categoriesStore = useLocalStore(createCategoriesStore);

  const [direction, setDirection] = useState<AnimationDirection>("forward");

  useEffect(() => {
    productStore.initFromQueryParameters();
  }, [productStore]);

  const { data, error, loading } = productStore;

  const handlePageChange = useCallback(
    (page: number) => {
      if (page > productStore.currentPage) {
        setDirection("forward");
      } else {
        setDirection("backward");
      }
      productStore.setPage(page);
      document.getElementById("searchFilterPanel")?.scrollIntoView();
    },
    [productStore],
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
    <>
      <Navbar />
      <div className={styles.container}>
        <TitleDescription />
        <SearchFilterPanel
          categoriesStore={categoriesStore}
          productsStore={productStore}
        />
        <AnimatePresence mode={"wait"} custom={direction}>
          <motion.div
            key={productStore.currentPage}
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
          </motion.div>
        </AnimatePresence>
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
