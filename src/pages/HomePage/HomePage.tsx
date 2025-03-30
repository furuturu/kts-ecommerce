import React from "react";
import styles from "./HomePage.module.scss";
import { Navbar } from "components/Navbar";
import { TitleDescription } from "./components/TitleDescription";
import { SearchFilterPanel } from "./components/SearchFilterPanel";
import { useProducts } from "../../hooks/useProducts.ts";
import Loader from "../../components/Loader";
import Card from "../../components/Card";
import Text from "../../components/Text";
import { NavLink } from "react-router";

export const HomePage: React.FC = () => {
  const { data, loading, error } = useProducts();
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <TitleDescription />
        <SearchFilterPanel />
        <div className={styles.cardContainer}>
          {loading && <Loader size="l" />}
          {data &&
            data.map((product) => (
              <NavLink to={product.documentId} key={product.documentId}>
                <Card
                  className={styles.card}
                  captionSlot={product.title}
                  image={product.images[0].url}
                  subtitle={product.description}
                  title={product.title}
                />
              </NavLink>
            ))}
          {error && <Text tag="h1">error</Text>}
        </div>
      </div>
    </>
  );
};
