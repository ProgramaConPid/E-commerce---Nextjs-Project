import { BannerCardProps } from "@/interfaces/main"
import { raleway, nunitoSans } from "@/app/fonts/mainFonts";
import styles from "./banner.module.css";
import Image from 'next/image';

const BannerCard = ({image, title, description, bannerBg, button}: BannerCardProps) => {
  const getBannerBg = () => {
    switch(bannerBg) {
      case "white":
        return styles.white;
      case "smooth-grey":
        return styles.smoothGrey;
      case "medium-grey":
        return styles.mediumGrey;
      case "bold-grey":
        return styles.boldGrey;
      default:
        break;
    }
  }

  return (
    <div className={`${getBannerBg()} ${styles.banner__card}`}>
      <Image src={image} alt="Product Banner Image" height={100} width={100} />
      <h3 className={`${styles.banner__cardTitle} ${raleway.className}`}>
        {title}
      </h3>
      <p className={`${styles.banner__cardDescription} ${nunitoSans.className}`}>
        {description}
      </p>
      {button}
    </div>
  )
}

export default BannerCard;