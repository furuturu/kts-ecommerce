import Icon from "components/icons/Icon";
import { FC } from "react";
import styles from "./GoBack.module.scss";
import Text from "components/Text";

interface GoBackProps {
  handleBackClick: () => void;
}

export const GoBack: FC<GoBackProps> = ({ handleBackClick }) => {
  return (
    <div className={styles.goBack} onClick={handleBackClick}>
      <Icon width={32} height={32} className={styles.backIcon}>
        <path
          d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Icon>
      <Text view="p-20" className={styles.backText}>
        Назад
      </Text>
    </div>
  );
};
