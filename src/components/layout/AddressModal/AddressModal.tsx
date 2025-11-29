"use client";

import { BiPlus } from "react-icons/bi";
import { raleway, nunitoSans } from "@/app/fonts/mainFonts";
import { useState } from "react";
import { addAddress } from "@/services/addressService";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void;
}

const AddressModal = ({ isOpen, onClose, onSave }: AddressModalProps) => {
  
  const { data: session } = useSession();
  
  const [formData, setFormData] = useState({
    place: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });
  
  const [loading, setLoading] = useState(false);
  
  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { place, street, city, state, zip, country, phone } = formData;

    if (!place || !street || !city || !state || !zip || !country || !phone) {
      toast.error("All fields are required");
      return false;
    }

    if (phone.length < 7) {
      toast.error("Invalid phone number");
      return false;
    }

    if (zip.length < 3) {
      toast.error("Invalid postal code");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.id) {
      toast.error("You must be logged in");
      return;
    }

    if (!validateForm()) return;

    try {
      setLoading(true);

      await addAddress({
        userId: session.user.id,
        ...formData,
      });

      toast.success("Address saved successfully!");

      setFormData({
        place: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        phone: "",
      });

      onSave?.();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Error saving the address");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal__container flex justify-center items-center fixed top-0 left-0 h-screen w-screen bg-black/80">
      <form className="address__form bg-(--white) relative p-6 rounded-md" onSubmit={handleSubmit}>
        <h2 className={`${raleway.className} address__form--title text-[1.4rem] mb-2`}>
          Add New Address
        </h2>

        <p className={`${nunitoSans.className} address__form--paragraph`}>
          Add a new address to your account. Fill in all the required fields below.
        </p>

        <BiPlus
          className="absolute top-4 right-4 rotate-45 text-[1.5rem] cursor-pointer"
          onClick={onClose}
        />

        <div className="address__form--content grid gap-4 my-6">
          <div className="form__group flex flex-col gap-2">
            <label className={`${raleway.className} font-semibold`} htmlFor="place">
              Place Label *
            </label>
            <input
              className="p-2 border-1 border-(--grey-color) rounded-md"
              name="place"
              type="text"
              value={formData.place}
              onChange={handleChange}
              placeholder="e.g, Home, Work, Office"
            />
          </div>

          <div className="form__group flex flex-col gap-2">
            <label className={`${raleway.className} font-semibold`} htmlFor="street">
              Street Address *
            </label>
            <input
              className="p-2 border-1 border-(--grey-color) rounded-md"
              name="street"
              type="text"
              value={formData.street}
              onChange={handleChange}
              placeholder="123 Main Street, Apt 4B"
            />
          </div>

          <div className="form__groups flex flex-col gap-4">
            <div className="form__group--top flex gap-3">
              <div className="form__group--city flex flex-1 flex-col gap-2">
                <label className={`${raleway.className} font-semibold`}>
                  City *
                </label>
                <input
                  className="p-2 border-1 border-(--grey-color) rounded-md"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="San Francisco"
                />
              </div>
              <div className="form__group--state flex flex-1 flex-col gap-2">
                <label className={`${raleway.className} font-semibold`}>
                  State / Region *
                </label>
                <input
                  className="p-2 border-1 border-(--grey-color) rounded-md"
                  name="state"
                  type="text"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="California"
                />
              </div>
            </div>

            <div className="form__group--bottom flex gap-3">
              <div className="form__group--zip flex flex-1 flex-col gap-2">
                <label className={`${raleway.className} font-semibold`}>
                  ZIP / Postal Code *
                </label>
                <input
                  className="p-2 border-1 border-(--grey-color) rounded-md"
                  name="zip"
                  type="text"
                  value={formData.zip}
                  onChange={handleChange}
                  placeholder="94102"
                />
              </div>
              <div className="form__group--country flex flex-1 flex-col gap-2">
                <label className={`${raleway.className} font-semibold`}>
                  Country *
                </label>
                <input
                  className="p-2 border-1 border-(--grey-color) rounded-md"
                  name="country"
                  type="text"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="United States"
                />
              </div>
            </div>
          </div>

          <div className="form__group flex flex-col gap-2">
            <label className={`${raleway.className} font-semibold`}>
              Phone Number *
            </label>
            <input
              className="p-2 border-1 border-(--grey-color) rounded-md"
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div className="form__address--buttons flex gap-4 justify-end">
          <button
            onClick={onClose}
            type="button"
            className={`${nunitoSans.className} address__button--cancel py-2 px-3 border-1 border-(--grey-color) rounded-md cursor-pointer`}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`${nunitoSans.className} address__button--save py-2 px-4 bg-(--black) text-(--white) rounded-md`}
          >
            {loading ? "Saving..." : "Save Address"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressModal;
