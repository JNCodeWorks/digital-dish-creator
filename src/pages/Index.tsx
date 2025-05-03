
import React, { useState } from 'react';
import Header from '@/components/Header';
import FilterPanel from '@/components/FilterPanel';
import RecipeBanner from '@/components/RecipesBanner';
import RecipeGrid from '@/components/RecipeGrid';
import PaginationControls from '@/components/Pagination';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from '@/hooks/use-mobile';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRecipes, useFilteredRecipes } from '@/hooks/useRecipes';
import { useFavorites } from '@/hooks/useFavorites';

// Number of recipes to display per page
const RECIPES_PER_PAGE = 9;

const Index: React.FC = () => {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [maxPrepTime, setMaxPrepTime] = useState<number>(90);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  
  const isMobile = useIsMobile();
  const { recipes, loading } = useRecipes();
  const { favorites } = useFavorites();
  
  // Filter recipes based on search query and filter selections
  const { filteredRecipes } = useFilteredRecipes(
    recipes, 
    searchQuery, 
    selectedCuisines, 
    selectedTags, 
    maxPrepTime
  );
  
  // Calculate total number of pages
  const totalPages = Math.ceil(filteredRecipes.length / RECIPES_PER_PAGE);
  
  // Get current recipes for the page
  const currentRecipes = React.useMemo(() => {
    const indexOfLastRecipe = currentPage * RECIPES_PER_PAGE;
    const indexOfFirstRecipe = indexOfLastRecipe - RECIPES_PER_PAGE;
    return filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  }, [filteredRecipes, currentPage]);
  
  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Banner Section */}
      <RecipeBanner searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <main className="container py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Mobile Filter Button & Sheet */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="mb-4 w-full flex items-center gap-2 lg:hidden">
                  <Filter size={18} />
                  <span>Filter Recipes</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85%] sm:w-[350px] overflow-y-auto">
                <div className="h-full py-6 pr-6">
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
                </div>
              </SheetContent>
            </Sheet>
          )}
          
          {/* Desktop Filter Panel */}
          {!isMobile && (
            <aside className="lg:col-span-1 p-6 bg-white rounded-xl shadow-sm border border-recipe-muted sticky top-28 self-start max-h-[calc(100vh-120px)] overflow-y-auto hidden lg:block">
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
          )}
          
          <div className="lg:col-span-3">
            <div className="flex flex-col space-y-8">
              <RecipeGrid recipes={currentRecipes} loading={loading} />
              
              {/* Pagination Controls */}
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
