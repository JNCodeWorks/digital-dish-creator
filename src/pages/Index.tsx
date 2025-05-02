
import React, { useState, useMemo } from 'react';
import RecipeCard from '@/components/RecipeCard';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';
import Header from '@/components/Header';
import { Recipe } from '@/types/recipe';
import recipeData from '@/data/recipes.json';

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
      
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-center font-playfair">Discover Delicious Recipes</h1>
          <p className="text-center text-muted-foreground mb-6">Find the perfect recipe for any occasion</p>
          <div className="max-w-lg mx-auto">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1 p-4 bg-white rounded-lg shadow-sm border">
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
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <p className="text-xl font-medium mb-2">No recipes found</p>
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
