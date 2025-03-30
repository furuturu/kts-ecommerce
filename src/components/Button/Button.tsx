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
  const buttonClassName = classNames(style.button, className, {
    [style.loading]: loading,
    [style.disabled]: disabled,
    [style.default]: !loading || !disabled,
    [style.animation]: !loading && !disabled,
  });

  return (
    <button
      {...props}
      className={buttonClassName}
      disabled={disabled || loading}
    >
      {(loading && disabled) || loading ? (
        <Loader size="s" className="button-loader" />
      ) : null}
      {children}
    </button>
  );
};

export default Button;
