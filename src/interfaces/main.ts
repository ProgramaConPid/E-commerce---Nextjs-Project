import type { JSX } from "react";
import { bannerBg, ButtonBorder, ButtonSize, TextColor } from '@/types/types';

type ButtonBg = "black" | "transparent";

export interface ButtonProps {
  text: string;
  textColor: TextColor;
  rightIcon?: JSX.Element;
  buttonBg: ButtonBg;
  size: ButtonSize;
  border: ButtonBorder;
}

export interface ProductCardProps {
  _id: string;
  heartIcon: JSX.Element;
  images: string;
  name: string;
  price: number;
  button: JSX.Element;
  onClick: () => void;
  onFavorite: () => void;
}

export interface DetailCardProps {
  detailIcon: JSX.Element;
  detailTitle: string;
  detailContent: string;
}

export interface BannerCardProps {
  image: string;
  title: string;
  description: string;
  button: JSX.Element;
  bannerBg: bannerBg
  
}