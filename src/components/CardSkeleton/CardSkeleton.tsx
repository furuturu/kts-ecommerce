import React from "react";
import cn from "classnames";
import styles from "./CardSkeleton.module.scss";

type CardSkeletonProps = {
  className?: string;
};

export const CardSkeleton: React.FC<CardSkeletonProps> = ({ className }) => {
  return (
    <div className={cn(styles.wrapper, className)}>
      <svg
        className={styles.skeletonImage}
        width="100%"
        height="100%"
        viewBox="0 0 743 743"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100%" height="100%" fill="#d9d9d9" />
        <rect width="100%" height="100%" fill="url(#shimmer)" />
        <defs>
          <linearGradient
            id="shimmer"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
            gradientTransform="rotate(0)"
          >
            <stop offset="0%" stopColor="#f0f0f0" />
            <stop offset="50%" stopColor="#e0e0e0">
              <animate
                attributeName="offset"
                values="0;1"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#f0f0f0" />
          </linearGradient>
        </defs>
      </svg>
      <div className={styles.content}>
        <div className={cn(styles.skeletonText, styles.caption)} />
        <div className={cn(styles.skeletonText, styles.title)} />
        <div className={cn(styles.skeletonText, styles.subtitle)} />
        <div className={cn(styles.skeletonText, styles.subtitle)} />
        <div className={styles.footer}>
          <div className={cn(styles.skeletonText, styles.contentSlot)} />
          <div className={styles.actionButton} />
        </div>
      </div>
    </div>
  );
};
