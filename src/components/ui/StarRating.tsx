import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: number;
}
export const StarRating: React.FC<StarRatingProps> = ({
  rating = 0, // default to 0 if undefined
  max = 5,
  size = 16,
}) => {
  // Ensure rating is a number between 0 and max
  const validRating = Math.max(0, Math.min(rating, max));

  const fullStars = Math.floor(validRating);
  const hasHalfStar = validRating % 1 >= 0.5;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} size={size} className="fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && (
        <StarHalf key="half" size={size} className="fill-yellow-400 text-yellow-400" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={i + fullStars + (hasHalfStar ? 1 : 0)}
          size={size}
          className="text-gray-300"
        />
      ))}
      <span className="ml-2 text-sm text-gray-600">{validRating.toFixed(1)}</span>
    </div>
  );
};