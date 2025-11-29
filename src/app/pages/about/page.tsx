"use client";

import styles from "./about.module.css";
import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <div>
      {/* HERO */}
      <motion.section
        className={styles.hero}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className={`${styles.container} ${styles.hero__content}`}>
          <motion.div
            className={styles.hero__textBox}
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.span
              className={styles.hero__contentSpan}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              About Us
            </motion.span>

            <motion.h1
              className={styles.hero__contentTitle}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8 }}
            >
              A Legacy of{" "}
              <span className={styles.hero__contentTitleSpan}>Innovation</span>{" "}
              in E-Commerce
            </motion.h1>

            <motion.p
              className={styles.hero__contentDescription}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              With more than 20 years providing top-tier technology, premium
              products, and worldwide shipping, we continue to lead the digital
              marketplace with passion and dedication.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* STORY */}
      <motion.section
        className={styles.products__section}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className={styles.container}>
          <motion.h2
            className={styles.products__sectionDiscountTitle}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            Our Story
          </motion.h2>

          <motion.p
            className={styles.storyText}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            Founded in Colombia by <strong>Felipe Marin</strong>, our company
            began as a small tech-focused store committed to delivering reliable
            electronics to local communities. Over the past two decades, we have
            evolved into one of the most trusted e-commerce platforms, serving
            thousands of customers around the world.
          </motion.p>

          <motion.p
            className={styles.storyText}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            What sets us apart is our passion for quality, innovation, and
            customer satisfaction. Today, we proudly offer a massive catalog of
            technology, accessories, lifestyle products, and premium brands —
            with fast and secure international shipping.
          </motion.p>
        </div>
      </motion.section>

      {/* WHY CHOOSE US */}
      <motion.section
        className={styles.browse__products}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div
          className={`${styles.container} ${styles.browse__productsContainer}`}
        >
          <motion.div
            className={styles.browse__productsHeader}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className={styles.browse__productsTitle}>
              Why Customers Choose Us
            </h2>
          </motion.div>

          <div className={styles.browse__productsItems}>
            {[
              "Worldwide Shipping",
              "Wide Variety of Products",
              "20+ Years of Experience",
              "Exceptional Customer Support",
            ].map((item, i) => (
              <motion.div
                key={i}
                className={styles.browse__productsItem}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                whileHover={{ scale: 1.06 }}
                viewport={{ once: true }}
              >
                <h3>{item}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* BANNER */}
      <motion.section
        className={styles.banner__summerSection}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <motion.div
          className={styles.banner__summerTexts}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className={styles.banner__textsTitle}>
            Made in Colombia, Ready for the World
          </h2>
          <p className={styles.banner__textsDescription}>
            Proud to share quality, innovation, and tradition globally.
          </p>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default AboutPage;
