
import React, { useState, useMemo, useEffect } from 'react';
import RecipeCard from '@/components/RecipeCard';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';
import Header from '@/components/Header';
import { Recipe } from '@/types/recipe';
import { supabase } from '@/integrations/supabase/client';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import { Filter, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

// Fallback image for recipes with missing images
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1556909172-8c2f041fca1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1300&q=80";

// Number of recipes to display per page
const RECIPES_PER_PAGE = 9;

const Index: React.FC = () => {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [maxPrepTime, setMaxPrepTime] = useState<number>(90); // Default to max value
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  // Fetch recipes from Supabase
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('recipes')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        if (data) {
          // Transform the data to match our Recipe type and ensure valid images
          const transformedRecipes: Recipe[] = data.map(recipe => ({
            id: recipe.id,
            title: recipe.title,
            image: recipe.image && recipe.image.trim() !== '' 
              ? recipe.image 
              : FALLBACK_IMAGE, // Use fallback image if missing
            ingredients: recipe.ingredients,
            steps: recipe.steps,
            cuisine: recipe.cuisine,
            tags: recipe.tags,
            prepTime: recipe.prep_time,
            author: recipe.author || undefined,
            createdAt: recipe.created_at || undefined
          }));
          
          setRecipes(transformedRecipes);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
        toast({
          title: "Failed to load recipes",
          description: "Please try again later",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecipes();
  }, [toast]);
  
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
  
  // Calculate total number of pages
  const totalPages = Math.ceil(filteredRecipes.length / RECIPES_PER_PAGE);
  
  // Get current recipes for the page
  const currentRecipes = useMemo(() => {
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

  // Generate page numbers for pagination display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Show at most 5 page numbers
    
    if (totalPages <= maxPagesToShow) {
      // If total pages are less than maxPagesToShow, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page, last page, current page, and one page before and after current
      let startPage = Math.max(1, currentPage - 1);
      let endPage = Math.min(totalPages, currentPage + 1);
      
      // Adjust if we're at the start or end
      if (currentPage <= 2) {
        endPage = Math.min(totalPages, maxPagesToShow - startPage + 1);
      } else if (currentPage >= totalPages - 1) {
        startPage = Math.max(1, totalPages - maxPagesToShow + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis if needed
      if (startPage > 1) {
        pageNumbers.unshift(-1); // Use -1 to represent ellipsis at the start
        pageNumbers.unshift(1);  // Always include first page
      }
      
      if (endPage < totalPages) {
        pageNumbers.push(-2); // Use -2 to represent ellipsis at the end
        pageNumbers.push(totalPages); // Always include last page
      }
    }
    
    return pageNumbers;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Banner Section - After the header but with a lower z-index */}
      <div className="w-full bg-gradient-to-r from-recipe-dark via-recipe-primary to-orange-400 relative overflow-hidden z-10">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1556909172-8c2f041fca1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1300&q=80')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="container py-12 md:py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-white font-playfair drop-shadow-md">
              Culinary Collection
            </h1>
            <p className="text-white/90 text-base md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
              Discover delicious recipes from around the world, perfectly crafted for every occasion and taste.
            </p>
            <div className="max-w-lg mx-auto bg-white/10 p-2 rounded-xl backdrop-blur-md">
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>
          </div>
        </div>
      </div>
      
      <main className="container py-8 md:py-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader2 className="h-10 w-10 animate-spin text-recipe-primary mb-4" />
            <p className="text-muted-foreground">Loading recipes...</p>
          </div>
        ) : (
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
              {filteredRecipes.length > 0 ? (
                <div className="flex flex-col space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentRecipes.map(recipe => (
                      <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                  </div>
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Pagination className="mt-8">
                      <PaginationContent>
                        {currentPage > 1 && (
                          <PaginationItem>
                            <PaginationPrevious 
                              onClick={() => handlePageChange(currentPage - 1)}
                              className="cursor-pointer"
                            />
                          </PaginationItem>
                        )}
                        
                        {getPageNumbers().map((pageNumber, index) => (
                          <PaginationItem key={index}>
                            {pageNumber === -1 || pageNumber === -2 ? (
                              <span className="flex h-9 w-9 items-center justify-center">...</span>
                            ) : (
                              <PaginationLink
                                className="cursor-pointer"
                                isActive={currentPage === pageNumber}
                                onClick={() => handlePageChange(pageNumber)}
                              >
                                {pageNumber}
                              </PaginationLink>
                            )}
                          </PaginationItem>
                        ))}
                        
                        {currentPage < totalPages && (
                          <PaginationItem>
                            <PaginationNext 
                              onClick={() => handlePageChange(currentPage + 1)}
                              className="cursor-pointer"
                            />
                          </PaginationItem>
                        )}
                      </PaginationContent>
                    </Pagination>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center p-8 bg-white rounded-xl border border-recipe-muted">
                  <p className="text-xl font-medium mb-2 font-playfair">No recipes found</p>
                  <p className="text-muted-foreground">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
