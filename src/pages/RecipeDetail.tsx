
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import RecipeDetailComponent from '@/components/RecipeDetail';
import { Recipe } from '@/types/recipe';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChefHat, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRecipes } from '@/hooks/useRecipes';

const RecipeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { recipes } = useRecipes();
  
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('recipes')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          throw error;
        }
        
        if (data) {
          // Transform the data to match our Recipe type
          const transformedRecipe: Recipe = {
            id: data.id,
            title: data.title,
            image: data.image,
            ingredients: data.ingredients,
            steps: data.steps,
            cuisine: data.cuisine,
            tags: data.tags,
            prepTime: data.prep_time,
            author: data.author || undefined,
            createdAt: data.created_at || undefined
          };
          
          setRecipe(transformedRecipe);
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
        toast({
          title: "Failed to load recipe",
          description: "Please try again later",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchRecipe();
    }
  }, [id, toast]);

  // If loading, show a loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-12">
          <div className="flex flex-col items-center justify-center h-64">
            <Loader2 className="h-10 w-10 animate-spin text-recipe-primary mb-4" />
            <p className="text-muted-foreground">Loading recipe...</p>
          </div>
        </main>
      </div>
    );
  }

  // If no recipe is found, show an error message
  if (!recipe) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-12">
          <div className="text-center max-w-md mx-auto bg-card p-8 rounded-xl shadow-md border border-border">
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
        <RecipeDetailComponent recipe={recipe} allRecipes={recipes} />
      </main>
    </div>
  );
};

export default RecipeDetailPage;
