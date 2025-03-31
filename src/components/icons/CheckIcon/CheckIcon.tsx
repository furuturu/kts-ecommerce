import * as React from "react";
import Icon, { IconProps } from "../Icon";

const CheckIcon: React.FC<IconProps> = ({ color, ...props }) => {
  const fill =
    color === "accent"
      ? "#518581"
      : color === "primary"
        ? "#000000"
        : color === "secondary"
          ? "#AFADB5"
          : "black";

  return (
    <Icon {...props}>
      <path d="M4 11.6129L9.87755 18L20 7" stroke={fill} strokeWidth="2" />
    </Icon>
  );
};

export default CheckIcon;
