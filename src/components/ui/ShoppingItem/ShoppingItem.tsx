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
    <div className="shopping-item flex justify-center items-center border-b border-(--grey-color) py-4 gap-4">
      <Image className="shopping__item--img" src={itemImg} alt={itemName} width={80} height={80} />

      <div className="shopping__item--details">
        <h3 className={`shopping__item--name ${raleway.className}`}>{itemName}</h3>
        <p className={`shopping__item--id text-[.8rem] ${nunitoSans.className}`}>ID: {itemId}</p>
      </div>

      <div className="shopping__item--quantity">
        <FiMinus className="cursor-pointer" onClick={onIncrement} />
        <span className={`p-1 border-1 ${raleway.className}`}>{itemQuantity}</span>
        <FaPlus className="cursor-pointer" onClick={onDecrement} />
      </div>

      <span className={`shopping__item--total-price text-[1.2rem] font-bold text-(--black) ${raleway.className}`}>
        {`$${(itemPrice * itemQuantity).toFixed(2)}`}
      </span>

      <CiSquareRemove onClick={onRemove} />
    </div>
  );
};

export default ShoppingItem;
