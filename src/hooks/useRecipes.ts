
import { useState, useEffect, useMemo } from 'react';
import { Recipe } from '@/types/recipe';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Fallback image for recipes with missing images
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1556909172-8c2f041fca1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1300&q=80";

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
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

  return { recipes, loading };
};

export const useFilteredRecipes = (
  recipes: Recipe[],
  searchQuery: string,
  selectedCuisines: string[],
  selectedTags: string[],
  maxPrepTime: number,
  favorites: string[] = []
) => {
  // Filter all recipes based on search query and filters
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

  // Filter favorite recipes based on the same criteria
  const filteredFavoriteRecipes = useMemo(() => {
    return filteredRecipes.filter(recipe => favorites.includes(recipe.id));
  }, [filteredRecipes, favorites]);

  return { filteredRecipes, filteredFavoriteRecipes };
};
