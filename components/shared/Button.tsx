import React from "react";

const Button = ({ text, className }: { text: string; className?: string }) => {
  return (
    <button
      className={`py-3 px-5 bg-primary text-background rounded-2xl font-semibold duration-200 cursor-pointer  ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
