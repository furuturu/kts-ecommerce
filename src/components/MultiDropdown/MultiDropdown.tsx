import React, { useState, useEffect, useRef } from "react";
import Input from "../Input";
import style from "./MultiDropdown.module.scss";
import classNames from "classnames";

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string | number;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  onChange,
  getTitle,
  className,
  disabled,
}) => {
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const [inputValue, setInputValue] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  const [currentlySelected, setCurrentlySelected] = useState<Option[]>(value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const filtered = options.filter((option) =>
      option.value.toLowerCase().includes(inputValue.toLowerCase()),
    );
    setFilteredOptions(filtered);
  }, [inputValue, options]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleOptionClick = (option: Option) => {
    const isSelected = currentlySelected.some(
      (selected) => selected.key === option.key,
    );

    if (!isSelected) {
      const newValue = [...value, option];
      const newActiveOptions = [...currentlySelected, option];
      onChange(newValue);
      setCurrentlySelected(newActiveOptions);
    } else {
      const newValue = value.filter((selected) => selected.key !== option.key);
      const newActiveOptions = currentlySelected.filter(
        (selected) => selected.key !== option.key,
      );
      onChange(newValue);
      setCurrentlySelected(newActiveOptions);
    }
  };

  return (
    <div ref={dropdownContainerRef} className={className}>
      {value.length > 0 && !isDropdownOpen ? (
        <Input
          value={getTitle(value)}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          disabled={disabled}
          afterSlot={true}
        />
      ) : (
        <Input
          value={inputValue}
          placeholder={getTitle(value)}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          disabled={disabled}
          afterSlot={true}
        />
      )}

      {isDropdownOpen && !disabled && (
        <div className={style.dropdown}>
          {filteredOptions.map((option) => {
            const isActive = currentlySelected.some(
              (selected) => selected.key === option.key,
            );
            return (
              <div
                key={option.key}
                onClick={() => handleOptionClick(option)}
                className={classNames(style.option, {
                  [style.optionActive]: isActive,
                })}
              >
                {option.value}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;
