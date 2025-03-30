import React, { useState } from "react";
import Input from "components/Input";
import styles from "./SearchFilterPanel.module.scss";
import Button from "components/Button";
import MultiDropdown from "components/MultiDropdown";

type TestOption = {
  key: string;
  value: string;
};

export const SearchFilterPanel: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState<TestOption[]>([]);

  const testOptionsUntilApiWorks: TestOption[] = [
    { key: "1", value: "test1" },
    { key: "2", value: "test2" },
    { key: "3", value: "test3" },
  ];
  const testToSetupPlaceholder = () => "Filter";

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSearchValue("");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <Input
          className={styles.searchInput}
          value={searchValue}
          onChange={setSearchValue}
          placeholder={"Search product"}
        />
        <Button className={styles.searchButton}>Find now</Button>
      </form>
      <MultiDropdown
        getTitle={testToSetupPlaceholder}
        onChange={setCategory}
        options={testOptionsUntilApiWorks}
        value={category}
      ></MultiDropdown>
    </div>
  );
};
