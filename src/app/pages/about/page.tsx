import styles from "./about.module.css";

const AboutPage = () => {
  return (
    <div>
      <section className={styles.hero}>
        <div className={`${styles.container} ${styles.hero__content}`}>
          <div className={styles.hero__textBox}>
            <span className={styles.hero__contentSpan}>About Us</span>
            <h1 className={styles.hero__contentTitle}>
              A Legacy of{" "}
              <span className={styles.hero__contentTitleSpan}>Innovation</span>{" "}
              in E-Commerce
            </h1>

            <p className={styles.hero__contentDescription}>
              With more than 20 years providing top-tier technology, premium
              products, and worldwide shipping, we continue to lead the digital
              marketplace with passion and dedication.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.products__section}>
        <div className={styles.container}>
          <h2 className={styles.products__sectionDiscountTitle}>Our Story</h2>

          <p className={styles.storyText}>
            Founded in Colombia by <strong>Felipe Marin</strong>, our company
            began as a small tech-focused store committed to delivering reliable
            electronics to local communities. Over the past two decades, we have
            evolved into one of the most trusted e-commerce platforms, serving
            thousands of customers around the world.
          </p>

          <p className={styles.storyText}>
            What sets us apart is our passion for quality, innovation, and
            customer satisfaction. Today, we proudly offer a massive catalog of
            technology, accessories, lifestyle products, and premium brands —
            with fast and secure international shipping.
          </p>
        </div>
      </section>

      <section className={styles.browse__products}>
        <div
          className={`${styles.container} ${styles.browse__productsContainer}`}
        >
          <div className={styles.browse__productsHeader}>
            <h2 className={styles.browse__productsTitle}>
              Why Customers Choose Us
            </h2>
          </div>

          <div className={styles.browse__productsItems}>
            <div className={styles.browse__productsItem}>
              <i className="ri-global-line"></i>
              <h3>Worldwide Shipping</h3>
            </div>

            <div className={styles.browse__productsItem}>
              <i className="ri-shopping-bag-3-line"></i>
              <h3>Wide Variety of Products</h3>
            </div>

            <div className={styles.browse__productsItem}>
              <i className="ri-award-line"></i>
              <h3>20+ Years of Experience</h3>
            </div>

            <div className={styles.browse__productsItem}>
              <i className="ri-customer-service-2-line"></i>
              <h3>Exceptional Customer Support</h3>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.banner__summerSection}>
        <div className={styles.banner__summerTexts}>
          <h2 className={styles.banner__textsTitle}>
            Made in Colombia, Ready for the World
          </h2>
          <p className={styles.banner__textsDescription}>
            Proud to share quality, innovation, and tradition globally.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
