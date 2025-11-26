"use client";

import ContactForm from "@/components/layout/ContactForm";
import styles from "./contact.module.css";
import { raleway, nunitoSans } from "@/app/fonts/mainFonts";
import { IoMailOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { MdOutlineLocationOn } from "react-icons/md";
import { VscPackage } from "react-icons/vsc";
import { TfiReload } from "react-icons/tfi";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { motion } from "framer-motion";

const ContactPage = () => {
  return (
    <motion.div
      className={`container ${styles.contact__section}`}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <motion.h2
        className={`${raleway.className} ${styles.contact__sectionTitle}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Contact Us
      </motion.h2>

      <motion.p
        className={`${nunitoSans.className} ${styles.contact__sectionDescription}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
      >
        Have a question or want to collaborate? We&apos;re here to help.
      </motion.p>

      <motion.div
        className={styles.contact__sectionContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {/* FORM */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <ContactForm />
        </motion.div>

        {/* INFO */}
        <motion.div
          className={styles.contact__contentInfo}
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* CONTACT BOX */}
          <motion.div
            className={styles.content__infoBox}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className={styles.content__infoTitle}>Get in touch</h3>

            <div className={styles.content__infoItems}>
              {[ 
                { icon: <IoMailOutline />, title: "Email", text: "hello@pidcommerce.com" },
                { icon: <FiPhone />, title: "Phone", text: "+57 (305) 484 47 82" },
                { icon: <MdOutlineLocationOn />, title: "Address", text: "123 Design Street San Francisco, CA 94102 United States" }
              ].map((item, i)=>(
                <motion.div
                  key={i}
                  className={styles.content__infoItem}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.15 }}
                  whileHover={{ scale: 1.04 }}
                >
                  <div className={styles.info__itemIcon}>{item.icon}</div>
                  <div className={styles.info__itemText}>
                    <h4 className={styles.item__textTitle}>{item.title}</h4>
                    <p className={styles.item__textEmail}>{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* SUPPORT BOX */}
          <motion.div
            className={styles.content__infoSupport}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className={styles.content__infoTitle}>Quick Support</h3>

            <div className={styles.content__supportItems}>
              {[ 
                { icon: <VscPackage />, title: "Track Order", desc: "Check your order status and delivery updates" },
                { icon: <TfiReload />, title: "Returns & Warranty", desc: "Easy returns and warranty information" },
                { icon: <LuBriefcaseBusiness />, title: "Business Inquiries", desc: "Partnership and wholesale opportunities" }
              ].map((item, i)=>(
                <motion.div
                  key={i}
                  className={styles.support__item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.15 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={styles.support__itemIcon}>{item.icon}</div>
                  <div className={styles.support__itemText}>
                    <h4 className={styles.item__textTitle}>{item.title}</h4>
                    <p className={styles.item__textDescription}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ContactPage;
