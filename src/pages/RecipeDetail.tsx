
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import RecipeDetailComponent from '@/components/RecipeDetail';
import { Recipe } from '@/types/recipe';
import recipeData from '@/data/recipes.json';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';

const RecipeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const recipes = recipeData as Recipe[];
  
  // Find the recipe with the matching ID
  const recipe = recipes.find(r => r.id === id);

  // If no recipe is found, show an error message
  if (!recipe) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-12">
          <div className="text-center max-w-md mx-auto bg-white p-8 rounded-xl shadow-md border border-recipe-muted">
            <ChefHat className="h-12 w-12 text-recipe-primary mx-auto mb-4 opacity-50" />
            <h1 className="text-2xl font-bold mb-4 font-playfair">Recipe not found</h1>
            <p className="text-muted-foreground mb-6">The recipe you're looking for doesn't seem to exist.</p>
            <Link to="/">
              <Button className="bg-recipe-primary hover:bg-recipe-primary/90">Back to Recipes</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <Link to="/" className="mb-8 inline-flex items-center text-recipe-primary hover:text-recipe-primary/80 transition-colors font-medium">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to all recipes
        </Link>
        <RecipeDetailComponent recipe={recipe} />
      </main>
    </div>
  );
};

export default RecipeDetailPage;
