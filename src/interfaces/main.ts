import type { JSX } from "react";
import { bannerBg, ButtonBorder, ButtonSize, TextColor } from '@/types/types';
import { IProduct } from "@/database/models/Products";

type ButtonBg = "black" | "transparent";

export interface ButtonProps {
  text: string;
  type?: "button" | "submit";
  textColor: TextColor;
  rightIcon?: JSX.Element;
  buttonBg: ButtonBg;
  size: ButtonSize;
  border: ButtonBorder;
  onClick?: () => void;
}

export interface ProductCardProps {
  _id: string;
  images: string;
  name: string;
  price: number;
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

export interface CommentProps {
  userImg: string;
  username: string;
  rating: 1 | 2 | 3 | 4 | 5;
  commentText: string;
  productImgs?: string[];
}

export interface OverallRatingProps {
  ratings: {
    [key: number]: number;
  };
  totalReviews: number;
}

export interface ShoppingItemProps {
  itemImg: string;
  itemId: string;
  itemName: string;
  itemPrice: number;
  itemQuantity: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onRemove?: () => void;
}


export interface OrderSummaryProps {
  cart: ICartItemUI[];
  onRedirectToCheckout: () => void;
}

export interface ICartItemUI {
  _id: string;        
  productId: IProduct; 
  quantity: number;
}


export interface IBlog {
  image: string;
  type: string;
  title: string;
  description: string;
}