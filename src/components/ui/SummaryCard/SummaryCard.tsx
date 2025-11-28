"use client";

import Image from "next/image";
import styles from "./summary.module.css";
import { raleway, nunitoSans } from "@/app/fonts/mainFonts";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { ICartItemUI } from "@/interfaces/main";
import { useCheckout } from "@/context/CheckoutContext";

const SummaryCard = () => {
  const { checkout } = useCheckout();
  const [cart, setCart] = useState<ICartItemUI[]>();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchCart = async () => {
      const res = await axios.get(`/api/cart?userId=${session.user.id}`);
      setCart(res.data);
    };

    fetchCart();
  }, [session]);

  console.log(checkout);

  return (
    <div className={styles.summary__card}>
      <h2 className={`${raleway.className} ${styles.summary__cardTitle}`}>
        Summary
      </h2>

      <div className={styles.card__itemsContainer}>
        {cart?.map((item) => (
          <div className={styles.item__card} key={item._id}>
            <div className={styles.item__cardInfo}>
              <Image
                className={styles.item__infoImage}
                src={item.productId.images[0]}
                alt="Item Image"
                width={100}
                height={100}
              />
              <h3 className={`${raleway.className} ${styles.item__infoName}`}>
                {item.productId.name}
              </h3>
            </div>

            <span className={`${nunitoSans.className} ${styles.item__price}`}>
              ${item.productId.price}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.card__address}>
        <h4 className={`${raleway.className} ${styles.card_addressTitle}`}>
          Address
        </h4>

        <p className={`${nunitoSans.className} ${styles.card__addressInfo}`}>
          {checkout.addressInfo?.street}, {checkout.addressInfo?.state},{" "}
          {checkout.addressInfo?.zip}
        </p>
      </div>

      <div className={styles.card__shipment}>
        <h4 className={`${raleway.className} ${styles.card__shipmentTitle}`}>
          Shipment mehtod
        </h4>

        <p className={`${nunitoSans.className} ${styles.card__shipmentMethod}`}>
          {checkout.shippingMethod?.charAt(0).toUpperCase() +
            checkout.shippingMethod!.slice(1)}
        </p>
      </div>

      <div className={styles.card__costs}>
        <div className={styles.card__costsSubtotal}>
          <p className={`${styles.costs__subtotalTitle} ${raleway.className}`}>
            Subtotal
          </p>
          <span
            className={`${nunitoSans.className} ${styles.costs__subtotalValue}`}
          >
            ${checkout.subtotal}
          </span>
        </div>
        <div className={styles.card__costsTax}>
          <p className={`${raleway.className} ${styles.costs__taxTitle}`}>
            Estimated Tax
          </p>
          <span className={`${nunitoSans.className} ${styles.costs__taxValue}`}>
            ${checkout.tax}
          </span>
        </div>
        <div className={styles.card__costsShipping}>
          <p className={`${raleway.className} ${styles.costs__shippingTitle}`}>
            Estimated shipping & Handling
          </p>
          <span
            className={`${nunitoSans.className} ${styles.costs__shippingValue}`}
          >
            ${checkout.shippingCost}
          </span>
        </div>
        <div className={styles.card__costsTotal}>
          <p className={`${raleway.className} ${styles.costs__totalTitle}`}>
            Total
          </p>
          <span
            className={`${nunitoSans.className} ${styles.costs__totalValue}`}
          >
            ${checkout.total}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
