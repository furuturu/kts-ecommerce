import React, { MouseEvent } from "react";

type ClearButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  handleClear: () => void;
  className: string;
};

export const ClearButton: React.FC<ClearButtonProps> = ({
  className,
  handleClear,
  ...props
}) => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <button
      {...props}
      type="button"
      className={className}
      onClick={handleClear}
      onMouseDown={handleClick}
    >
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  );
};
