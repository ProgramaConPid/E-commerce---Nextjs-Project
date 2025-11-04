import type { JSX } from "react";

type ButtonBg = "black" | "transparent";

export interface ButtonProps {
  text: string;
  textColor: "black" | "white";
  rightIcon?: JSX.Element;
  buttonBg: ButtonBg;
  size: "md" | "lg";
  border: "white" | "black" | "none";
}

export interface ProductCardProps {
  heartIcon: JSX.Element;
  image: string;
  title: string;
  price: number;
  button: JSX.Element;
}