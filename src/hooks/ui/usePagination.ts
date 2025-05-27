import { useCallback } from "react";

interface UsePaginationProps {
  currentPage: number;
  totalPages: number;
}

export const usePagination = ({
  currentPage,
  totalPages,
}: UsePaginationProps) => {
  const getPageNumbers = useCallback(() => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const numberBeforeCurrent = Math.max(2, currentPage - 1);
    const numberAfterCurrent = Math.min(totalPages - 1, currentPage + 1);
    for (let i = numberBeforeCurrent; i <= numberAfterCurrent; i++) {
      pages.push(i);
    }

    if (totalPages - 2 > currentPage) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages]);
  return {
    pageNumbers: getPageNumbers(),
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages,
  };
};
