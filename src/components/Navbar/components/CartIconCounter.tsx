import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react-lite";
import { rootStore } from "store/global/RootStore.ts";
import { NavLink } from "react-router";
import cn from "classnames";
import { CartIcon } from "../icons/CartIcon.tsx";
import styles from "../Navbar.module.scss";

export const CartIconCounter: React.FC = observer(() => {
  const quantity = rootStore.cart.items.length;
  const [animate, setAnimate] = useState(false);
  const prevQuantityRef = useRef(quantity);

  useEffect(() => {
    if (quantity !== prevQuantityRef.current && quantity > 0) {
      if (quantity < prevQuantityRef.current) {
        prevQuantityRef.current = quantity;
        return;
      }
      setAnimate(true);

      const timer = setTimeout(() => {
        setAnimate(false);
      }, 300);

      return () => clearTimeout(timer);
    }
    prevQuantityRef.current = quantity;
  }, [quantity]);

  return (
    <div className={styles.iconContainer}>
      <NavLink
        to={"/cart"}
        className={({ isActive }) =>
          cn(styles.icon, { [styles.iconActive]: isActive })
        }
      >
        <CartIcon className={styles.iconSvg} />

        {quantity > 0 && (
          <div
            className={cn(styles.badge, { [styles.badgeAnimated]: animate })}
          >
            {quantity}
          </div>
        )}
      </NavLink>
    </div>
  );
});
