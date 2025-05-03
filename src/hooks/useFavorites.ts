
import { useState, useEffect } from 'react';

// Define the favorites hook to manage favorite recipes
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Load favorites from local storage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      try {
        const parsedFavorites = JSON.parse(storedFavorites);
        if (Array.isArray(parsedFavorites)) {
          setFavorites(parsedFavorites);
        }
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error);
      }
    }
  }, []);
  
  // Save favorites to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);
  
  // Toggle a recipe's favorite status
  const toggleFavorite = (recipeId: string) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(recipeId)) {
        return prevFavorites.filter(id => id !== recipeId);
      } else {
        return [...prevFavorites, recipeId];
      }
    });
  };
  
  // Check if a recipe is favorited
  const isFavorite = (recipeId: string) => {
    return favorites.includes(recipeId);
  };
  
  return { favorites, toggleFavorite, isFavorite };
};
