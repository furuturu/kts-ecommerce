import React, { useEffect } from "react";
import Input from "components/Input";
import styles from "./SearchFilterPanel.module.scss";
import Button from "components/Button";
import MultiDropdown, { Option } from "components/MultiDropdown";
import { observer } from "mobx-react-lite";
import { searchFilterStore } from "store/modules/SearchFilterStore.ts";

export const SearchFilterPanel: React.FC = observer(() => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    categories,
    setSelectedCategory,
    fetchCategories,
    applySearchAndCategory,
  } = searchFilterStore;

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const categoryOptions = categories.map((category) => ({
    key: category.id,
    value: category.title,
  }));

  const selectedCategoryOption = selectedCategory
    ? categoryOptions.find((option) => String(option.key) === selectedCategory)
    : null;

  const getDropdownTitle = (selected: Option[]) => {
    return selected[0]?.value || "Надо выбрать";
  };

  const handleCategoryChange = (selectedOptions: Option[]) => {
    const newCategory = String(selectedOptions[0]?.key) || "";
    setSelectedCategory(newCategory);
    applySearchAndCategory();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    applySearchAndCategory();
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
});
