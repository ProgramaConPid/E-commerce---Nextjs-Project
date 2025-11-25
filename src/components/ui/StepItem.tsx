import { JSX } from "react"

interface StepItemProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const StepItem = ({icon, title, description}:StepItemProps) => {
  return (
    <div className="step_item flex gap-2 items-center">
      <div className="step__item--container bg-(--black)">
        {icon}
      </div>
      <div className="step__item--text flex flex-col">
        <h3 className="text-(--black) font-bold text-[1.2rem]">{title}</h3>
        <p className="text-(--grey-color)">{description}</p>
      </div>
    </div>
  )
}

export default StepItem