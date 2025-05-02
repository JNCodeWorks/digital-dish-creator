
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Recipe } from '@/types/recipe';
import { Link } from 'react-router-dom';
import { Clock, UtensilsCrossed } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Link to={`/recipes/${recipe.id}`}>
      <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-2 group border-recipe-muted">
        <div className="aspect-video w-full overflow-hidden relative">
          <img 
            src={recipe.image} 
            alt={recipe.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/70 to-transparent">
            <div className="flex items-center text-white gap-1.5">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">{recipe.prepTime} min</span>
            </div>
          </div>
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Badge className="bg-recipe-primary text-white border-none">
              {recipe.cuisine}
            </Badge>
          </div>
        </div>
        <CardContent className="p-5">
          <h3 className="text-xl font-semibold mb-2 font-playfair line-clamp-2 group-hover:text-recipe-primary transition-colors">{recipe.title}</h3>
          <div className="flex flex-wrap gap-2 mt-3">
            {recipe.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="bg-recipe-secondary text-recipe-dark border-none transition-colors hover:bg-recipe-secondary/80">
                {tag}
              </Badge>
            ))}
            {recipe.tags.length > 3 && (
              <Badge variant="outline" className="bg-white border-recipe-muted text-muted-foreground">
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
