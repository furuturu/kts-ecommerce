import React, { MouseEvent } from "react";
import style from "./Input.module.scss";
import classNames from "classnames";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
  /** Функция, вызываемая по клику на иконку справа */
  handleClear?: () => void;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      onChange,
      className,
      disabled,
      value,
      placeholder,
      afterSlot,
      handleClear,
      ...props
    },
    ref,
  ) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    };
    const handleClearClick = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
    return (
      <div className={classNames(style.wrapper, className)}>
        <input
          {...props}
          ref={ref}
          type="text"
          className={style.input}
          disabled={!!disabled}
          onChange={handleChange}
          value={value}
          placeholder={placeholder}
        />
        {afterSlot && (
          <button
            type={"button"}
            className={style.icon}
            onClick={handleClear}
            onMouseDown={handleClearClick}
          >
            {afterSlot}
          </button>
        )}
      </div>
    );
  },
);

export default Input;
