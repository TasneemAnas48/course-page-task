import React, { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming this is a utility for class merging
import { useTranslation } from "react-i18next";

// Rating variants with disabled styles
const ratingVariants = {
  default: {
    star: "text-foreground",
    emptyStar: "text-muted-foreground",
    disabled: "opacity-50 cursor-not-allowed",
  },
  destructive: {
    star: "text-red-500",
    emptyStar: "text-red-200",
    disabled: "opacity-50 cursor-not-allowed",
  },
  yellow: {
    star: "text-yellow-500",
    emptyStar: "text-yellow-200",
    disabled: "opacity-50 cursor-not-allowed",
  },
};

interface RatingsProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number;
  totalStars?: number;
  size?: number;
  fill?: boolean;
  Icon?: React.ReactElement;
  variant?: keyof typeof ratingVariants;
  onRatingChange?: (rating: number) => void;
  disabled?: boolean;
}

export const Rating = ({
  rating: initialRating,
  totalStars = 5,
  size = 20,
  fill = true,
  Icon = <Star />,
  variant = "default",
  onRatingChange,
  disabled,
  ...props
}: RatingsProps) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [currentRating, setCurrentRating] = useState(initialRating);
  const { t } = useTranslation();

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    const starIndex = parseInt(
      (event.currentTarget as HTMLDivElement).dataset.starIndex || "0"
    );
    setHoverRating(starIndex);
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    setHoverRating(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    const starIndex = parseInt(
      (event.currentTarget as HTMLDivElement).dataset.starIndex || "0"
    );
    setCurrentRating(starIndex);
    onRatingChange?.(starIndex);
  };

  const displayRating = hoverRating ?? currentRating;
  const fullStars = Math.floor(displayRating);
  const partialStar =
    displayRating % 1 > 0 ? (
      <PartialStar
        fillPercentage={displayRating % 1}
        size={size}
        className={cn(ratingVariants[variant].star)}
        Icon={Icon}
      />
    ) : null;

  return (
    <div
      className={cn(
        "flex w-fit items-center gap-2",
        disabled && ratingVariants[variant].disabled
      )}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) =>
          React.cloneElement(Icon, {
            key: i,
            size,
            className: cn(
              fill ? "fill-current stroke-1" : "fill-transparent",
              ratingVariants[variant].star
            ),
            onClick: handleClick,
            onMouseEnter: handleMouseEnter,
            "data-star-index": i + 1,
          })
        )}
        {partialStar}
        {[
          ...Array(Math.max(0, totalStars - fullStars - (partialStar ? 1 : 0))),
        ].map((_, i) =>
          React.cloneElement(Icon, {
            key: i + fullStars + 1,
            size,
            className: cn("stroke-1", ratingVariants[variant].emptyStar),
            onClick: handleClick,
            onMouseEnter: handleMouseEnter,
            "data-star-index": i + fullStars + 1,
          })
        )}
      </div>
      <span className="text-muted-foreground">
        {t("current_rating")} : {`${currentRating}`}
      </span>
    </div>
  );
};

interface PartialStarProps {
  fillPercentage: number;
  size: number;
  className?: string;
  Icon: React.ReactElement;
}

const PartialStar = ({
  fillPercentage,
  size,
  className,
  Icon,
}: PartialStarProps) => {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {React.cloneElement(Icon, {
        size,
        className: cn("fill-transparent", className),
      })}
      <div
        style={{
          position: "absolute",
          top: 0,
          overflow: "hidden",
          width: `${fillPercentage * 100}%`,
        }}
      >
        {React.cloneElement(Icon, {
          size,
          className: cn("fill-current", className),
        })}
      </div>
    </div>
  );
};
