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
  const [inputValue, setInputValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  // Фильтрация опций по введенному тексту
  const filteredOptions = options.filter((option) =>
    option.value.toLowerCase().includes(inputValue.toLowerCase()),
  );

  // Обработчик клика вне компонента
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Обработчик выбора опции
  const handleOptionClick = (option: Option) => {
    const isSelected = value.some((selected) => selected.key === option.key);
    onChange(isSelected ? [] : [option]); // Тогглим выбор опции
    setIsDropdownOpen(false); // Закрываем dropdown после выбора
  };

  // Для отображения инпута либо текст из getTitle (если есть категория),
  // либо текущий введенный текст (если dropdown открыт)
  const inputDisplayValue =
    !isDropdownOpen && value.length > 0 ? getTitle(value) : inputValue;

  return (
    <div
      ref={dropdownContainerRef}
      className={classNames(className, style["multiDropdown"])}
    >
      <Input
        value={inputDisplayValue}
        placeholder={getTitle(value)}
        onChange={setInputValue}
        onFocus={() => setIsDropdownOpen(true)}
        disabled={disabled}
        afterSlot={true}
      />

      {isDropdownOpen && !disabled && (
        <div className={style.dropdown}>
          {filteredOptions.map((option) => {
            const isSelected = value.some(
              (selected) => selected.key === option.key,
            );
            return (
              <div
                key={option.key}
                onClick={() => handleOptionClick(option)}
                className={classNames(style.option, {
                  [style.optionActive]: isSelected,
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
