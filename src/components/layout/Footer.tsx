import Image from "next/image"
import { FaFacebook, FaTwitter, FaTiktok, FaInstagram } from "react-icons/fa";
import { nunitoSans, raleway } from "@/app/fonts/mainFonts";

const Footer = () => {
  return (
    <footer className="footer bg-(--black) py-20 px-40 flex flex-col gap-5">
      <div className="footer__info container flex gap-15 items-center justify-between">
        <div className="footer__content--logo w-[40%] flex flex-col">
          <Image className="h-[280px] aspect-square" src={"/images/ecommerce-logo.png"} alt="E-commerce Logo" width={300} height={200} />
          <p className={`${nunitoSans.className} leading-7 mt-6`}>We are a residential interior design firm located in Portland. Our boutique-studio offers more than</p>
        </div>
        <div className="footer__content--services">
          <h3 className={ `footer__services--title text-[1.2rem] mb-3 text-(--white) ${raleway.className}`}>
            Services
          </h3>
          <ul className="footer__services--links grid gap-2">
            <li className="footer__services--link">Bonus program</li>
            <li className="footer__services--link">Gift Cards</li>
            <li className="footer__services--link">Credit and payment</li>
            <li className="footer__services--link">Service contracts</li>
            <li className="footer__services--link">Non-cash account</li>
            <li className="footer__services--link">Payment</li>
          </ul>
        </div>
        <div className="footer__content--assistance">
          <h3 className={`footer__assistance--title text-[1.2rem] mb-3 text-(--white) ${raleway.className}`}>Assistance to the buyer</h3>
          <ul className="footer__assistance--links grid gap-2">
            <li className="footer__assistance--link">Find an order</li>
            <li className="footer__assistance--link">Terms of delivery</li>
            <li className="footer__assistance--link">Exchange and return of goods</li>
            <li className="footer__assistance--link">Guarantee</li>
            <li className="footer__assistance--link">Frequently asked questions</li>
            <li className="footer__assistance--link">Terms of use of the site</li>
          </ul>
        </div>
      </div>
      <div className="footer__social container flex gap-8">
        <FaTwitter className="social__icon"/>
        <FaFacebook className="social__icon"/>
        <FaTiktok className="social__icon"/>
        <FaInstagram className="social__icon"/>
      </div>
    </footer>
  )
}

export default Footer