import { raleway, nunitoSans } from "@/app/fonts/mainFonts";

interface ShipmentMethodProps {
  cost?: string;
  description?: string;
  date?: string;
}

const ShipmentMethod = ({cost, description, date}:ShipmentMethodProps) => {
  return (
    <div className="shipment__method flex p-3 rounded-md border border-(--grey-color) justify-between mb-6">
      <div className="shipment__method--left flex gap-6 items-center">
        <input type="radio" name="method" />
        <h3 className={`${raleway.className} font-bold`}>{cost}</h3>
        <p className={`${nunitoSans.className} font-light`}>{description}</p>
      </div>

      <p className={`${nunitoSans.className} font-medium`}>{date}</p>
    </div>
  )
}

export default ShipmentMethod