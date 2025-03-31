import React from "react";
import style from "./CheckBox.module.scss";

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

  const getClassName = () => {
    if (props.disabled) {
      return props.checked
        ? style.checkboxDisabledChecked
        : style.checkboxDisabled;
    }
    return props.checked ? style.checkboxChecked : style.checkbox;
  };

  return (
    <label className={getClassName()}>
      <input type="checkbox" onChange={handleChange} {...props} />
    </label>
  );
};

export default CheckBox;
