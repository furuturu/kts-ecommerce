import React from "react";
import Text from "components/Text";
import styles from "./TitleDescription.module.scss";

export const TitleDescription: React.FC = () => {
  return (
    <div className={styles.container}>
      <Text tag="h1" color="primary" weight="bold" className={styles.title}>
        Products
      </Text>
      <Text
        tag="p"
        view="p-20"
        color="secondary"
        weight="normal"
        className={styles.description}
      >
        We display products based on the latest products we have, if you want to
        see our old products please enter the name of the item
      </Text>
    </div>
  );
};
