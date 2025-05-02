
import React, { useState, useMemo } from 'react';
import RecipeCard from '@/components/RecipeCard';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';
import Header from '@/components/Header';
import { Recipe } from '@/types/recipe';
import recipeData from '@/data/recipes.json';
import { UtensilsCrossed } from 'lucide-react';

const Index: React.FC = () => {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [maxPrepTime, setMaxPrepTime] = useState<number>(90); // Default to max value
  
  // Cast the imported JSON to Recipe[] type
  const recipes = recipeData as Recipe[];
  
  // Filter recipes based on search query and filter selections
  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      // Check if recipe matches search query
      const matchesSearch = 
        searchQuery === '' || 
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Check if recipe matches selected cuisines
      const matchesCuisine = 
        selectedCuisines.length === 0 || 
        selectedCuisines.includes(recipe.cuisine);
      
      // Check if recipe matches selected tags
      const matchesTags = 
        selectedTags.length === 0 || 
        selectedTags.some(tag => recipe.tags.includes(tag));
      
      // Check if recipe prep time is within selected max time
      const matchesPrepTime = recipe.prepTime <= maxPrepTime;
      
      // Return true only if recipe matches all criteria
      return matchesSearch && matchesCuisine && matchesTags && matchesPrepTime;
    });
  }, [recipes, searchQuery, selectedCuisines, selectedTags, maxPrepTime]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Banner Section */}
      <div className="w-full bg-gradient-to-r from-recipe-dark via-recipe-primary to-orange-400 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1556909172-8c2f041fca1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1300&q=80')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="container py-16 md:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white font-playfair drop-shadow-md">
              Culinary Collection
            </h1>
            <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
              Discover delicious recipes from around the world, perfectly crafted for every occasion and taste.
            </p>
            <div className="max-w-lg mx-auto bg-white/10 p-2 rounded-xl backdrop-blur-md">
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>
          </div>
        </div>
      </div>
      
      <main className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 p-6 bg-white rounded-xl shadow-sm border border-recipe-muted sticky top-28 self-start max-h-[calc(100vh-120px)] overflow-y-auto">
            <h2 className="text-xl font-playfair font-semibold mb-6">Filter Recipes</h2>
            <FilterPanel 
              recipes={recipes}
              selectedCuisines={selectedCuisines}
              setSelectedCuisines={setSelectedCuisines}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              maxPrepTime={maxPrepTime}
              setMaxPrepTime={setMaxPrepTime}
            />
          </aside>
          
          <div className="lg:col-span-3">
            {filteredRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map(recipe => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center p-8 bg-white rounded-xl border border-recipe-muted">
                <p className="text-xl font-medium mb-2 font-playfair">No recipes found</p>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
