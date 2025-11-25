"use client";

import Image from "next/image";
import { ProductCardProps } from "@/interfaces/main";
import styles from "@/components/ui/ProductCard/product.module.css";
import { nunitoSans, raleway } from "@/app/fonts/mainFonts";
import { CiHeart } from "react-icons/ci";
import Button from "../Button";
import { useSession } from "next-auth/react";
import { addToCart } from "@/services/cartService"; 
import { toast } from "sonner";

const ProductCard = ({ _id, images, name, price }: ProductCardProps) => {
  const { data: session } = useSession();

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Product added to favorites:", _id);
  };

  const handleClickProduct = () => {
    console.log("Product clicked:", _id);
  };

  const handleAddToCart = async () => {
    try {
      if (!session?.user?.id) {
        console.log("Usuario no autenticado");
        return;
      }

      const userId = session.user.id;

      const response = await addToCart({
        userId,
        productId: _id,
        quantity: 1,
      });

      toast.success("Product added to the cart successfully!.")
      console.log("Producto agregado:", response  );
    } catch (error) {
      console.error("Error agregando al carrito:", error);
    }
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
        onClick={handleAddToCart} // 👈 aquí va
      />
    </div>
  );
};

export default ProductCard;
