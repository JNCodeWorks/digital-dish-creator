
import React from 'react';
import { Recipe } from '@/types/recipe';
import RecipeCard from '@/components/RecipeCard';
import { Loader2 } from 'lucide-react';

interface RecipeGridProps {
  recipes: Recipe[];
  loading: boolean;
}

const RecipeGrid: React.FC<RecipeGridProps> = ({ recipes, loading }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="h-10 w-10 animate-spin text-recipe-primary mb-4" />
        <p className="text-muted-foreground">Loading recipes...</p>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center p-8 bg-white rounded-xl border border-recipe-muted">
        <p className="text-xl font-medium mb-2 font-playfair">No recipes found</p>
        <p className="text-muted-foreground">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeGrid;
