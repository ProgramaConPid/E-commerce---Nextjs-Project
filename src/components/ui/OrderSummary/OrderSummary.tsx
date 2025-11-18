import React from "react";
import { OrderSummaryProps } from "@/interfaces/main";
import { raleway, nunitoSans } from "../../../app/fonts/mainFonts";
import Button from "../Button";

const OrderSummary = ({
  subtotal,
  shipping,
  tax,
  total,
  onRedirectToCheckout
}: OrderSummaryProps) => {
  return (
    <div className="oder-summary border-1 rounded-[.4rem] p-6">
      <h2
        className={`order__summary--title mb-6 font-bold ${raleway.className}`}
      >
        Order Summary
      </h2>

      <div className="order__form--group">
        <label htmlFor="discount-code">Discount code / promo code</label>
        <input
          className="p-3 border-1 border-(--grey-color) rounded-[.4rem]"
          type="text"
          placeholder="Code"
        />
      </div>

      <div className="order__form--group relative">
        <label htmlFor="bonus-number">Your bonus card number</label>
        <input
          className="p-3 border-1 border-(--grey-color) rounded-[.4rem]"
          type="text"
          placeholder="Code"
        />
        <button
          className={`apply--btn absolute top-[50%] right-3 -translate-y-[50%] px-4 py-2 bg-(--black) text-(--white) rounded-[.4rem] ${nunitoSans.className}`}
        >
          Apply
        </button>
      </div>

      <div className="order__summary--details mt-4">
        <div className="order__summary--subtotal flex justify-between mb-2">
          <span className={`font-bold ${nunitoSans.className}`}>Subtotal</span>
          <span className={`font-bold ${nunitoSans.className}`}>${subtotal.toFixed(2)}</span>
        </div>

        <div className="order__summary--tax flex justify-between mb-2">
          <span className={`${nunitoSans.className}`}>Estimated Tax</span>
          <span className={`font-bold ${nunitoSans.className}`}>${tax.toFixed(2)}</span>
        </div>

        <div className="order__summary--shipping flex justify-between mb-2">
          <span className={` ${nunitoSans.className}`}>Shipping</span>
          <span className={`font-bold ${nunitoSans.className}`}>${shipping.toFixed(2)}</span>
        </div>

        <div className="order__summary--total flex justify-between mb-5">
          <span className={`font-bold text-(--black) ${nunitoSans.className}`}>Total</span>
          <span className={`font-bold text-(--black) ${nunitoSans.className}`}>${total.toFixed(2)}</span>
        </div>
      </div>

      <Button text="Checkout" textColor="white" buttonBg="black" border="none" size="md" onClick={onRedirectToCheckout} />
    </div>
  );
};

export default OrderSummary;
