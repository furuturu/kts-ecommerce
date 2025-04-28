import { NavLink } from "react-router";
import cn from "classnames";
import styles from "../Navbar.module.scss";
import { UserIcon } from "../icons/UserIcon.tsx";
import React from "react";
import { CartIconCounter } from "./CartIconCounter.tsx";

export const NavbarIcons: React.FC = () => {
  return (
    <>
      <CartIconCounter />
      <NavLink
        to={"/profile"}
        className={({ isActive }) =>
          cn(styles.icon, { [styles.iconActive]: isActive })
        }
      >
        <UserIcon className={styles.iconSvg} />
      </NavLink>
    </>
  );
};
