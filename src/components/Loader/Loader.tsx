import React from "react";
import style from "./Loader.module.scss";
import cn from "classnames";
import { LOADER_SIZE_CONFIG, PATH_DATA_CONFIG } from "constants/loader.ts";

export type LoaderProps = {
  /** Размер */
  size?: "s" | "m" | "l";
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  mode?: "default" | "button";
};

const Loader: React.FC<LoaderProps> = ({
  size = "l",
  className,
  mode = "default",
}) => {
  const sizeValue = LOADER_SIZE_CONFIG[size];
  const pathData = PATH_DATA_CONFIG[size];

  const commonSvgProps = {
    className: cn(`${style.loading} ${className} ${style[`${mode}Mode`]}`),
    width: sizeValue,
    height: sizeValue,
    viewBox: `0 0 ${sizeValue} ${sizeValue}`,
  };

  return (
    <svg {...commonSvgProps}>
      <path d={pathData} fill="currentColor" />
    </svg>
  );
};

export default Loader;
