
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import RecipeDetailComponent from '@/components/RecipeDetail';
import { Recipe } from '@/types/recipe';
import recipeData from '@/data/recipes.json';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
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
        <main className="container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Recipe not found</h1>
            <Link to="/">
              <Button>Back to Recipes</Button>
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
        <Link to="/" className="mb-6 inline-flex items-center text-recipe-primary hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to all recipes
        </Link>
        <RecipeDetailComponent recipe={recipe} />
      </main>
    </div>
  );
};

export default RecipeDetailPage;
