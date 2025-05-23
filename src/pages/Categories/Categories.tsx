import React, { useEffect } from "react";
import { useLocalStore } from "hooks/useLocalStore.ts";
import { createCategoriesStore } from "store/local/CategoryStore.ts";
import { ProductCategory } from "types/types.ts";
import { observer } from "mobx-react-lite";
import { Navbar } from "components/Navbar";
import style from "./Categories.module.scss";
import { NavLink } from "react-router";
import Card from "components/Card";
import Loader from "components/Loader";
import { AnimatePresence, motion } from "framer-motion";
import { PageTransition } from "components/PageTransition";

export const Categories: React.FC = observer(() => {
  const categoriesStore = useLocalStore(createCategoriesStore);
  useEffect(() => {
    categoriesStore.getCategories();
  }, [categoriesStore]);

  const { categories, loading, error } = categoriesStore;
  return (
    <PageTransition>
      <Navbar />
      <div className={style.container}>
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Loader size="l" />
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className={style.error}>{error}</div>
            </motion.div>
          ) : (
            <motion.div
              key="categories"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={style.categoriesContainer}
            >
              {categories?.map((category: ProductCategory) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <Card
                    image={category.image.url}
                    title={category.title}
                    subtitle={""}
                    className={style.category}
                  >
                    <NavLink
                      to={`/?category=${category.id}`}
                      className={style.categoryLink}
                    />
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
});
