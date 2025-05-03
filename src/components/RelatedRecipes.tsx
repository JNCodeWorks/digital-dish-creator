
import React from 'react';
import { Recipe } from '@/types/recipe';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RelatedRecipesProps {
  currentRecipe: Recipe;
  allRecipes: Recipe[];
  className?: string;
}

const RelatedRecipes: React.FC<RelatedRecipesProps> = ({ 
  currentRecipe, 
  allRecipes, 
  className 
}) => {
  // Find related recipes based on cuisine and tags
  const relatedRecipes = allRecipes
    .filter(recipe => 
      // Don't include the current recipe
      recipe.id !== currentRecipe.id && 
      // Include recipes with same cuisine or at least one matching tag
      (recipe.cuisine === currentRecipe.cuisine || 
        recipe.tags.some(tag => currentRecipe.tags.includes(tag)))
    )
    .slice(0, 3); // Limit to 3 recipes
    
  if (relatedRecipes.length === 0) return null;
  
  return (
    <div className={cn('bg-white rounded-xl border border-recipe-muted p-6', className)}>
      <h3 className="text-xl font-bold mb-4 font-playfair">You might also like</h3>
      
      <div className="space-y-4">
        {relatedRecipes.map(recipe => (
          <Link 
            to={`/recipes/${recipe.id}`}
            key={recipe.id}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-recipe-muted/20 transition-colors group"
          >
            <div className="h-14 w-14 rounded overflow-hidden flex-shrink-0">
              <img 
                src={recipe.image} 
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-grow">
              <h4 className="font-medium text-recipe-dark group-hover:text-recipe-primary transition-colors">
                {recipe.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {recipe.prepTime} min • {recipe.cuisine}
              </p>
            </div>
            
            <ArrowRight 
              className="h-4 w-4 text-recipe-primary opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" 
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedRecipes;
