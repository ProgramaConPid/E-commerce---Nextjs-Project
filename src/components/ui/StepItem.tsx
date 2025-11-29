import { raleway, nunitoSans } from "@/app/fonts/mainFonts";
import { JSX } from "react"

interface StepItemProps {
  isActive: boolean;
  icon: JSX.Element;
  title: string;
  description: string;
  onClick: () => void;
}

const StepItem = ({icon, title, description, isActive, onClick}:StepItemProps) => {
  return (
    <div onClick={onClick} className={`step_item flex gap-4 items-center ${isActive ? "" : "opacity-40"}`}>
      <div className="step__item--container p-3 bg-(--black) rounded-full text-(--white)">
        {icon}
      </div>
      <div className="step__item--text flex flex-col">
        <h3 className={`${raleway.className} text-(--black) font-light text-[1.2rem]`}>{title}</h3>
        <span className={`${nunitoSans.className} text-[1.4rem] text-(--black) font-bold`}>{description}</span>
      </div>
    </div>
  )
}

export default StepItem