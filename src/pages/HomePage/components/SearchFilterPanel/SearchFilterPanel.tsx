import React, { useEffect } from "react";
import Input from "components/Input";
import styles from "./SearchFilterPanel.module.scss";
import Button from "components/Button";
import MultiDropdown, { Option } from "components/MultiDropdown";
import { observer } from "mobx-react-lite";
import { SearchFilterStore } from "store/modules/SearchFilterStore.ts";

interface SearchFilterPanelProps {
  searchFilterStore: SearchFilterStore;
  onFilterApply: () => void;
}

export const SearchFilterPanel: React.FC<SearchFilterPanelProps> = observer(
  ({ searchFilterStore, onFilterApply }) => {
    const {
      categories,
      fetchCategories,
      selectedCategory,
      setSelectedCategory,
      searchQuery,
      setSearchQuery,
    } = searchFilterStore;

    useEffect(() => {
      fetchCategories();
    }, [searchFilterStore, fetchCategories]);

    const categoryOptions = [
      { key: "", value: "Все категории" },
      ...categories.map((category) => ({
        key: category.id,
        value: category.title,
      })),
    ];

    const selectedCategoryOption = selectedCategory
      ? categoryOptions.find(
          (option) => String(option.key) === selectedCategory,
        )
      : null;

    const getDropdownTitle = (selected: Option[]) => {
      return selected[0]?.value || "Filter";
    };

    const handleCategoryChange = (selectedOptions: Option[]) => {
      const newCategory =
        selectedOptions.length > 0 ? String(selectedOptions[0]?.key) : "";
      setSelectedCategory(newCategory);
      onFilterApply();
    };

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      onFilterApply();
    };

    return (
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <Input
            className={styles.searchInput}
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={"Search product"}
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
