import React from "react";
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
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { onChange, className, disabled, value, placeholder, afterSlot, ...props },
    ref,
  ) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
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
        {afterSlot && <div className={style.icon}>{afterSlot}</div>}
      </div>
    );
  },
);

export default Input;
