import Link from "next/link";
import React from "react";

const Button = ({
  onClick,
  svgElement,
  text,
  className,
  type,
}: {
  onClick?: () => void;
  svgElement?: React.ReactNode;
  text: string;
  className?: string;
  type?: "button" | "submit" | "reset";
}) => {
  return (
    <button
      onClick={onClick}
      className={`py-3 px-5  text-background rounded-2xl font-semibold duration-150 cursor-pointer flex items-center justify-center  ${className} `}
      type={type ? type : "button"}
    >
      {svgElement}
      {text}
    </button>
  );
};

export default Button;
