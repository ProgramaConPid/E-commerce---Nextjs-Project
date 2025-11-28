"use client";

import { ButtonProps } from "@/interfaces/main";
import { raleway } from "@/app/fonts/mainFonts";

const Button = ({
  type,
  text,
  textColor = "white",
  buttonBg = "black",
  border = "none",
  size = "md",
  rightIcon,
  onClick,
}: ButtonProps) => {

  const sizes = {
    md: "text-base",
    lg: "text-lg",
    sm: "text-sm",
  };

  const textColorClass =
    textColor === "black"
      ? "text-[var(--black)]"
      : "text-[var(--white)]";

  const bgColorClass =
    buttonBg === "black"
      ? "bg-[var(--black)]"
      : "bg-transparent";

  const borderClass =
    border === "black"
      ? "border border-[var(--black)]"
      : border === "white"
      ? "border border-[var(--white)]"
      : "";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        ${raleway.className}
        ${sizes[size]}
        ${textColorClass}
        ${bgColorClass}
        ${borderClass}
        ${text === "Checkout" ? "w-full" : ""}
        ${text === "Not Allowed" ? "w-full opacity-50 cursor-not-allowed" : ""}
        ${rightIcon ? "flex items-center gap-3" : ""}
        py-3 px-10 rounded-md cursor-pointer duration-300
      `}
      disabled={text === "Not Allowed"} 
    >
      <span>{text}</span>
      {rightIcon}
    </button>
  );
};

export default Button;
