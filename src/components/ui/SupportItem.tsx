import { JSX } from 'react';
import { raleway, nunitoSans } from '@/app/fonts/mainFonts';

interface SupportItemProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const SupportItem = ({icon, title, description}: SupportItemProps) => {
  return (
    <div className='support__item flex gap-3 rounded-md p-4'>
      <div className='support__item--icon bg-(--white) p-3 rounded-md text-(--black) text-[1.5rem]'>
        {icon}
      </div>
      <div className='support__item--text grid gap-2'>
        <h4 className={`${raleway.className} support__item--title text-(--black) font-bold text-[1.25rem]`}>
          {title}
        </h4>

        <p className={`${nunitoSans.className} support__item--description text-(--grey-color)`}>
          {description}
        </p>
      </div>
    </div>
  )
}

export default SupportItem