import React from "react";
import Loader from "../Loader";
import style from "./Button.module.scss";
import classNames from "classnames";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  loading,
  children,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      {...props}
      className={classNames(style.button, className, {
        [style.loading]: loading,
        [style.disabled]: disabled,
      })}
      disabled={disabled || loading}
    >
      {loading && <Loader size="s" mode="button" />}
      {children}
    </button>
  );
};

export default Button;
