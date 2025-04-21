import React from "react";
import cn from "classnames";
import styles from "./CardSkeleton.module.scss";

type CardSkeletonProps = {
  className?: string;
};

export const CardSkeleton: React.FC<CardSkeletonProps> = (className) => {
  return (
    <div className={cn(styles.wrapper, className)}>
      <div className={styles.skeletonImage} />
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
