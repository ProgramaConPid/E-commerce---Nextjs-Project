"use client";

import styles from "./cart.module.css";
import { raleway } from "@/app/fonts/mainFonts";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import ShoppingItem from "@/components/ui/ShoppingItem/ShoppingItem";
import { IProduct } from "@/database/models/Products";
import OrderSummary from "@/components/ui/OrderSummary/OrderSummary";
import { toast } from "sonner";
import { ICartItemUI } from "@/interfaces/main";

export interface ICartItem {
  _id: string; 
  productId: IProduct; 
  quantity: number;
}

const CartPage = () => {
  const { data: session } = useSession();
  const [cart, setCart] = useState<ICartItemUI[]>([]);

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchCart = async () => {
      const res = await axios.get(`/api/cart?userId=${session.user.id}`);
      setCart(res.data);
    };

    fetchCart();
  }, [session]);

  const handleRemove = async (cartItemId: string) => {
    try {
      if (!session?.user?.id) return;

      const res = await axios.delete("/api/cart", {
        data: {
          userId: session.user.id,
          cartItemId,
        },
      });

      toast.success(`Product with ID ${cartItemId} removed successfully!`)

      setCart(res.data.cart);
    } catch (error) {
      console.error("Error eliminando item:", error);
    }
  };

  return (
    <div className={`container ${styles.cart__section}`}>
      <div className={styles.shopping__cartContainer}>
        <h3 className={`${styles.shopping__cartTitle} ${raleway.className}`}>
          Shopping Cart
        </h3>

        <div className={styles.shopping__cartContent}>
          <div className={styles.shopping__itemsContainer}>
            {cart.map((item, i) => (
              <ShoppingItem key={i} itemImg={item.productId.images[0]} itemName={item.productId.name} itemPrice={item.productId.price} itemQuantity={item.quantity} itemId={item._id} onRemove={() => handleRemove(item._id)} />
            ))}
          </div>

          <OrderSummary cart={cart} onRedirectToCheckout={() => {}} />
        </div>
      </div>
    </div>
  )
}

export default CartPage