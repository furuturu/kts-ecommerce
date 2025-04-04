import React, { useEffect } from "react";
import styles from "./HomePage.module.scss";
import { Navbar } from "components/Navbar";
import { TitleDescription } from "./components/TitleDescription";
import { SearchFilterPanel } from "./components/SearchFilterPanel";
import Loader from "components/Loader";
import Card from "components/Card";
import Text from "components/Text";
import { NavLink } from "react-router";
import { Pagination } from "./components/Pagination/Pagination.tsx";
import { productsStore } from "../../store/modules/ProductsStore.ts";
import { observer } from "mobx-react-lite";

export const HomePage: React.FC = observer(() => {
  const { data, loading, error, setPage, currentPage, fetchProducts } =
    productsStore;

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, fetchProducts]);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <TitleDescription />
        <SearchFilterPanel />
        <div className={styles.cardContainer}>
          {loading && <Loader size="l" />}
          {/* todo: юзер френдли еррор компонент*/}
          {error && <Text tag="h1">{error}</Text>}
          {data &&
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
                  to={product.documentId}
                  key={product.documentId}
                  className={styles.productLink}
                />
              </Card>
            ))}
        </div>
        {data && (
          <Pagination
            totalPages={data.meta?.pagination.pageCount}
            currentPage={currentPage}
            onPageChange={setPage}
          />
        )}
      </div>
    </>
  );
});
