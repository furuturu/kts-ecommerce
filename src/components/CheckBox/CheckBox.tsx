// CheckBox.tsx
import React from "react";
import style from "./CheckBox.module.scss";
import cn from "classnames";

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "size"
> & {
  onChange: (checked: boolean) => void;
  size?: "small" | "medium" | "large";
};

const CheckBox: React.FC<CheckBoxProps> = ({
  onChange,
  size = "medium",
  className,
  ...props
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <label
      className={cn(
        style.checkboxWrapper,
        {
          [style.disabled]: props.disabled,
          [style[size]]: true,
        },
        className,
      )}
    >
      <input
        type="checkbox"
        onChange={handleChange}
        className={style.nativeInput}
        {...props}
      />
      <div className={style.customCheckbox} aria-hidden="true">
        <svg viewBox="0 0 12 10" className={style.checkmark}>
          <path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M1 5.5L4.5 9L11 1"
          />
        </svg>
      </div>
    </label>
  );
};
export default CheckBox;
