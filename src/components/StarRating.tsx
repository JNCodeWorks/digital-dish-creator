
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  initialRating?: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  initialRating = 0,
  onChange,
  readonly = false,
  size = 'md',
  className
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  
  const starCount = 5;
  
  const handleClick = (selectedRating: number) => {
    if (readonly) return;
    
    setRating(selectedRating);
    if (onChange) {
      onChange(selectedRating);
    }
  };
  
  const sizes = {
    sm: 'h-3 w-3',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };
  
  return (
    <div className={cn('flex items-center', className)}>
      {[...Array(starCount)].map((_, index) => {
        const currentRating = index + 1;
        const filled = readonly
          ? currentRating <= rating
          : currentRating <= (hoverRating || rating);
          
        return (
          <Star
            key={index}
            className={cn(
              sizes[size],
              'cursor-pointer transition-all',
              filled ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300',
              !readonly && 'hover:scale-110'
            )}
            onClick={() => handleClick(currentRating)}
            onMouseEnter={() => !readonly && setHoverRating(currentRating)}
            onMouseLeave={() => !readonly && setHoverRating(0)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
