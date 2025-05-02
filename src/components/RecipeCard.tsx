
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Recipe } from '@/types/recipe';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Link to={`/recipes/${recipe.id}`}>
      <Card className="overflow-hidden h-full transition-all hover:shadow-md hover:-translate-y-1">
        <div className="aspect-video w-full overflow-hidden relative">
          <img 
            src={recipe.image} 
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/70 to-transparent">
            <div className="flex items-center text-white gap-1.5">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{recipe.prepTime} min</span>
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-2 font-playfair line-clamp-2">{recipe.title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{recipe.cuisine}</p>
          <div className="flex flex-wrap gap-2">
            {recipe.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="bg-recipe-secondary text-recipe-dark">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RecipeCard;
