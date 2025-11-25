"use client";

import { raleway, nunitoSans } from "@/app/fonts/mainFonts";
import { useState } from "react";
import { sendMessage } from "@/services/contact";
import { toast } from "sonner";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setForm] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.name || !formData.email || !formData.message) {
    toast.error("You must enter all required fields.");
    return;
  }

  try {
    setLoading(true);

    const res = await sendMessage(formData);

    if (!res.ok) {
      throw new Error("Error sending message, try again later.");
    }

    toast.success("Message sent successfully!");

    setForm({ name: "", email: "", message: "" });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    toast.error(error.message || "Unexpected error");
  } finally {
    setLoading(false);
  }
};

  return (
    <form onSubmit={handleSubmit} className="contact__form flex flex-col gap-4 border-1 p-4 rounded-lg">
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
            value={formData.name}
            onChange={(e) => setForm({...formData, name: e.target.value})}
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
          value={formData.email}
            onChange={(e) => setForm({...formData, email: e.target.value})}
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
            value={formData.message}
            className="p-3 rounded-md focus:outline-0 border-1 h-[325px] resize-none"
            placeholder="Tell us how we can help you..."
            id="message"
            onChange={(e) => setForm({...formData, message: e.target.value})}
          ></textarea>
        </div>
      </div>

      <button
        disabled={loading}
        type="submit"
        className={`${raleway.className} bg-(--black) text-(--white) inline-block py-3 rounded-md mt-4 cursor-pointer font-bold`}
      >
        {loading ? "Sending message..." : "Send"}
      </button>
    </form>
  );
};

export default ContactForm;
