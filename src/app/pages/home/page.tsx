"use client";

import styles from "@/app/pages/home/home.module.css";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { raleway, nunitoSans } from "@/app/fonts/mainFonts";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { GiSmartphone } from "react-icons/gi";
import { BsSmartwatch } from "react-icons/bs";
import { IoCameraOutline } from "react-icons/io5";
import { FiHeadphones } from "react-icons/fi";
import { RiComputerLine } from "react-icons/ri";
import { LuGamepad2 } from "react-icons/lu";
import { useEffect, useState } from "react";
import {
  getDiscountProducts,
  getFeaturedProducts,
  getNewProducts,
  getSellerProducts,
} from "@/services/products";
import ProductCard from "@/components/ui/ProductCard/ProductCard";
import { CiHeart } from "react-icons/ci";
import type { ProductCardProps } from "@/interfaces/main";
import BannerCard from "@/components/ui/BannerCard/BannerCard";

const Home = () => {
  const [activeNewProducts, setActiveNewProducts] = useState(true);
  const [activeFeaturedProducts, setActiveFeaturedProducts] = useState(false);
  const [activeSellerProducts, setActiveSellerProducts] = useState(false);

  const [newProducts, setNewProducts] = useState<ProductCardProps[]>([]);
  const [bestseller, setBestseller] = useState<ProductCardProps[]>([]);
  const [featured, setFeatured] = useState<ProductCardProps[]>([]);
  const [discount, setDiscount] = useState<ProductCardProps[]>([]);

  useEffect(() => {
    const fetchNewProducts = async () => {
      const products = await getNewProducts();
      setNewProducts(products);
    };
    fetchNewProducts();
  }, []);

  useEffect(() => {
    const fetchSellerProducts = async () => {
      const products = await getSellerProducts();
      setBestseller(products);
    };
    fetchSellerProducts();
  }, []);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      const products = await getFeaturedProducts();
      setFeatured(products);
    };
    fetchFeaturedProducts();
  }, []);

  useEffect(() => {
    const fetchDiscountProducts = async () => {
      const products = await getDiscountProducts();
      setDiscount(products);
    };
    fetchDiscountProducts();
  }, []);

  const changeFeaturedActive = () => {
    setActiveNewProducts(false);
    setActiveSellerProducts(false);
    setActiveFeaturedProducts(true);
  };

  const changeSellerActive = () => {
    setActiveFeaturedProducts(false);
    setActiveNewProducts(false);
    setActiveSellerProducts(true);
  };

  const changeNewProductsActive = () => {
    if (activeNewProducts) return;

    setActiveFeaturedProducts(false);
    setActiveSellerProducts(false);
    setActiveNewProducts(true);
  };

  const onFavoriteProduct = () => {
    console.log("Product added to favorites");
  };

  const clickProduct = () => {
    console.log("Product clicked");
  };

  return (
    <>
      <div className={styles.hero}>
        <div className={`${styles.hero__content} container`}>
          <div className={styles.hero__contentInfo}>
            <span
              className={`${styles.hero__contentSpan} ${raleway.className}`}
            >
              Pro.Beyond.
            </span>
            <h2 className={`${styles.hero__contentTitle} ${raleway.className}`}>
              Iphone 14
              <span className={styles.hero__contentTitleSpan}> Pro</span>
            </h2>
            <p
              className={`${styles.hero__contentDescription} ${nunitoSans.className}`}
            >
              Created to change everything for the better. For everyone
            </p>
            <Button
              text={"Shop Now"}
              buttonBg={"transparent"}
              textColor={"white"}
              border={"white"}
              size={"lg"}
            />
          </div>
          <Image
            className={styles.hero__image}
            src={"/images/iphone-image.png"}
            alt="Iphone Image"
            height={300}
            width={300}
          />
        </div>
      </div>

      <div className={styles.grid__hero}>
        <div
          className={`${styles.grid__heroContent} ${styles.grid__playstation}`}
        >
          <Image
            className={styles.grid__playstationImage}
            src={"/images/PlayStation-image.png"}
            alt="PlayStation Image"
            height={100}
            width={300}
          />
          <div
            className={`${styles.grid__playstationTexts} ${styles.grid__texts}`}
          >
            <h3
              className={`${styles.grid__playstationTitle} ${raleway.className}`}
            >
              Playstation 5
            </h3>
            <p
              className={`${styles.grid__playstationDescription} ${styles.grid__textsDescription} ${nunitoSans.className}`}
            >
              Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O
              will redefine your PlayStation experience.
            </p>
          </div>
        </div>
        <div className={`${styles.grid__heroContent} ${styles.grid__airpods}`}>
          <Image
            className={styles.grid__airpodsImage}
            src={"/images/headphones-image.png"}
            alt="Headphones Image"
            width={100}
            height={100}
          />
          <div className={`${styles.grid__airpodsTexts} ${styles.grid__texts}`}>
            <h3 className={`${styles.grid__airpodsTitle} ${raleway.className}`}>
              Apple AirPods <span>Max</span>
            </h3>
            <p
              className={`${styles.grid__headphonesDescription} ${styles.grid__textsDescription} ${nunitoSans.className}`}
            >
              Computational audio. Listen, it&apos;s powerful
            </p>
          </div>
        </div>
        <div
          className={`${styles.grid__heroContent} ${styles.grid__applevision}`}
        >
          <Image
            className={styles.grid__applevisionImage}
            src={"/images/virtual-reality-glasses-image.png"}
            alt="Virtual Reality Glasses Image"
            width={300}
            height={100}
          />
          <div
            className={`${styles.grid__applevisionTexts} ${styles.grid__texts}`}
          >
            <h3
              className={`${styles.grid__applevisionTitle} ${raleway.className}`}
            >
              Apple Vision <span>Pro</span>
            </h3>
            <p
              className={`${styles.grid__applevisionDescription} ${styles.grid__textsDescription} ${nunitoSans.className}`}
            >
              An immersive way to experience entertainment
            </p>
          </div>
        </div>
        <div className={`${styles.grid__heroContent} ${styles.grid__macbook}`}>
          <div className={`${styles.grid__macbookTexts} ${styles.grid__texts}`}>
            <h3 className={`${styles.grid__macbookTitle} ${raleway.className}`}>
              Macbook <span>Air</span>
            </h3>
            <p
              className={`${styles.grid__macbookDescription} ${styles.grid__textsDescription} ${nunitoSans.className}`}
            >
              The new 15‑inch MacBook Air makes room for more of what you love
              with a spacious Liquid Retina display.
            </p>
            <Button
              text={"Shop Now"}
              textColor={"black"}
              buttonBg={"transparent"}
              size={"lg"}
              border={"black"}
            />
          </div>
          <Image
            className={styles.grid__macbookImage}
            src={"/images/MacBookPro14-image.png"}
            alt="Macbook Image"
            width={300}
            height={100}
          />
        </div>
      </div>

      <div className={styles.browse__products}>
        <div className={`container ${styles.browse__productsContainer}`}>
          <div className={styles.browse__productsHeader}>
            <h3
              className={`${styles.browse__productsTitle} ${raleway.className}`}
            >
              Browse By Category
            </h3>

            <div className={styles.browse__productsArrows}>
              <MdOutlineArrowBackIos />
              <MdOutlineArrowForwardIos />
            </div>
          </div>

          <div className={styles.browse__productsItems}>
            <div className={styles.browse__productsItem}>
              <GiSmartphone />
              <h3
                className={`${styles.products__itemText} ${nunitoSans.className}`}
              >
                Phones
              </h3>
            </div>
            <div className={styles.browse__productsItem}>
              <BsSmartwatch />
              <h3
                className={`${styles.products__itemText} ${nunitoSans.className}`}
              >
                Smart Watches
              </h3>
            </div>
            <div className={styles.browse__productsItem}>
              <IoCameraOutline />
              <h3
                className={`${styles.products__itemText} ${nunitoSans.className}`}
              >
                Cameras
              </h3>
            </div>
            <div className={styles.browse__productsItem}>
              <FiHeadphones />
              <h3
                className={`${styles.products__itemText} ${nunitoSans.className}`}
              >
                Headphones
              </h3>
            </div>
            <div className={styles.browse__productsItem}>
              <RiComputerLine />
              <h3
                className={`${styles.products__itemText} ${nunitoSans.className}`}
              >
                Computers
              </h3>
            </div>
            <div className={styles.browse__productsItem}>
              <LuGamepad2 />
              <h3
                className={`${styles.products__itemText} ${nunitoSans.className}`}
              >
                Gaming
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className={`container ${styles.products__section}`}>
        <div className={styles.products__tags}>
          <h3
            className={`${raleway.className} ${styles.products__tagsText} ${
              activeNewProducts ? styles.active : ""
            }`}
            onClick={changeNewProductsActive}
          >
            New Arrival
          </h3>
          <h3
            className={`${raleway.className} ${styles.products__tagsText} ${
              activeSellerProducts ? styles.active : ""
            }`}
            onClick={changeSellerActive}
          >
            Bestseller
          </h3>
          <h3
            className={`${raleway.className} ${styles.products__tagsText} ${
              activeFeaturedProducts ? styles.active : ""
            }`}
            onClick={changeFeaturedActive}
          >
            Featured Products
          </h3>
        </div>

        <div className={styles.container__products}>
          {activeNewProducts &&
          Array.isArray(newProducts) &&
          newProducts.length > 0
            ? newProducts.map((product, i) => (
                <ProductCard
                  key={product._id || i}
                  _id={product._id}
                  name={product.name}
                  images={product.images?.[0] || "/images/default.png"}
                  price={product.price}
                  heartIcon={<CiHeart />}
                  button={
                    <Button
                      text="Buy Now"
                      textColor="white"
                      buttonBg="black"
                      size="md"
                      border="none"
                    />
                  }
                  onFavorite={onFavoriteProduct}
                  onClick={clickProduct}
                />
              ))
            : activeNewProducts && <p>No products found</p>}

          {activeSellerProducts &&
          Array.isArray(bestseller) &&
          bestseller.length > 0
            ? bestseller.map((product, i) => (
                <ProductCard
                  key={product._id || i}
                  _id={product._id}
                  name={product.name}
                  images={product.images?.[0] || "/images/default.png"}
                  price={product.price}
                  heartIcon={<CiHeart />}
                  button={
                    <Button
                      text="Buy Now"
                      textColor="white"
                      buttonBg="black"
                      size="md"
                      border="none"
                    />
                  }
                  onFavorite={onFavoriteProduct}
                  onClick={clickProduct}
                />
              ))
            : activeSellerProducts && <p>No products found</p>}

          {activeFeaturedProducts &&
          Array.isArray(featured) &&
          featured.length > 0
            ? featured.map((product, i) => (
                <ProductCard
                  key={product._id || i}
                  _id={product._id}
                  name={product.name}
                  images={product.images?.[0] || "/images/default.png"}
                  price={product.price}
                  heartIcon={<CiHeart />}
                  button={
                    <Button
                      text="Buy Now"
                      textColor="white"
                      buttonBg="black"
                      size="md"
                      border="none"
                    />
                  }
                  onFavorite={onFavoriteProduct}
                  onClick={clickProduct}
                />
              ))
            : activeFeaturedProducts && <p>No products found</p>}
        </div>
      </div>

      <div className={styles.banners__cards}>
        <BannerCard
          image="/images/banners/popular-products.png"
          title="Popular Products"
          description="iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use."
          button={<Button text="Shop Now" textColor="black" buttonBg="transparent" border="black" size="lg" />}
          bannerBg="white"
        />
        <BannerCard
          image="/images/banners/ipad-pro.png"
          title="Ipad Pro"
          description="iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use."
          button={<Button text="Shop Now" textColor="black" buttonBg="transparent" border="black" size="lg" />}
          bannerBg="smooth-grey"
        />
        <BannerCard
          description="iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use."
          image="/images/banners/samsung-galaxy.png"
          title="Samsung Galaxy"
          button={<Button text="Shop Now" textColor="black" buttonBg="transparent" border="black" size="lg" />}
          bannerBg="medium-grey"
        />
        <BannerCard
          image="/images/banners/macbook-pro.png"
          title="Macbook Pro"
          description="iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use."
          button={<Button text="Shop Now" textColor="white" buttonBg="transparent" border="white" size="lg" />}
          bannerBg="bold-grey"
        />
      </div>


      <div className={`container ${styles.products__sectionDiscount}`}>
        <h3 className={`${raleway.className} ${styles.products__sectionDiscountTitle}`}>
          Discounts up to 50%
        </h3>

        <div className={styles.container__productsDiscount}>
          {discount && discount.length > 0 ? (
            discount.map((product, i) => (
              <ProductCard
                  key={product._id || i}
                  _id={product._id}
                  name={product.name}
                  images={product.images?.[0] || "/images/default.png"}
                  price={product.price}
                  heartIcon={<CiHeart />}
                  button={
                    <Button
                      text="Buy Now"
                      textColor="white"
                      buttonBg="black"
                      size="md"
                      border="none"
                    />
                  }
                  onFavorite={onFavoriteProduct}
                  onClick={clickProduct}
                />
            ))
          ) : (
            <span>Not discount products found</span>
          )}
        </div>
      </div>

      <div className={styles.banner__summerSection}>
        <div className={styles.banner__summerTexts}>
          <h2 className={`${raleway.className} ${styles.banner__textsTitle}`}>
            Big Summer <span>Sale</span>
          </h2>
          <p className={`${nunitoSans.className} ${styles.banner__textsDescription}`}>
            Commodo fames vitae vitae leo mauris in. Eu consequat.
          </p>
          <Button text="Shop Now" border="white" buttonBg="transparent" size="md" textColor="white" />
        </div>
      </div>
    </>
  );
};

export default Home;
