import React from "react";
import { useState } from "react";
import { NavLink } from "react-router";
import cn from "classnames";
import styles from "./Navbar.module.scss";
import { MainLogo } from "./icons/MainLogo.tsx";
import { navbarLinks } from "constants/navbarLinks.ts";
import { navbarIcons } from "constants/navbarIcons.ts";

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <MainLogo />
        <div className={styles.links}>
          {navbarLinks.map(({ path, text }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                cn(styles.link, { [styles.linkActive]: isActive })
              }
            >
              {text}
            </NavLink>
          ))}
        </div>

        <div className={styles.icons}>
          {navbarIcons.map(({ icon: NavbarIcon, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                cn(styles.icon, { [styles.iconActive]: isActive })
              }
            >
              <NavbarIcon className={styles.iconSvg} />
            </NavLink>
          ))}
        </div>

        <button
          className={cn(styles.burger, { [styles.burgerOpen]: isMenuOpen })}
          onClick={handleMenuClick}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={cn(styles.mobile, { [styles.mobileOpen]: isMenuOpen })}>
        {navbarLinks.map(({ path, text }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              cn(styles.mobileLink, { [styles.mobileLinkActive]: isActive })
            }
            onClick={handleMenuClick}
          >
            {text}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
