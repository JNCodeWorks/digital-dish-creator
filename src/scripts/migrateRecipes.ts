
import { Recipe } from '../types/recipe';
import recipeData from '../data/recipes.json';
import { supabase } from '../integrations/supabase/client';
import additionalRecipes from './additionalRecipes';

// Combines existing recipes with new ones
const allRecipes = [
  ...recipeData as Recipe[],
  ...additionalRecipes
];

// Function to migrate recipes to Supabase
export const migrateRecipes = async () => {
  try {
    // First, check if migration is needed
    const { count, error: countError } = await supabase
      .from('recipes')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      throw countError;
    }
    
    // If we already have recipes in the database, don't migrate
    if (count && count > 0) {
      console.log('Recipes already exist in the database, skipping migration');
      return;
    }
    
    console.log(`Starting migration of ${allRecipes.length} recipes...`);
    
    // Transform recipes to match database schema
    const recipesForDb = allRecipes.map(recipe => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      cuisine: recipe.cuisine,
      tags: recipe.tags,
      prep_time: recipe.prepTime,
      author: recipe.author || null,
    }));
    
    // Insert recipes in batches to avoid request size limits
    const batchSize = 20;
    for (let i = 0; i < recipesForDb.length; i += batchSize) {
      const batch = recipesForDb.slice(i, i + batchSize);
      const { error } = await supabase
        .from('recipes')
        .insert(batch);
      
      if (error) {
        console.error('Error inserting batch:', error);
        throw error;
      }
      
      console.log(`Migrated batch ${i/batchSize + 1} of ${Math.ceil(recipesForDb.length/batchSize)}`);
    }
    
    console.log('Recipe migration complete');
    return true;
  } catch (error) {
    console.error('Error during migration:', error);
    throw error;
  }
};
