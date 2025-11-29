import { JSX } from "react";
import { raleway, nunitoSans } from "@/app/fonts/mainFonts";
import { Radio } from "@heroui/radio";

interface ShipmentMethodProps {
  value: string;
  cost?: string;
  description?: string;
  date?: string | JSX.Element;
}

const ShipmentMethod = ({value, cost, description, date}:ShipmentMethodProps) => {
  return (
    <div className="shipment__method flex p-5 rounded-md border border-(--grey-color) justify-between mb-6">
      <div className="shipment__method--left flex gap-6 items-center">
        <Radio value={value} />
        <h3 className={`${raleway.className} font-bold`}>{cost}</h3>
        <p className={`${nunitoSans.className} font-light`}>{description}</p>
      </div>

      <p className={`${nunitoSans.className} font-medium`}>{date}</p>
    </div>
  )
}

export default ShipmentMethod