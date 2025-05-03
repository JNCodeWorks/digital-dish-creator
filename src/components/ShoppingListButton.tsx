
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Recipe } from '@/types/recipe';
import { useToast } from '@/hooks/use-toast';

interface ShoppingListButtonProps {
  recipe: Recipe;
  className?: string;
}

const ShoppingListButton: React.FC<ShoppingListButtonProps> = ({ recipe, className }) => {
  const { toast } = useToast();

  const addToShoppingList = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    // Get existing shopping list from local storage
    const existingList = localStorage.getItem('shoppingList');
    let shoppingList: Record<string, string[]> = {};
    
    if (existingList) {
      try {
        shoppingList = JSON.parse(existingList);
      } catch (error) {
        console.error('Error parsing shopping list from localStorage:', error);
      }
    }
    
    // Add recipe ingredients to shopping list
    shoppingList[recipe.id] = {
      ...shoppingList[recipe.id],
      title: recipe.title,
      ingredients: recipe.ingredients
    };
    
    // Save back to local storage
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    
    // Show confirmation toast
    toast({
      title: "Added to Shopping List",
      description: `Ingredients for ${recipe.title} added to your shopping list`,
      duration: 3000,
    });
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className={className}
      onClick={addToShoppingList}
    >
      <ShoppingCart className="h-4 w-4 mr-2" />
      Add to Shopping List
    </Button>
  );
};

export default ShoppingListButton;
