
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Recipe } from '@/types/recipe';
import { Link } from 'react-router-dom';
import { Clock, UtensilsCrossed, ImageOff } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import FavoriteButton from './FavoriteButton';
import StarRating from './StarRating';

// Fallback image if the recipe image fails to load
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1556909172-8c2f041fca1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1300&q=80";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const [imageError, setImageError] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <Link to={`/recipes/${recipe.id}`} className="group">
      <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-2 group border-border relative">
        {/* Favorite Button - Absolute positioned on the card */}
        <div className="absolute top-3 right-3 z-10">
          <FavoriteButton
            recipeId={recipe.id}
            isFavorite={isFavorite(recipe.id)}
            toggleFavorite={toggleFavorite}
            variant="circle"
            size="md"
          />
        </div>
        
        <div className="aspect-video w-full overflow-hidden relative">
          {!imageError ? (
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-muted flex flex-col items-center justify-center">
              <ImageOff className="h-8 w-8 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">Image not available</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/70 to-transparent">
            <div className="flex items-center text-white gap-1.5">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">{recipe.prepTime} min</span>
            </div>
          </div>
          <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Badge className="bg-recipe-primary text-white border-none">
              {recipe.cuisine}
            </Badge>
          </div>
        </div>
        <CardContent className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold font-playfair line-clamp-2 group-hover:text-recipe-primary transition-colors">{recipe.title}</h3>
          </div>
          
          <div className="mb-3">
            <StarRating initialRating={3.5} readonly size="sm" />
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {recipe.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="bg-recipe-secondary/30 text-foreground border-none transition-colors hover:bg-recipe-secondary/50">
                {tag}
              </Badge>
            ))}
            {recipe.tags.length > 3 && (
              <Badge variant="outline" className="bg-background border-border text-muted-foreground">
                +{recipe.tags.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RecipeCard;
