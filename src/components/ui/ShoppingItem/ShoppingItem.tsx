import { ShoppingItemProps } from "@/interfaces/main";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import { CiSquareRemove } from "react-icons/ci";
import Image from "next/image";
import { raleway, nunitoSans } from '../../../app/fonts/mainFonts';

const ShoppingItem = ({
  itemImg,
  itemId,
  itemName,
  itemPrice,
  itemQuantity,
  onRemove,
  onIncrement,
  onDecrement
}: ShoppingItemProps) => {
  return (
    <div className="shopping-item flex justify-center items-center border-b border-(--grey-color) py-6 gap-4">
      <Image className="shopping__item--img" src={itemImg} alt={itemName} width={80} height={80} />

      <div className="shopping__item--details flex flex-col gap-2">
        <h3 className={`shopping__item--name ${raleway.className}`}>{itemName}</h3>
        <p className={`shopping__item--id text-[.8rem] ${nunitoSans.className}`}>ID: {itemId}</p>
      </div>

      <div className="shopping__item--quantity flex items-center">
        <div className="px-2">
          <FiMinus className="cursor-pointer" onClick={onIncrement} />
        </div>
        <span className={`py-1 px-2 border-1 ${raleway.className}`}>{itemQuantity}</span>
        <div className="px-2">
          <FaPlus className="cursor-pointer" onClick={onDecrement} />
        </div>
      </div>

      <span className={`shopping__item--total-price text-[1.2rem] font-bold text-(--black) ${nunitoSans.className}`}>
        {`$${(itemPrice * itemQuantity).toFixed(2)}`}
      </span>

      <CiSquareRemove className="text-3xl cursor-pointer shrink-0" onClick={onRemove} />
    </div>
  );
};

export default ShoppingItem;
