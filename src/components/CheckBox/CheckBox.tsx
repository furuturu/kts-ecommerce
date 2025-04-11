import React from "react";
import style from "./CheckBox.module.scss";
import cn from "classnames";

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ onChange, ...props }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <label
      className={cn({
        [style.checkboxDisabledChecked]: props.disabled && props.checked,
        [style.checkboxDisabled]: props.disabled && !props.checked,
        [style.checkboxChecked]: props.checked && !props.disabled,
        [style.checkbox]: !props.checked && !props.disabled,
      })}
    >
      <input type="checkbox" onChange={handleChange} {...props} />
    </label>
  );
};

export default CheckBox;
