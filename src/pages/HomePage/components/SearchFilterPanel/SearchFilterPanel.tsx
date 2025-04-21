import React, { useEffect, useState } from "react";
import Input from "components/Input";
import styles from "./SearchFilterPanel.module.scss";
import Button from "components/Button";
import MultiDropdown, { Option } from "components/MultiDropdown";
import { observer } from "mobx-react-lite";
import { CategoryStore } from "store/modules/CategoryStore.ts";
import { ProductsStore } from "store/modules/ProductsStore.ts";
import { reaction } from "mobx";
import { ClearIcon } from "../../../../components/icons/ClearIcon/ClearIcon.tsx";

interface SearchFilterPanelProps {
  categoriesStore: CategoryStore;
  productsStore: ProductsStore;
}

export const SearchFilterPanel: React.FC<SearchFilterPanelProps> = observer(
  ({ categoriesStore, productsStore }) => {
    useEffect(() => {
      categoriesStore.getCategories();
    }, [categoriesStore]);

    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
      const dispose = reaction(
        () => productsStore.searchQuery,
        (searchQuery) => setInputValue(searchQuery),
      );
      return () => dispose();
    }, [productsStore]);

    const handleInputChange = (value: string) => {
      setInputValue(value);
    };

    const categoryOptions = categoriesStore.categoryOptions;

    const selectedCategoryOption = productsStore.selectedCategory
      ? categoryOptions.find(
          (option) => String(option.key) === productsStore.selectedCategory,
        )
      : null;

    const getDropdownTitle = (selected: Option[]) => {
      return selected[0]?.value || "Filter";
    };

    const handleCategoryChange = (selectedOptions: Option[]) => {
      const newCategory =
        selectedOptions.length > 0 ? String(selectedOptions[0]?.key) : "";
      productsStore.setSelectedCategory(newCategory);
    };

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      productsStore.setSearchQuery(inputValue);
    };

    const handleClearInput = () => {
      productsStore.setSearchQuery("");
    };

    return (
      <div className={styles.container} id={"searchFilterPanel"}>
        <form onSubmit={handleSubmit}>
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
