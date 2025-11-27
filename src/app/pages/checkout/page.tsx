"use client";

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

const CheckoutPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [addresses, setAddresses] = useState<AddressPayload[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const { data: session } = useSession();
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const router = useRouter();

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

  const [selectedShipment, setSelectedShipment] = useState("free");

  const handleNext = () => {
    if (activeStep === 1) {
      if (!selectedAddress) {
        toast.error("Please select an address to continue.")
        return;
      }

      setActiveStep(2);
    }
  }

  const handleBack = () => {
    if (activeStep === 1) {
      router.back();
    }

    if (activeStep === 2) {
      setActiveStep(1)
    }

    if (activeStep === 3) {
      setActiveStep(2)
    }
  }

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
                onValueChange={setSelectedShipment}
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
              />
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
