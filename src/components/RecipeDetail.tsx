
import React from 'react';
import { Recipe } from '@/types/recipe';
import { Badge } from '@/components/ui/badge';
import { Clock, ChefHat, UtensilsCrossed } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface RecipeDetailProps {
  recipe: Recipe;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative mb-8 rounded-xl overflow-hidden shadow-lg">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-[400px] md:h-[500px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 text-white">
          <div className="flex flex-wrap gap-2 mb-4">
            {recipe.tags.map((tag) => (
              <Badge key={tag} className="bg-recipe-primary/90 text-white border-none hover:bg-recipe-primary">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 font-playfair text-white drop-shadow-md">{recipe.title}</h1>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              <Clock className="h-5 w-5 text-recipe-secondary" />
              <span className="text-lg font-medium">{recipe.prepTime} minutes</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              <UtensilsCrossed className="h-5 w-5 text-recipe-secondary" />
              <span className="text-lg font-medium">{recipe.cuisine} Cuisine</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-recipe-muted">
          <div className="flex items-center gap-2 mb-6">
            <UtensilsCrossed className="h-6 w-6 text-recipe-primary" />
            <h2 className="text-2xl font-bold font-playfair">Ingredients</h2>
          </div>
          <ul className="space-y-4">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-3 h-3 mt-1.5 mr-3 bg-recipe-primary rounded-full flex-shrink-0"></span>
                <span className="text-lg">{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-recipe-muted">
          <div className="flex items-center gap-2 mb-6">
            <ChefHat className="h-6 w-6 text-recipe-primary" />
            <h2 className="text-2xl font-bold font-playfair">Instructions</h2>
          </div>
          <ol className="space-y-6">
            {recipe.steps.map((step, index) => (
              <li key={index} className="flex">
                <span className="flex-shrink-0 w-8 h-8 bg-recipe-primary text-white rounded-full flex items-center justify-center mr-4 font-semibold mt-0.5">
                  {index + 1}
                </span>
                <span className="text-lg">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
