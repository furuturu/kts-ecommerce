import React from "react";
import { Navbar } from "components/Navbar";
import styles from "../User.module.scss";
import Text from "components/Text";

interface GreetingProps {
  username: string;
  onClick: () => void;
}
export const Greeting: React.FC<GreetingProps> = ({
  username,
  onClick,
}: GreetingProps) => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <Text tag={"h1"} className={styles.profileTitle}>
          Hello {username}!
        </Text>
        <button className={styles.profileButton} onClick={onClick}>
          Logout
        </button>
      </div>
    </>
  );
};
