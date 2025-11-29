import { DetailCardProps } from "@/interfaces/main"

const DetailCard = ({detailIcon, detailTitle, detailContent}:DetailCardProps) => {
  return (
    <div className="detail__card flex items-center gap-2.5 rounded-[.4rem] p-3 bg-(--grey)">
      {detailIcon}
      <div className="detail__card--text grid gap-1">
        <h4 className="detail__card--text--title">
          {detailTitle}
        </h4>
        <p className="detail__card--text--content text-(--black)">
          {detailContent}
        </p>
      </div>
    </div>
  )
}

export default DetailCard;