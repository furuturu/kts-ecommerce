import { NavLink } from "react-router";
import cn from "classnames";
import styles from "../Navbar.module.scss";
import React from "react";

export const NavbarLinks: React.FC = () => {
  return (
    <>
      {" "}
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          cn(styles.link, { [styles.linkActive]: isActive })
        }
      >
        <span className={styles.linkText}>Products</span>
      </NavLink>
      <NavLink
        to={"/categories"}
        className={({ isActive }) =>
          cn(styles.link, { [styles.linkActive]: isActive })
        }
      >
        <span className={styles.linkText}>Categories</span>
      </NavLink>
      <NavLink
        to={"/about"}
        className={({ isActive }) =>
          cn(styles.link, { [styles.linkActive]: isActive })
        }
      >
        <span className={styles.linkText}>About Us</span>
      </NavLink>
    </>
  );
};
