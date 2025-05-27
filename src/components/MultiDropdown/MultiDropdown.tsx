import React, { useState } from "react";
import Input from "../Input";
import style from "./MultiDropdown.module.scss";
import classNames from "classnames";
import { useClickOutside } from "hooks/ui/useClickOutside.ts";
import { motion, AnimatePresence } from "framer-motion";

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
  const dropdownContainerRef = useClickOutside(() => setIsDropdownOpen(false));

  // Фильтрация опций по введенному тексту
  const filteredOptions = options.filter((option) =>
    option.value.toLowerCase().includes(inputValue.toLowerCase()),
  );

  // Обработчик выбора опции
  const handleOptionClick = (option: Option) => () => {
    const isSelected = value.some((selected) => selected.key === option.key);
    onChange(isSelected ? [] : [option]); // Тогглим выбор опции
    setIsDropdownOpen(false); // Закрываем dropdown после выбора
  };

  const handleOnFocus = () => {
    setIsDropdownOpen(true);
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
        onFocus={handleOnFocus}
        disabled={disabled}
        afterSlot={true}
      />
      <AnimatePresence>
        {isDropdownOpen && !disabled && (
          <motion.div
            initial={{
              opacity: 0,
              scaleY: 0,
              transformOrigin: "top",
            }}
            animate={{
              opacity: 1,
              scaleY: 1,
              transformOrigin: "top",
            }}
            exit={{
              opacity: 0,
              scaleY: 0,
              transformOrigin: "top",
            }}
            transition={{
              duration: 0.3,
              ease: "easeIn",
            }}
            className={style.dropdown}
          >
            {filteredOptions.map((option) => {
              const isSelected = value.some(
                (selected) => selected.key === option.key,
              );
              return (
                <div
                  key={option.key}
                  onClick={handleOptionClick(option)}
                  className={classNames(style.option, {
                    [style.optionActive]: isSelected,
                  })}
                >
                  {option.value}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MultiDropdown;
