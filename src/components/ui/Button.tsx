import { ButtonProps } from "@/interfaces/main";
import { raleway } from "@/app/fonts/mainFonts";

const Button = ({
  text,
  textColor,
  buttonBg,
  border,
  size,
  rightIcon,
}: ButtonProps) => {
  const verifyBorder = () => {
    switch (border) {
      case "black":
        return "border-1 border-black";
      case "white":
        return "border-1 border-white";
      case "none":
        return "";
    }
  };

  return (
    <button
      className={`${rightIcon ? "flex items-center gap-3" : ""} ${
        textColor === "black" ? "text-(--black)" : "text-(--white)"
      } ${verifyBorder()} ${
        buttonBg === "black" ? "bg-(--black)" : "bg-transparent"
      } ${raleway.className} py-3 px-10 rounded-[.3rem] cursor-pointer`}
    >
      <span className={`${size === "md" ? "text-[1rem]" : "text-lg"}`}>
        {text}
      </span>
      {rightIcon}
    </button>
  );
};

export default Button;
