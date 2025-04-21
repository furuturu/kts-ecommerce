import React, { useRef } from "react";
import { useState } from "react";
import { NavLink } from "react-router";
import cn from "classnames";
import styles from "./Navbar.module.scss";
import { MainLogo } from "./icons/MainLogo.tsx";
import { navbarLinks } from "constants/navbarLinks.ts";
import { navbarIcons } from "constants/navbarIcons.ts";
import { useClickOutside } from "hooks/useClickOutside.ts";

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navbarContainerRef = useClickOutside(
    () => setIsMenuOpen(false),
    buttonRef,
  );

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
              <span className={styles.linkText}>{text}</span>
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
          ref={buttonRef}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        className={cn(styles.mobile, { [styles.mobileOpen]: isMenuOpen })}
        ref={navbarContainerRef}
      >
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
