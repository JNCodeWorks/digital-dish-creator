
import React from 'react';
import { Recipe } from '@/types/recipe';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, ChefHat, UtensilsCrossed } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useFavorites } from '@/hooks/useFavorites';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';
import PrintButton from './PrintButton';
import StarRating from './StarRating';
import ShoppingListButton from './ShoppingListButton';
import NutritionInfo from './NutritionInfo';
import RelatedRecipes from './RelatedRecipes';

interface RecipeDetailProps {
  recipe: Recipe;
  allRecipes: Recipe[];
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, allRecipes }) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative mb-8 rounded-xl overflow-hidden shadow-lg">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-[400px] md:h-[500px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        
        {/* Action buttons positioned at the top right */}
        <div className="absolute top-4 right-4 flex gap-2">
          <FavoriteButton 
            recipeId={recipe.id} 
            isFavorite={isFavorite(recipe.id)} 
            toggleFavorite={toggleFavorite} 
            variant="circle"
            size="lg"
          />
          <ShareButton 
            title={recipe.title} 
            recipeId={recipe.id} 
            className="bg-white/80 dark:bg-black/40 backdrop-blur-sm hover:bg-white dark:hover:bg-black/60" 
          />
          <PrintButton
            recipe={recipe}
            className="bg-white/80 dark:bg-black/40 backdrop-blur-sm hover:bg-white dark:hover:bg-black/60"
          />
        </div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 text-white">
          <div className="flex flex-wrap gap-2 mb-4">
            {recipe.tags.map((tag) => (
              <Badge key={tag} className="bg-recipe-primary/90 text-white border-none hover:bg-recipe-primary">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 font-playfair text-white drop-shadow-md">{recipe.title}</h1>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              <Clock className="h-5 w-5 text-recipe-secondary" />
              <span className="text-lg font-medium">{recipe.prepTime} minutes</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              <UtensilsCrossed className="h-5 w-5 text-recipe-secondary" />
              <span className="text-lg font-medium">{recipe.cuisine} Cuisine</span>
            </div>
            
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              <StarRating initialRating={4} readonly size="sm" className="mr-1" />
              <span className="font-medium">(4.0)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2 space-y-8">
          <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
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
            
            <div className="mt-6 pt-6 border-t border-border">
              <ShoppingListButton recipe={recipe} className="w-full md:w-auto" />
            </div>
          </div>

          <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
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
        
        <div className="space-y-8">
          <NutritionInfo recipe={recipe} />
          <RelatedRecipes currentRecipe={recipe} allRecipes={allRecipes} />
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
