import React, { useRef } from "react";
import { useState } from "react";
import cn from "classnames";
import styles from "./Navbar.module.scss";
import { MainLogo } from "./icons/MainLogo.tsx";
import { useClickOutside } from "hooks/ui/useClickOutside.ts";
import { NavbarIcons } from "./components/NavbarIcons.tsx";
import { NavbarLinks } from "./components/NavbarLinks.tsx";

interface NavbarProps {
  handleFiltersReset?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ handleFiltersReset }) => {
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
        <div onClick={handleFiltersReset}>
          <MainLogo />
        </div>
        <div className={styles.links}>
          <NavbarLinks />
        </div>

        <div className={styles.icons}>
          <div className={styles.icons}>
            <NavbarIcons />
          </div>
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
        <NavbarLinks />
        <div className={styles.burgerMenuIconsWrapper}>
          <NavbarIcons />
        </div>
      </div>
    </nav>
  );
};
