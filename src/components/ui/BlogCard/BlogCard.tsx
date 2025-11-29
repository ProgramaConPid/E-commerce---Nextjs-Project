import { GoArrowRight } from "react-icons/go";
import { raleway, nunitoSans } from "@/app/fonts/mainFonts"
import { IBlog } from "@/interfaces/main"
import styles from "../BlogCard/blog.module.css";
import Image from "next/image";

const BlogCard = ({
  image,
  title,
  description,
  type
}:IBlog) => {
  return (
    <div className={styles.blog__card}>
      <Image className={styles.blog__cardImg} src={image} alt="Blog Image" height={200} width={300} />

      <div className={styles.blog__cardText}>
        <span className={`${nunitoSans.className} ${styles.card__textType}`}>{type}</span>

        <h2 className={`${raleway.className} ${styles.card__textTitle}`}>{title}</h2>

        <p className={`${nunitoSans.className} ${styles.card__textDescription}`}>{description}</p>

        <button className={styles.blog__cardButton}>
          <span className={`${raleway.className} ${styles.card__buttonText}`}>Read More</span>
          <GoArrowRight />
        </button>
      </div>
    </div>
  )
}

export default BlogCard