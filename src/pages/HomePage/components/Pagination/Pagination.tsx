import React from "react";
import styles from "./Pagination.module.scss";
import { usePagination } from "hooks/usePagination.ts";
import { ArrowIcon } from "../ArrowIcon";
import cn from "classnames";

interface PaginationProps {
  /** Текущая страница */
  currentPage: number;
  /** Общее количество страниц */
  totalPages: number;
  /** Функция, которая управляет изменением стейта */
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handleClickPage = (page: string | number) => () => {
    if (typeof page === "number") {
      onPageChange(page);
    }
  };
  const { pageNumbers, isLastPage, isFirstPage } = usePagination({
    currentPage,
    totalPages,
  });
  return (
    <div className={styles.container}>
      <button
        className={cn(styles.navigateArrow, {
          [styles.arrowIsDisabled]: isFirstPage,
        })}
        onClick={handleClickPage(currentPage - 1)}
        disabled={isFirstPage}
      >
        <ArrowIcon />
      </button>
      {pageNumbers.map((element, index) => (
        <button
          key={index}
          className={cn(styles.paginationElement, {
            [styles.activePage]: element === currentPage,
          })}
          disabled={typeof element !== "number" || element === currentPage}
          onClick={handleClickPage(element)}
        >
          {element}
        </button>
      ))}
      <button
        className={cn(styles.navigateArrow, {
          [styles.arrowIsDisabled]: isLastPage,
        })}
        onClick={handleClickPage(currentPage + 1)}
        disabled={isLastPage}
      >
        <ArrowIcon />
      </button>
    </div>
  );
};
