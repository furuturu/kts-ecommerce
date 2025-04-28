import React from "react";
import { Navbar } from "components/Navbar";
import Text from "components/Text";
import styles from "./AboutUs.module.scss";
import { PageTransition } from "components/PageTransition";

export const AboutUs: React.FC = () => {
  return (
    <PageTransition>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.content}>
          <Text tag={"h2"} className={styles.heading}>
            About Us
          </Text>
          <div className={styles.divider}></div>
          <Text tag={"p"} className={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            lacinia odio vitae vestibulum vestibulum. Cras porttitor metus vel
            lorem finibus maximus. Vivamus dignissim, urna ut hendrerit rutrum,
            urna lorem pellentesque libero, sit amet semper augue magna nec
            felis. Morbi et lorem in neque consequat volutpat. Vivamus vehicula,
            erat id interdum tristique, orci augue viverra dolor, in hendrerit
            felis magna sed lorem. Sed at feugiat felis, quis sodales erat.
          </Text>
        </div>
      </div>
    </PageTransition>
  );
};
