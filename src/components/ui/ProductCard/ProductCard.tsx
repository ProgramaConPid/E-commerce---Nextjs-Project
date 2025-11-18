"use client";

import Image from "next/image";
import { ProductCardProps } from "@/interfaces/main";
import styles from "@/components/ui/ProductCard/product.module.css";
import { nunitoSans, raleway } from "@/app/fonts/mainFonts";
import { CiHeart } from "react-icons/ci";
import Button from "../Button";

const ProductCard = ({ _id, images, name, price }: ProductCardProps) => {
  const handleFavorite = () => {
    console.log("Product added to favorites:", _id);
  };

  const handleClickProduct = () => {
    console.log("Product clicked:", _id);
  };

  return (
    <div
      id={_id}
      onClick={handleClickProduct}
      className={styles.product__card}
      role="button"
      tabIndex={0}
    >
      <div
        className={styles.heartIcon__container}
        onClick={handleFavorite}
        aria-label="Add to Favorites"
      >
        <CiHeart />
      </div>

      <Image
        src={images}
        alt={name}
        width={250}
        height={250}
        className={styles.product__image}
      />

      <h3 className={`${styles.product__cardTitle} ${raleway.className}`}>
        {name}
      </h3>

      <span className={`${styles.product__cardPrice} ${nunitoSans.className}`}>
        ${price}
      </span>

      <Button
        text="Buy Now"
        textColor="white"
        buttonBg="black"
        size="md"
        border="none"
        onClick={handleClickProduct}
      />
    </div>
  );
};

export default ProductCard;
