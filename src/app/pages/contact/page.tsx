import ContactForm from "@/components/layout/ContactForm";
import styles from "./contact.module.css";
import { raleway, nunitoSans } from "@/app/fonts/mainFonts";
import { IoMailOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { MdOutlineLocationOn } from "react-icons/md";
import { VscPackage } from "react-icons/vsc";
import { TfiReload } from "react-icons/tfi";
import { LuBriefcaseBusiness } from "react-icons/lu";

const ContactPage = () => {
  return (
    <div className={`container ${styles.contact__section}`}>
      <h2 className={`${raleway.className} ${styles.contact__sectionTitle}`}>
        Contact Us
      </h2>

      <p className={`${nunitoSans.className} ${styles.contact__sectionDescription}`}>
        Have a question or want to collaborate? We&apos;re here to help.
      </p>

      <div className={styles.contact__sectionContent}>
        <ContactForm />

        <div className={styles.contact__contentInfo}>
          <div className={styles.content__infoBox}>
            <h3 className={styles.content__infoTitle}>Get in touch</h3>

            <div className={styles.content__infoItems}>
              <div className={styles.content__infoItem}>
                <div className={styles.info__itemIcon}>
                  <IoMailOutline />
                </div>

                <div className={styles.info__itemText}>
                  <h4 className={styles.item__textTitle}>Email</h4>
                  <p className={styles.item__textEmail}>hello@pidcommerce.com</p>
                </div>
              </div>

              <div className={styles.content__infoItem}>
                <div className={styles.info__itemIcon}>
                  <FiPhone />
                </div>

                <div className={styles.info__itemText}>
                  <h4 className={styles.item__textTitle}>Phone</h4>
                  <p className={styles.item__textEmail}>+57 (305) 484 47 82</p>
                </div>
              </div>

              <div className={styles.content__infoItem}>
                <div className={styles.info__itemIcon}>
                  <MdOutlineLocationOn />
                </div>

                <div className={styles.info__itemText}>
                  <h4 className={styles.item__textTitle}>Address</h4>
                  <p className={styles.item__textEmail}>
                    123 Design Street San Francisco, CA 94102 United States
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.content__infoSupport}>
            <h3 className={styles.content__infoTitle}>Quick Support</h3>

            <div className={styles.content__supportItems}>
              <div className={styles.support__item}>
                <div className={styles.support__itemIcon}>
                  <VscPackage />
                </div>

                <div className={styles.support__itemText}>
                  <h4 className={styles.item__textTitle}>Track Order</h4>
                  <p className={styles.item__textDescription}>
                    Check your order status and delivery updates
                  </p>
                </div>
              </div>

              <div className={styles.support__item}>
                <div className={styles.support__itemIcon}>
                  <TfiReload />
                </div>

                <div className={styles.support__itemText}>
                  <h4 className={styles.item__textTitle}>Returns & Warranty</h4>
                  <p className={styles.item__textDescription}>
                    Easy returns and warranty information
                  </p>
                </div>
              </div>

              <div className={styles.support__item}>
                <div className={styles.support__itemIcon}>
                  <LuBriefcaseBusiness />
                </div>

                <div className={styles.support__itemText}>
                  <h4 className={styles.item__textTitle}>Business Inquiries</h4>
                  <p className={styles.item__textDescription}>
                    Partnership and wholesale opportunities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default ContactPage;
