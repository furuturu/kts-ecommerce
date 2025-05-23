import style from "./Checkout.module.scss";
import Text from "components/Text";
import { rootStore } from "store/global/RootStore.ts";
import React from "react";
import { observer } from "mobx-react-lite";

type CheckoutProps = {
  totalPrice: number;
};

export const Checkout: React.FC<CheckoutProps> = observer(({ totalPrice }) => {
  return (
    <div className={style.checkoutContainer}>
      <div className={style.summarySticky}>
        <div className={style.summaryHeader}>
          <Text tag={"span"} className={style.summaryLabel}>
            Товары ({rootStore.cart.totalSelectedItems})
            {/* это количество включает и количество каждого товара, а не только наименований */}
          </Text>
          <div className={style.totalPriceWrapper}>
            <Text tag={"h2"} className={style.totalPrice}>
              Итого
            </Text>
            <Text tag={"h2"} className={style.totalPrice}>
              ${totalPrice}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
});
