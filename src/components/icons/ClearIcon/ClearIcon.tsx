import React from "react";
import Icon, { IconProps } from "../Icon";

export const ClearIcon: React.FC<IconProps> = ({ ...props }) => {
  return (
    <Icon
      {...props}
      width={14}
      height={14}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </Icon>
  );
};
