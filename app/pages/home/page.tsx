import styles from "@/app/pages/home/home.module.css"
import Button from "@/components/ui/Button"
import Image from "next/image"
import { raleway, nunitoSans } from "@/app/fonts/mainFonts"

const Home = () => {
  return (
    <>
      <div className={styles.hero}>
        <div className={`${styles.hero__content} container`}>
          <div className={styles.hero__contentInfo}>
            <span className={`${styles.hero__contentSpan} ${raleway.className}`}>Pro.Beyond.</span>
            <h2 className={`${styles.hero__contentTitle} ${raleway.className}`}>
              Iphone 14
              <span className={styles.hero__contentTitleSpan}> Pro</span>
            </h2>
            <p className={`${styles.hero__contentDescription} ${nunitoSans.className}`}>Created to change everything for the better. For everyone</p>
            <Button text={"Shop Now"} buttonBg={"transparent"} textColor={"white"} border={"white"} size={"lg"} />
          </div>
          <Image className={styles.hero__image} src={"/images/iphone-image.png"} alt="Iphone Image" height={300} width={300} />
        </div>
      </div>

      <div className={styles.grid__hero}>
        <div className={`${styles.grid__heroContent} ${styles.grid__playstation}`}>
          <Image className={styles.grid__playstationImage} src={"/images/playStation-image.png"} alt="PlayStation Image" height={100} width={300} />
          <div className={`${styles.grid__playstationTexts} ${styles.grid__texts}`}>
            <h3 className={`${styles.grid__playstationTitle} ${raleway.className}`}>Playstation 5</h3>
            <p className={`${styles.grid__playstationDescription} ${styles.grid__textsDescription} ${nunitoSans.className}`}>
              Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.
            </p>
          </div>
        </div>
        <div className={`${styles.grid__heroContent} ${styles.grid__airpods}`}>
          <Image className={styles.grid__airpodsImage} src={"/images/headphones-image.png"} alt="Headphones Image" width={100} height={100} />
          <div className={`${styles.grid__airpodsTexts} ${styles.grid__texts}`}>
            <h3 className={`${styles.grid__airpodsTitle} ${raleway.className}`}>Apple AirPods <span>Max</span></h3>
            <p className={`${styles.grid__headphonesDescription} ${styles.grid__textsDescription} ${nunitoSans.className}`}>
              Computational audio. Listen, it&apos;s powerful
            </p>
          </div>
        </div>
        <div className={`${styles.grid__heroContent} ${styles.grid__applevision}`}>
          <Image className={styles.grid__applevisionImage} src={"/images/virtual-reality-glasses-image.png"} alt="Virtual Reality Glasses Image" width={300} height={100} />
          <div className={`${styles.grid__applevisionTexts} ${styles.grid__texts}`}>
            <h3 className={`${styles.grid__applevisionTitle} ${raleway.className}`}>Apple Vision <span>Pro</span></h3>
            <p className={`${styles.grid__applevisionDescription} ${styles.grid__textsDescription} ${nunitoSans.className}`}>
              An immersive way to experience entertainment
            </p>
          </div>
        </div>
        <div className={`${styles.grid__heroContent} ${styles.grid__macbook}`}>
          <div className={`${styles.grid__macbookTexts} ${styles.grid__texts}`}>
            <h3 className={`${styles.grid__macbookTitle} ${raleway.className}`}>Macbook <span>Air</span></h3>
            <p className={`${styles.grid__macbookDescription} ${styles.grid__textsDescription} ${nunitoSans.className}`}>
              The new 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.
            </p>
            <Button text={"Shop Now"} textColor={"black"} buttonBg={"transparent"} size={"lg"} border={"black"} />
          </div>
          <Image className={styles.grid__macbookImage} src={"/images/MacBookPro14-image.png"} alt="Macbook Image" width={300} height={100} />
        </div>
      </div>
    </>
  )
}

export default Home;