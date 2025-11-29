import { raleway, nunitoSans } from "@/app/fonts/mainFonts";
import { ImPencil } from "react-icons/im";
import { AiFillDelete } from "react-icons/ai";
import { Radio } from "@heroui/radio";

interface AddressCardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  isSelected?: boolean;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  phone?: string;
  place?: string;
}

const AddressCard = ({
  value,
  isSelected,
  street,
  city,
  state,
  zip,
  country,
  phone,
  place,
}: AddressCardProps) => {
  return (
    <div className={`${isSelected ? "bg-(--black)" : "bg-(--grey)"} address__card w-full flex p-5 items-center justify-between rounded-md`}>
      <div className="address__card--info flex gap-4">
        <Radio color="success" value={value} className="self-start" />
        <div className="address__details flex flex-col">
          <div className="address__place flex gap-2 items-center mb-2">
            <h3 className={`${raleway.className} ${isSelected ? "text-(--white)" : "text-(--black)"} font-bold`}>{street}</h3>
            <span
              className={`${nunitoSans.className} ${isSelected ? "bg-(--white) text-(--black)" : "bg-(--black) text-(--white)"} text-[.8rem] font-medium ml-2  py-1 px-2 uppercase rounded-sm`}
            >
              {place}
            </span>
          </div>
          <p className={`${nunitoSans.className} font-light mb-1 mt-1`}>
            {street}, {city}, {state} {zip}, {country}
          </p>
          <p className={`${nunitoSans.className} font-light`}>Phone: {phone}</p>
        </div>
      </div>

      <div className="address__card--actions flex gap-6">
        <ImPencil className={`${isSelected ? "text-(--white)" : "text-(--black)"} cursor-pointer text-[1.5rem]`} />
        <AiFillDelete className={`${isSelected ? "text-(--white)" : "text-(--black)"} cursor-pointer text-[1.5rem]`} />
      </div>
    </div>
  );
};

export default AddressCard;
