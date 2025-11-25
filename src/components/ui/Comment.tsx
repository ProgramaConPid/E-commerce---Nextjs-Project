import Image from "next/image";
import { CommentProps } from "@/interfaces/main";
import { raleway, nunitoSans } from "../../app/fonts/mainFonts";
import { StarRating } from "./StarRating";

const Comment = ({
  userImg,
  username,
  rating,
  commentText,
  productImgs,
}: CommentProps) => {
  return (
    <div className="comment__card flex gap-3 p-4 rounded-[.6rem] overflow-hidden bg-(--white) shadow-md">
      <Image
        className="rounded-full object-cover object-center"
        src={userImg || "/images/default-user.png"}
        alt="User Image"
        height={100}
        width={100}
      />

      <div className="comment__content">
        <h3 className={`${raleway.className} font-bold text-[17px]`}>
          {username}
        </h3>
        <StarRating rating={rating} />
        <p
          className={`${nunitoSans.className} text-[15px] mt-2 text-(--grey-color)`}
        >
          {commentText}
        </p>

        {productImgs && productImgs.length > 0 && (
          <div className="comment__images flex gap-2 mt-3 overflow-x-auto">
            {productImgs.map((imgSrc, index) => (
              <Image
                key={index}
                className="w-20 h-20 object-cover rounded"
                src={imgSrc}
                alt={`Product Image ${index + 1}`}
                width={80}
                height={80}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
