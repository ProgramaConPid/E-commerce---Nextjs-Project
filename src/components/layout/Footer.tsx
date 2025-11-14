import Image from "next/image";
import {
  FaFacebook,
  FaTwitter,
  FaTiktok,
  FaInstagram,
} from "react-icons/fa";
import { nunitoSans, raleway } from "@/app/fonts/mainFonts";

const Footer = () => {
  return (
    <footer className="bg-(--black) text-(--white) py-14 px-6 md:px-20 lg:px-32">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 items-start">

        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Image
            className="w-40 h-40 object-contain"
            src={"/images/ecommerce-logo.png"}
            alt="E-commerce Logo"
            width={200}
            height={200}
          />
          <p
            className={`${nunitoSans.className} leading-7 mt-4 max-w-sm text-(--grey-color)`}
          >
            We are a residential interior design firm located in Portland.
            Our boutique-studio offers more than.
          </p>
        </div>

        <div>
          <h3
            className={`text-lg mb-3 font-semibold ${raleway.className}`}
          >
            Services
          </h3>
          <ul className="grid gap-2 text-(--grey-color)">
            <li className="hover:text-(--white) transition">Bonus program</li>
            <li className="hover:text-(--white) transition">Gift Cards</li>
            <li className="hover:text-(--white) transition">
              Credit and payment
            </li>
            <li className="hover:text-(--white) transition">
              Service contracts
            </li>
            <li className="hover:text-(--white) transition">
              Non-cash account
            </li>
            <li className="hover:text-(--white) transition">Payment</li>
          </ul>
        </div>

        <div>
          <h3
            className={`text-lg mb-3 font-semibold ${raleway.className}`}
          >
            Assistance to the buyer
          </h3>
          <ul className="grid gap-2 text-(--grey-color)">
            <li className="hover:text-(--white) transition">
              Find an order
            </li>
            <li className="hover:text-(--white) transition">
              Terms of delivery
            </li>
            <li className="hover:text-(--white) transition">
              Exchange & return of goods
            </li>
            <li className="hover:text-(--white) transition">
              Guarantee
            </li>
            <li className="hover:text-(--white) transition">
              Frequently asked questions
            </li>
            <li className="hover:text-(--white) transition">
              Terms of use of the site
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-center md:justify-start gap-6 mt-12 text-2xl">
        <FaTwitter className="cursor-pointer hover:text-blue-400 transition" />
        <FaFacebook className="cursor-pointer hover:text-blue-500 transition" />
        <FaTiktok className="cursor-pointer hover:text-(--white) transition" />
        <FaInstagram className="cursor-pointer hover:text-pink-400 transition" />
      </div>
    </footer>
  );
};

export default Footer;
