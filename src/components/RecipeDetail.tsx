
import React from 'react';
import { Recipe } from '@/types/recipe';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

interface RecipeDetailProps {
  recipe: Recipe;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative mb-6 rounded-lg overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-[350px] md:h-[400px] object-cover"
        />
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {recipe.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="bg-recipe-secondary text-recipe-dark">
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-2 font-playfair">{recipe.title}</h1>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="px-4 py-2 bg-recipe-muted rounded-md inline-flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{recipe.prepTime} minutes</span>
          </div>
          <span className="text-lg">{recipe.cuisine} Cuisine</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4 font-playfair">Ingredients</h2>
          <ul className="space-y-3">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-2 h-2 mt-2 mr-2 bg-recipe-primary rounded-full"></span>
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 font-playfair">Instructions</h2>
          <ol className="space-y-4">
            {recipe.steps.map((step, index) => (
              <li key={index} className="flex">
                <span className="flex-shrink-0 w-6 h-6 bg-recipe-primary text-white rounded-full flex items-center justify-center mr-3 mt-0.5">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
