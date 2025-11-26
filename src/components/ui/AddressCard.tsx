import { raleway, nunitoSans } from "@/app/fonts/mainFonts"
import { ImPencil } from "react-icons/im";
import { AiFillDelete } from "react-icons/ai";

interface AddressCardProps {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  phone?: string;
  place?: string;
}

const AddressCard = ({
  street,
  city,
  state,
  zip,
  country,
  phone,
  place,
}:AddressCardProps) => {
  return (
    <div className="address__card flex p-4 items-center justify-between rounded-md bg-(--grey-color)">
      <div className="address__card--info flex gap-2">
        <input type="radio" name="address" />
        <div className="address__details flex flex-col">
          <div className="address__place mb-2">
            <h3 className={`${raleway.className} font-bold`}>{street}</h3>
            <span className={`${nunitoSans.className} font-light ml-2 bg-(--black) p-2 uppercase text-(--white) rounded-md`}>{place}</span>
          </div>
          <p className={`${nunitoSans.className} font-light`}>
            {street}, {city}, {state} {zip}, {country}
          </p>
          <p className={`${nunitoSans.className} font-light`}>
            Phone: {phone}
          </p>
        </div>
      </div>

      <div className="address__card--actions flex gap-4">
        <ImPencil className="text-(--black) cursor-pointer text-[1.5rem]" />
        <AiFillDelete className="text-(--black) cursor-pointer text-[1.5rem]" />
      </div>
    </div>
  )
}

export default AddressCard