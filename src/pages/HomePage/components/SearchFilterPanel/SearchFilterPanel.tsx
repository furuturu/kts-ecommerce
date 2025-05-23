import React, { useCallback, useEffect, useMemo, useState } from "react";
import Input from "components/Input";
import styles from "./SearchFilterPanel.module.scss";
import Button from "components/Button";
import MultiDropdown, { Option } from "components/MultiDropdown";
import { observer } from "mobx-react-lite";
import { CategoryStore } from "store/local/CategoryStore.ts";
import { ProductsStore } from "store/local/ProductsStore.ts";
import { ClearIcon } from "components/icons/ClearIcon/ClearIcon.tsx";

interface SearchFilterPanelProps {
  categoriesStore: CategoryStore;
  productsStore: ProductsStore;
}

export const SearchFilterPanel: React.FC<SearchFilterPanelProps> = observer(
  ({ categoriesStore, productsStore }) => {
    useEffect(() => {
      categoriesStore.getCategories();
    }, [categoriesStore]);

    const { searchQuery } = productsStore;

    const [inputValue, setInputValue] = useState(searchQuery);

    useEffect(() => {
      setInputValue(searchQuery);
    }, [searchQuery]);

    const handleInputChange = useCallback((value: string) => {
      setInputValue(value);
    }, []);

    const onFormSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      productsStore.setSearchQuery(inputValue);
    };

    const handleClearInput = useCallback(() => {
      setInputValue("");
      productsStore.setSearchQuery("");
    }, [productsStore]);

    const handleCategoryChange = useCallback(
      (selectedOptions: Option[]) => {
        const newCategory =
          selectedOptions.length > 0 ? String(selectedOptions[0]?.key) : "";
        productsStore.setSelectedCategory(newCategory);
      },
      [productsStore],
    );

    const categoryOptions = useMemo(
      () => categoriesStore.categoryOptions,
      [categoriesStore.categoryOptions],
    );

    const selectedCategoryOption = useMemo(() => {
      return productsStore.selectedCategory
        ? categoryOptions.find(
            (option) => String(option.key) === productsStore.selectedCategory,
          )
        : null;
    }, [productsStore.selectedCategory, categoryOptions]);

    const getDropdownTitle = useCallback((selected: Option[]) => {
      return selected[0]?.value || "Filter";
    }, []);

    return (
      <div className={styles.container} id={"searchFilterPanel"}>
        <form onSubmit={onFormSubmit}>
          <Input
            className={styles.searchInput}
            value={inputValue}
            onChange={handleInputChange}
            placeholder={"Search product"}
            afterSlot={<ClearIcon />}
            handleClear={handleClearInput}
          />
          <Button className={styles.searchButton} type="submit">
            Find now
          </Button>
        </form>
        <MultiDropdown
          getTitle={getDropdownTitle}
          onChange={handleCategoryChange}
          options={categoryOptions}
          value={selectedCategoryOption ? [selectedCategoryOption] : []}
        ></MultiDropdown>
      </div>
    );
  },
);
