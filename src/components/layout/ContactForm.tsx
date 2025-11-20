import { raleway, nunitoSans } from "@/app/fonts/mainFonts";

const ContactForm = () => {
  return (
    <form className="contact__form flex flex-col gap-4 border-1 p-4 rounded-lg">
      <h2 className={`${raleway.className} text-(--black) text-[2rem]`}>
        Send us a message
      </h2>
      <p className={`${nunitoSans.className} text-(--grey-color)`}>
        Fill out the form below and we&apos;ll get back to you shortly
      </p>

      <div className="input__groups flex flex-col gap-4">
        <div className="input__group flex flex-col gap-2">
          <label
            className={`${raleway.className} font-bold`}
            htmlFor="fullname"
          >
            Full Name
          </label>
          <input
            className="p-3 rounded-md focus:outline-0 border-1"
            type="text"
            placeholder="John Doe"
            id="fullname"
          />
        </div>
        <div className="input__group flex flex-col gap-2">
          <label className={`${raleway.className} font-bold`} htmlFor="email">
            Email Address
          </label>
          <input
            className="p-3 rounded-md focus:outline-0 border-1"
            type="text"
            placeholder="john@example.com"
            id="fullname"
          />
        </div>
        <div className="input__group flex flex-col gap-2">
          <label
            className={`${raleway.className} font-bold`}
            htmlFor="messagae"
          > 
            Message
          </label>
          <textarea
            className="p-3 rounded-md focus:outline-0 border-1 h-[325px] resize-none"
            placeholder="Tell us how we can help you..."
            id="message"
          ></textarea>
        </div>
      </div>

      <button
        type="submit"
        className={`${raleway.className} bg-(--black) text-(--white) inline-block py-3 rounded-md mt-4 cursor-pointer font-bold`}
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
