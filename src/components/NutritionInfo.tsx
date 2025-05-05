
import React from 'react';
import { Recipe } from '@/types/recipe';

interface NutritionInfoProps {
  recipe: Recipe;
  className?: string;
}

// A simple mock function to generate nutrition info based on ingredients
// In a real app, this would come from a database or API
const generateMockNutrition = (recipe: Recipe) => {
  // Base values
  const baseValues = {
    calories: 350,
    protein: 12,
    carbs: 45,
    fat: 14,
    fiber: 5,
    sugar: 8
  };
  
  // Adjust based on number of ingredients (simple mock)
  const ingredientFactor = recipe.ingredients.length / 10;
  
  return {
    calories: Math.round(baseValues.calories * (1 + ingredientFactor * 0.5)),
    protein: Math.round(baseValues.protein * (1 + ingredientFactor * 0.2)),
    carbs: Math.round(baseValues.carbs * (1 + ingredientFactor * 0.3)),
    fat: Math.round(baseValues.fat * (1 + ingredientFactor * 0.4)),
    fiber: Math.round(baseValues.fiber * (1 + ingredientFactor * 0.1)),
    sugar: Math.round(baseValues.sugar * (1 + ingredientFactor * 0.5))
  };
};

const NutritionInfo: React.FC<NutritionInfoProps> = ({ recipe, className }) => {
  const nutrition = generateMockNutrition(recipe);
  
  return (
    <div className={`bg-card p-5 rounded-xl border border-border ${className}`}>
      <h3 className="text-lg font-semibold mb-3 font-playfair">Estimated Nutrition Facts</h3>
      <p className="text-xs text-muted-foreground mb-4">Values are approximate and per serving</p>
      
      <div className="space-y-3">
        <div className="flex justify-between border-b border-border pb-2">
          <span className="font-medium">Calories</span>
          <span>{nutrition.calories} kcal</span>
        </div>
        
        <div className="flex justify-between">
          <span>Protein</span>
          <span>{nutrition.protein}g</span>
        </div>
        
        <div className="flex justify-between">
          <span>Carbohydrates</span>
          <span>{nutrition.carbs}g</span>
        </div>
        
        <div className="flex justify-between pl-4 text-sm text-muted-foreground">
          <span>- Dietary Fiber</span>
          <span>{nutrition.fiber}g</span>
        </div>
        
        <div className="flex justify-between pl-4 text-sm text-muted-foreground">
          <span>- Sugars</span>
          <span>{nutrition.sugar}g</span>
        </div>
        
        <div className="flex justify-between border-t border-border pt-2">
          <span>Fat</span>
          <span>{nutrition.fat}g</span>
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground mt-4">
        * Nutritional information is estimated and should not be considered a substitute for professional advice.
      </p>
    </div>
  );
};

export default NutritionInfo;
