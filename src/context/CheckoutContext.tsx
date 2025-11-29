"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AddressPayload } from "@/services/addressService";

export interface CheckoutData {
  addressId?: string;
  addressInfo?: AddressPayload;
  shippingMethod?: "free" | "express" | "schedule";
  scheduledDate?: string;
  shippingCost?: number;
  subtotal?: number;
  tax?: number;
  total?: number;
}

interface CheckoutContextType {
  checkout: CheckoutData;
  setCheckout: React.Dispatch<React.SetStateAction<CheckoutData>>;
  clearCheckout: () => void;
}

const CheckoutContext = createContext<CheckoutContextType | null>(null);

export const CheckoutProvider = ({ children }: { children: React.ReactNode }) => {
  
  const [checkout, setCheckout] = useState<CheckoutData>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("checkout");
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem("checkout", JSON.stringify(checkout));
  }, [checkout]);

  const clearCheckout = () => {
    localStorage.removeItem("checkout");
    setCheckout({});
  };

  return (
    <CheckoutContext.Provider value={{ checkout, setCheckout, clearCheckout }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const ctx = useContext(CheckoutContext);

  if (!ctx) {
    throw new Error("useCheckout must be used inside CheckoutProvider");
  }

  return ctx;
};
