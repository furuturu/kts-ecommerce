import React, { ReactNode } from "react";
import Input from "components/Input";
import cn from "classnames";
import styles from "./Counter.module.scss";

interface CounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
  onRemove?: () => void;
  removeIcon?: ReactNode;
}

export const Counter: React.FC<CounterProps> = ({
  /** Значение для инпута счетчика */
  value,
  /** Функция для смены значения инпута */
  onChange,
  /** Минимальное значение */
  min = 1,
  /** Максимальное значение */
  max = 2000,
  /** Дополнительный класснейм для общего контейнера */
  className,
  /** Функция, срабатывающая когда счетчик уходит меньше min */
  onRemove,
  /** Иконка, заменяющая знак минус при значении счетчика min */
  removeIcon,
}) => {
  const handleInputChange = (input: string) => {
    const numericValue = input.replace(/[^0-9]/g, "");
    if (!numericValue || numericValue === "0") {
      onChange(min);
      return;
    }
    const newValue = parseInt(numericValue, 10);
    if (newValue > max) {
      onChange(max);
    } else if (newValue < min) {
      onChange(min);
    } else {
      onChange(newValue);
    }
  };

  const handleDecrease = () => {
    if (value === min && onRemove) {
      onRemove();
    } else {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    onChange(Math.min(value + 1, max));
  };

  const showRemoveIcon = value === min && onRemove && removeIcon;
  const showMinusSign = value > min || !onRemove;

  return (
    <div className={cn(styles.counter, className)}>
      <button
        className={cn(styles.button, {
          [styles.removeButton]: showRemoveIcon,
        })}
        onClick={handleDecrease}
        disabled={value === min && !onRemove}
      >
        {showRemoveIcon ? (
          <span className={styles.iconWrapper}>{removeIcon}</span>
        ) : (
          showMinusSign && "-"
        )}
      </button>
      <Input
        onChange={handleInputChange}
        value={String(value)}
        className={styles.input}
      />
      <button
        className={styles.button}
        onClick={handleIncrease}
        disabled={value === max}
      >
        +
      </button>
    </div>
  );
};
