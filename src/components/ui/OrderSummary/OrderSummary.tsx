import { OrderSummaryProps } from "@/interfaces/main";
import { raleway, nunitoSans } from "../../../app/fonts/mainFonts";
import Button from "../Button";
import { useCheckout } from "@/context/CheckoutContext";

const OrderSummary = ({ cart, onRedirectToCheckout }: OrderSummaryProps) => {
  const { checkout, setCheckout } = useCheckout();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );

  const tax = subtotal * 0.1;

  const shipping = subtotal > 200 ? 0 : 15;

  const total = subtotal + tax + shipping;

  return (
    <div className="oder-summary border-1 rounded-[.4rem] p-10">
      <h2
        className={`order__summary--title text-[1.5rem] mb-6 font-bold ${raleway.className}`}
      >
        Order Summary
      </h2>

      <div className="order__form--group flex flex-col gap-2 mb-4">
        <label htmlFor="discount-code">Discount code / promo code</label>
        <input
          className="p-4 border-1 border-(--grey-color) rounded-[.4rem]"
          type="text"
          placeholder="Code"
        />
      </div>

      <div className="order__form--group flex flex-col gap-2 relative">
        <label htmlFor="bonus-number">Your bonus card number</label>
        <input
          className="p-4 border-1 border-(--grey-color) rounded-[.4rem]"
          type="text"
          placeholder="Code"
          maxLength={25}
        />
        <button
          className={`apply--btn absolute right-2 top-10 px-4 py-2 bg-(--black) text-(--white) rounded-[.4rem] ${nunitoSans.className}`}
        >
          Apply
        </button>
      </div>

      <div className="order__summary--details mt-4 grid gap-4">
        <div className="order__summary--subtotal flex justify-between mb-2">
          <span className={`font-bold ${nunitoSans.className}`}>Subtotal</span>
          <span className={`font-bold ${nunitoSans.className}`}>
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <div className="order__summary--tax flex justify-between mb-2">
          <span className={`${nunitoSans.className}`}>Estimated Tax</span>
          <span className={`font-bold ${nunitoSans.className}`}>
            ${tax.toFixed(2)}
          </span>
        </div>

        <div className="order__summary--shipping flex justify-between mb-2">
          <span className={` ${nunitoSans.className}`}>Shipping</span>
          <span className={`font-bold ${nunitoSans.className}`}>
            ${shipping.toFixed(2)}
          </span>
        </div>

        <div className="order__summary--total flex justify-between mb-5">
          <span className={`font-bold text-(--black) ${nunitoSans.className}`}>
            Total
          </span>
          <span className={`font-bold text-(--black) ${nunitoSans.className}`}>
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      <Button
        text={cart.length === 0 ? "Not Allowed" : "Checkout"}
        textColor="white"
        buttonBg="black"
        border="none"
        size="md"
        onClick={() => {
          setCheckout((prev) => ({
            ...prev,
            subtotal,
            tax,
            shippingCost: shipping,
            total,
          }));

          onRedirectToCheckout();
        }}
      />
    </div>
  );
};

export default OrderSummary;
