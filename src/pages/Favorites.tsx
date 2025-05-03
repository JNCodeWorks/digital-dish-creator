
import React from 'react';
import Header from '@/components/Header';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookmarkCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/useFavorites';
import { useRecipes } from '@/hooks/useRecipes';
import RecipeGrid from '@/components/RecipeGrid';

const Favorites: React.FC = () => {
  const { favorites } = useFavorites();
  const { recipes, loading } = useRecipes();
  
  // Filter recipes based on favorites
  const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id));
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <Link to="/" className="mb-6 inline-flex items-center text-recipe-primary hover:text-recipe-primary/80 transition-colors font-medium">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to recipes
        </Link>
        
        <h1 className="text-3xl font-bold mb-8 font-playfair">My Favorite Recipes</h1>
        
        {loading ? (
          <RecipeGrid recipes={[]} loading={true} />
        ) : favoriteRecipes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <BookmarkCheck className="h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-xl font-medium mb-2 font-playfair">No favorite recipes yet</h2>
            <p className="text-muted-foreground mb-6">
              Browse recipes and click the bookmark icon to add them to your favorites
            </p>
            <Link to="/">
              <Button>Browse Recipes</Button>
            </Link>
          </div>
        ) : (
          <RecipeGrid recipes={favoriteRecipes} loading={false} />
        )}
      </main>
    </div>
  );
};

export default Favorites;
