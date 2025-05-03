
import React from 'react';
import { Button } from '@/components/ui/button';
import { BookmarkPlus, BookmarkCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface FavoriteButtonProps {
  recipeId: string;
  isFavorite: boolean;
  toggleFavorite: (id: string) => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'ghost' | 'circle';
  className?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  recipeId,
  isFavorite,
  toggleFavorite,
  size = 'md',
  variant = 'primary',
  className
}) => {
  const { toast } = useToast();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(recipeId);
    
    toast({
      title: isFavorite ? 'Removed from favorites' : 'Added to favorites',
      description: isFavorite ? 'Recipe removed from your favorites' : 'Recipe added to your favorites',
      variant: isFavorite ? 'default' : 'default',
      duration: 2000,
    });
  };

  const sizes = {
    sm: 'h-8 w-8 p-1',
    md: 'h-10 w-10 p-1.5',
    lg: 'h-12 w-12 p-2',
  };

  const variants = {
    primary: isFavorite 
      ? 'bg-recipe-primary text-white hover:bg-recipe-primary/90' 
      : 'bg-white text-recipe-primary border border-recipe-primary hover:bg-recipe-primary/10',
    ghost: isFavorite 
      ? 'bg-transparent text-recipe-primary hover:bg-recipe-primary/10' 
      : 'bg-transparent text-gray-500 hover:text-recipe-primary hover:bg-recipe-primary/10',
    circle: isFavorite 
      ? 'rounded-full bg-recipe-primary text-white hover:bg-recipe-primary/90 shadow-md' 
      : 'rounded-full bg-white text-recipe-primary border border-recipe-primary hover:bg-recipe-primary/10 shadow-md'
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className={cn(
        'transition-all duration-300',
        sizes[size],
        variants[variant],
        className
      )}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? (
        <BookmarkCheck className="h-full w-full" />
      ) : (
        <BookmarkPlus className="h-full w-full" />
      )}
    </Button>
  );
};

export default FavoriteButton;
