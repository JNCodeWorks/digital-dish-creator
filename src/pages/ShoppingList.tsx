
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface ShoppingListItem {
  recipeId: string;
  title: string;
  ingredients: string[];
  checked: boolean[];
}

const ShoppingList: React.FC = () => {
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Load shopping list from localStorage
  useEffect(() => {
    const loadShoppingList = () => {
      try {
        const savedList = localStorage.getItem('shoppingList');
        if (savedList) {
          const parsedList = JSON.parse(savedList);
          const formattedList: ShoppingListItem[] = [];
          
          Object.keys(parsedList).forEach(recipeId => {
            const recipe = parsedList[recipeId];
            formattedList.push({
              recipeId,
              title: recipe.title,
              ingredients: recipe.ingredients,
              checked: new Array(recipe.ingredients.length).fill(false)
            });
          });
          
          setShoppingList(formattedList);
        }
      } catch (error) {
        console.error('Error loading shopping list:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadShoppingList();
  }, []);
  
  // Save shopping list to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      const saveFormat: Record<string, any> = {};
      
      shoppingList.forEach(item => {
        saveFormat[item.recipeId] = {
          title: item.title,
          ingredients: item.ingredients
        };
      });
      
      localStorage.setItem('shoppingList', JSON.stringify(saveFormat));
    }
  }, [shoppingList, isLoading]);
  
  // Toggle ingredient checked state
  const toggleIngredientChecked = (recipeIndex: number, ingredientIndex: number) => {
    const updatedList = [...shoppingList];
    updatedList[recipeIndex].checked[ingredientIndex] = !updatedList[recipeIndex].checked[ingredientIndex];
    setShoppingList(updatedList);
  };
  
  // Remove recipe from shopping list
  const removeRecipeFromList = (recipeId: string) => {
    const updatedList = shoppingList.filter(item => item.recipeId !== recipeId);
    setShoppingList(updatedList);
    
    toast({
      title: "Removed from shopping list",
      description: "Recipe ingredients have been removed",
      duration: 3000,
    });
  };
  
  // Clear the entire shopping list
  const clearShoppingList = () => {
    setShoppingList([]);
    localStorage.removeItem('shoppingList');
    
    toast({
      title: "Shopping list cleared",
      description: "All items have been removed from your list",
      duration: 3000,
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <Link to="/" className="mb-6 inline-flex items-center text-recipe-primary hover:text-recipe-primary/80 transition-colors font-medium">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to recipes
        </Link>
        
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold font-playfair">Shopping List</h1>
          
          {shoppingList.length > 0 && (
            <Button 
              variant="outline" 
              onClick={clearShoppingList} 
              className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear List
            </Button>
          )}
        </div>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="h-10 w-10 border-4 border-t-recipe-primary rounded-full animate-spin"></div>
            <p className="mt-4 text-muted-foreground">Loading shopping list...</p>
          </div>
        ) : shoppingList.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-xl font-medium mb-2 font-playfair">Your shopping list is empty</h2>
            <p className="text-muted-foreground mb-6">Add ingredients from recipe pages to build your shopping list</p>
            <Link to="/">
              <Button>Browse Recipes</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {shoppingList.map((recipe, recipeIndex) => (
              <div 
                key={recipe.recipeId} 
                className="bg-white rounded-xl border border-recipe-muted p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <Link 
                      to={`/recipes/${recipe.recipeId}`} 
                      className="text-xl font-semibold font-playfair hover:text-recipe-primary transition-colors"
                    >
                      {recipe.title}
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">
                      {recipe.ingredients.length} ingredients
                    </p>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeRecipeFromList(recipe.recipeId)}
                    className="text-muted-foreground hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {recipe.ingredients.map((ingredient, ingredientIndex) => (
                    <div
                      key={ingredientIndex}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`${recipe.recipeId}-${ingredientIndex}`}
                        checked={recipe.checked[ingredientIndex]}
                        onCheckedChange={() => toggleIngredientChecked(recipeIndex, ingredientIndex)}
                      />
                      <label
                        htmlFor={`${recipe.recipeId}-${ingredientIndex}`}
                        className={`text-sm ${
                          recipe.checked[ingredientIndex] ? 'line-through text-muted-foreground' : ''
                        }`}
                      >
                        {ingredient}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ShoppingList;
