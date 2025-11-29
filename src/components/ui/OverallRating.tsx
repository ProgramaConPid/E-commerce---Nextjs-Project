import { StarRating } from "./StarRating";
import { OverallRatingProps } from "@/interfaces/main";

const OverallRating = ({ ratings, totalReviews }: OverallRatingProps) => {
  const average =
    Object.entries(ratings).reduce(
      (acc, [star, count]) => acc + Number(star) * count,
      0
    ) / totalReviews;

  return (
    <div className="rating__item flex flex-col items-center justify-center bg-(--white) p-5 rounded-lg shadow-md">
      <h2>{average.toFixed(1)}</h2>
      <span className="rating__item--reviews">of {totalReviews} reviews</span>

      <StarRating
        rating={Math.round(
          Object.entries(ratings).reduce(
            (acc, [star, count]) => acc + Number(star) * count,
            0
          ) / totalReviews
        )}
      />
    </div>
  );
};

export default OverallRating;
