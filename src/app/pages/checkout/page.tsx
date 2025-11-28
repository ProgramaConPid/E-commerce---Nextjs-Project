"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { raleway, nunitoSans } from "@/app/fonts/mainFonts";
import styles from "./checkout.module.css";
import StepItem from "@/components/ui/StepItem";
import { IoLocationSharp } from "react-icons/io5";
import { PiShippingContainerBold } from "react-icons/pi";
import { RiCashFill } from "react-icons/ri";
import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import AddressModal from "@/components/layout/AddressModal/AddressModal";
import ShipmentMethod from "@/components/ui/ShipmentMethod";
import { RadioGroup } from "@heroui/radio";
import { getAddresses } from "@/services/addressService";
import { AddressPayload } from "@/services/addressService";
import { useSession } from "next-auth/react";
import AddressCard from "@/components/ui/AddressCard";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import SummaryCard from "@/components/ui/SummaryCard/SummaryCard";

const CheckoutPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [addresses, setAddresses] = useState<AddressPayload[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const { data: session } = useSession();
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [activeCreditCard, setActiveCreditCard] = useState(true);
  const [activePaypal, setActivePaypal] = useState(false);
  const [activePaypalCredit, setActivePaypalCredit] = useState(false);
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";

  const handlePaymentMethod = (method: "card" | "paypal" | "paypalCredit") => {
    setActiveCreditCard(method === "card");
    setActivePaypal(method === "paypal");
    setActivePaypalCredit(method === "paypalCredit");
  };

  const router = useRouter();
  const { checkout, setCheckout } = useCheckout();

  useEffect(() => {
    if (!session?.user?.id || activeStep !== 1) return;

    const fetchAddresses = async () => {
      try {
        setLoadingAddresses(true);
        const data = await getAddresses(session.user.id);
        setAddresses(data);
      } catch (error) {
        console.error("Error loading addresses:", error);
      } finally {
        setLoadingAddresses(false);
      }
    };

    fetchAddresses();
  }, [session, activeStep]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getFutureDate = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return formatDate(d);
  };

  const scheduledDates = [5, 7, 10, 15].map((days) => getFutureDate(days));

  const [selectedShipment, setSelectedShipment] = useState<
    "free" | "express" | "schedule"
  >("free");

  const handleNext = () => {
    if (activeStep === 1) {
      const selected = addresses.find((addr) => addr._id === selectedAddress);

      if (!selected) {
        toast.error("Address not found.");
        return;
      }

      setCheckout((prev) => ({
        ...prev,
        addressId: selected._id,
        addressInfo: selected,
      }));

      setActiveStep(2);
    }

    if (activeStep === 2) {
      setCheckout((prev) => ({
        ...prev,
        shippingMethod: selectedShipment,
      }));

      setActiveStep(3);
      return;
    }
  };

  const handleBack = () => {
    if (activeStep === 1) {
      router.back();
    }

    if (activeStep === 2) {
      setActiveStep(1);
    }

    if (activeStep === 3) {
      setActiveStep(2);
    }
  };

  return (
    <div className={`container ${styles.checkout__section}`}>
      <div className={styles.checkout__steps}>
        <StepItem
          icon={<IoLocationSharp />}
          title="Step 1"
          description="Address"
          isActive={activeStep === 1}
          onClick={() => setActiveStep(1)}
        />
        <StepItem
          icon={<PiShippingContainerBold />}
          title="Step 2"
          description="Shipping"
          isActive={activeStep === 2}
          onClick={() => setActiveStep(2)}
        />
        <StepItem
          icon={<RiCashFill />}
          title="Step 3"
          description="Payment"
          isActive={activeStep === 3}
          onClick={() => setActiveStep(3)}
        />
      </div>

      <div className={styles.checkout__content}>
        {activeStep === 1 && (
          <div className={styles.checkout__contentAddress}>
            <h2 className={`${raleway.className} ${styles.address__title}`}>
              Select Address
            </h2>

            <div className={styles.addresses__container}>
              <RadioGroup
                value={selectedAddress}
                onValueChange={setSelectedAddress}
              >
                {loadingAddresses && (
                  <p className={nunitoSans.className}>Loading addresses...</p>
                )}

                {!loadingAddresses && addresses.length === 0 && (
                  <p className={nunitoSans.className}>No addresses found</p>
                )}

                {!loadingAddresses &&
                  addresses.map((address) => (
                    <AddressCard
                      key={address._id}
                      value={address._id}
                      isSelected={selectedAddress === address._id}
                      city={address.city}
                      country={address.country}
                      place={address.place}
                      state={address.state}
                      street={address.street}
                      zip={address.zip}
                      phone={address.phone}
                    />
                  ))}

                <Image
                  onClick={() => setIsModalOpen(true)}
                  className={styles.address__addAddress}
                  src={"/images/add-new-address-button.png"}
                  alt="Add New Address Button"
                  width={1000}
                  height={100}
                />
              </RadioGroup>
            </div>

            <div className={styles.addresses__buttons}>
              <Button
                text="Back"
                border="black"
                buttonBg="transparent"
                size="lg"
                textColor="black"
                onClick={handleBack}
              />
              <Button
                text="Next"
                border="black"
                buttonBg="black"
                size="lg"
                textColor="white"
                onClick={handleNext}
              />
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div className={styles.checkout__contentShipping}>
            <h2 className={`${raleway.className} ${styles.shipping__title}`}>
              Shipment Method
            </h2>

            <div className={styles.shipping__container}>
              <RadioGroup
                value={selectedShipment}
                onValueChange={(value) =>
                  setSelectedShipment(value as "free" | "express" | "schedule")
                }
              >
                <ShipmentMethod
                  value="free"
                  cost="Free"
                  description="Regularly Shipment"
                  date={getFutureDate(10)}
                />
                <ShipmentMethod
                  value="express"
                  cost="$8.50"
                  description="Get your delivery as soon as possible"
                  date={getFutureDate(20)}
                />
                <ShipmentMethod
                  value="schedule"
                  cost="Schedule"
                  description="Pick a date when you want to get your delivery"
                  date={
                    <select>
                      {scheduledDates.map((d, i) => (
                        <option key={i} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  }
                />
              </RadioGroup>
            </div>

            <div className={styles.addresses__buttons}>
              <Button
                text="Back"
                border="black"
                buttonBg="transparent"
                size="lg"
                textColor="black"
                onClick={handleBack}
              />
              <Button
                text="Next"
                border="black"
                buttonBg="black"
                size="lg"
                textColor="white"
                onClick={handleNext}
              />
            </div>
          </div>
        )}

        {activeStep === 3 && (
          <div className={styles.checkout__contentPayment}>
            <SummaryCard />

            <div className={styles.payment__methods}>
              <h2
                className={`${raleway.className} ${styles.payment__methodsTitle}`}
              >
                Payment
              </h2>

              <div className={styles.available__methods}>
                <h3
                  onClick={() => handlePaymentMethod("card")}
                  className={`${raleway.className} ${
                    styles.available__methodstTitle
                  } ${activeCreditCard ? styles.active : styles.notActive}`}
                >
                  Credit Card
                </h3>
                <h3
                  onClick={() => handlePaymentMethod("paypal")}
                  className={`${raleway.className} ${
                    styles.available__methodstTitle
                  } ${activePaypal ? styles.active : styles.notActive}`}
                >
                  PayPal
                </h3>
                <h3
                  onClick={() => handlePaymentMethod("paypalCredit")}
                  className={`${raleway.className} ${
                    styles.available__methodstTitle
                  } ${activePaypalCredit ? styles.active : styles.notActive}`}
                >
                  PayPal Credit
                </h3>
              </div>

              {activeCreditCard && (
                <div className={styles.credit__cardMethod}>
                  <Image
                    className={styles.credit__cardImg}
                    src={"/images/credit-card.png"}
                    alt="Credit Card Image"
                    height={200}
                    width={350}
                  />

                  <form className={styles.credit__cardForm}>
                    <input
                      className={styles.input__creditCard}
                      type="text"
                      placeholder="Cardholder Name"
                      name="cardholder"
                    />
                    <input
                      className={styles.input__creditCard}
                      type="text"
                      placeholder="Card Number"
                      name="number"
                      maxLength={16}
                    />
                    <div className={styles.form__group}>
                      <input
                        className={styles.input__creditCard}
                        type="text"
                        placeholder="Exp. Date"
                        name="date"
                      />
                      <input
                        className={styles.input__creditCard}
                        type="number"
                        name="cvv"
                        placeholder="CVV"
                      />
                    </div>

                    <div className={styles.input__checkboxContainer}>
                      <input type="checkbox" name="billing" />
                      <label
                        className={`${nunitoSans.className} ${styles.label}`}
                        htmlFor="billing"
                      >
                        Same as billing address
                      </label>
                    </div>

                    <div className={styles.form__actions}>
                      <Button
                        type="button"
                        text="Back"
                        buttonBg="transparent"
                        textColor="black"
                        border="black"
                        size="md"
                        onClick={handleBack}
                      />
                      <Button
                        type="submit"
                        text="Pay"
                        buttonBg="black"
                        textColor="white"
                        border="black"
                        size="md"
                      />
                    </div>
                  </form>
                </div>
              )}

              <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID }}>
                {activePaypal && (
                  <div className={styles.paypal__method}>
                    <Image
                      src="/images/paypal-logo.png"
                      alt="PayPal"
                      width={300}
                      height={150}
                      className={styles.paypal__logo}
                    />

                    <p
                      className={`${nunitoSans.className} ${styles.paypal__text}`}
                    >
                      You will be redirected to PayPal to securely complete your
                      payment.
                    </p>

                    <div className={styles.paypal__summary}>
                      <p>
                        <strong>Total:</strong> ${checkout.total?.toFixed(2)}
                      </p>
                      <p>
                        <strong>Shipping:</strong> {checkout.shippingMethod}
                      </p>
                      <p>
                        <strong>Address:</strong> {checkout.addressInfo?.street}
                        , {checkout.addressInfo?.city}
                      </p>
                    </div>

                    <div className={styles.paypal__actions}>
                      <Button
                        text="Back"
                        buttonBg="transparent"
                        textColor="black"
                        border="black"
                        size="md"
                        onClick={handleBack}
                      />
                      <PayPalButtons
                        createOrder={async () => {
                          try {
                            if (!checkout.total || checkout.total <= 0) {
                              throw new Error("Invalid total");
                            }

                            const res = await fetch(
                              "/api/paypal/create-order",
                              {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  total: checkout.total,
                                }),
                              }
                            );

                            if (!res.ok) {
                              const err = await res.json();
                              throw new Error(
                                err.error || "Failed to create PayPal order"
                              );
                            }

                            const data = await res.json();

                            console.log("✅ CREATE ORDER RESPONSE:", data);

                            if (!data.id) {
                              throw new Error("PayPal did not return order ID");
                            }

                            return data.id; // ✅ PayPal usa este ID internamente
                          } catch (error) {
                            console.error("❌ CREATE ORDER ERROR:", error);
                            alert(
                              "There was a problem creating the PayPal order."
                            );
                            throw error;
                          }
                        }}
                        onApprove={async (data) => {
                          try {
                            console.log("✅ ON APPROVE DATA:", data);

                            if (!data.orderID) {
                              throw new Error("Missing orderID from PayPal");
                            }

                            const res = await fetch(
                              "/api/paypal/capture-order",
                              {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  orderId: data.orderID,
                                }),
                              }
                            );

                            const result = await res.json();

                            console.log("✅ CAPTURE RESPONSE:", result);

                            if (!res.ok || result.status !== "COMPLETED") {
                              throw new Error(
                                result?.error || "Payment was not completed"
                              );
                            }

                            // ✅ PAGO CONFIRMADO
                            alert("✅ Payment successful!");

                            // 🟢 Aquí ya puedes:
                            // - limpiar carrito
                            // - guardar orden en DB
                            // - redirigir a success page
                            // router.push("/checkout/success")
                          } catch (error) {
                            console.error("❌ CAPTURE ERROR:", error);
                            alert("❌ Payment could not be completed.");
                          }
                        }}
                        onError={(err) => {
                          console.error("❌ PAYPAL ERROR:", err);
                          alert("❌ PayPal communication error.");
                        }}
                        onCancel={() => {
                          console.warn("⚠️ Payment cancelled by user");
                          alert("Payment cancelled.");
                        }}
                        style={{
                          layout: "horizontal",
                          label: "pay",
                          color: "gold",
                        }}
                      />
                    </div>
                  </div>
                )}
              </PayPalScriptProvider>

              {activePaypalCredit && (
                <div className={styles.paypalCredit__method}>
                  <h3 className={raleway.className}>PayPal Credit</h3>

                  <Image
                    src={"/images/paypal-credit-logo.jpg"}
                    alt="Paypal Credit Banner"
                    height={150}
                    width={300}
                    className={styles.paypal__creditLogo}
                  />

                  <p className={`${nunitoSans.className}`}>
                    Buy now and pay later with PayPal Credit.
                  </p>

                  <div className={styles.paypal__summary}>
                    <p>Total: ${checkout.total?.toFixed(2)}</p>
                  </div>

                  <div className={styles.form__actions}>
                    <Button
                      text="Back"
                      buttonBg="transparent"
                      textColor="black"
                      border="black"
                      size="md"
                      onClick={handleBack}
                    />
                    <Button
                      text="Continue with PayPal Credit"
                      buttonBg="black"
                      textColor="white"
                      border="none"
                      size="md"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        <AddressModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default CheckoutPage;
