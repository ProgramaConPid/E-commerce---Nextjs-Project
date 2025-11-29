import axios from "axios";

interface CartProps {
  userId: string;
  productId: string;
  quantity: number;
}

export const addToCart = async({userId, productId, quantity}:CartProps) => {
  try {
    const res = await axios.post("/api/cart", {
      userId,
      productId,
      quantity
    })

    return await res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch(e: any) { 
    console.error("Cart service error", e)
    throw e;  
  }
} 