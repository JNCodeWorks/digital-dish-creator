
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Recipe } from '@/types/recipe';
import { Separator } from '@/components/ui/separator';

interface FilterPanelProps {
  recipes: Recipe[];
  selectedCuisines: string[];
  setSelectedCuisines: (cuisines: string[]) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  maxPrepTime: number;
  setMaxPrepTime: (time: number) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  recipes,
  selectedCuisines,
  setSelectedCuisines,
  selectedTags,
  setSelectedTags,
  maxPrepTime,
  setMaxPrepTime,
}) => {
  // Extract unique cuisines from recipes
  const uniqueCuisines = Array.from(new Set(recipes.map(recipe => recipe.cuisine)));
  
  // Extract unique tags from recipes
  const uniqueTags = Array.from(new Set(recipes.flatMap(recipe => recipe.tags)));
  
  // Find maximum prep time in recipes
  const highestPrepTime = Math.max(...recipes.map(recipe => recipe.prepTime));

  // Handle cuisine checkbox changes
  const handleCuisineChange = (cuisine: string) => {
    if (selectedCuisines.includes(cuisine)) {
      setSelectedCuisines(selectedCuisines.filter(c => c !== cuisine));
    } else {
      setSelectedCuisines([...selectedCuisines, cuisine]);
    }
  };

  // Handle tag checkbox changes
  const handleTagChange = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Handle prep time slider changes
  const handlePrepTimeChange = (value: number[]) => {
    setMaxPrepTime(value[0]);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 font-playfair text-recipe-dark">Cuisine</h3>
        <div className="space-y-3">
          {uniqueCuisines.map(cuisine => (
            <div key={cuisine} className="flex items-center space-x-3 group">
              <Checkbox 
                id={`cuisine-${cuisine}`} 
                checked={selectedCuisines.includes(cuisine)}
                onCheckedChange={() => handleCuisineChange(cuisine)}
                className="border-recipe-muted data-[state=checked]:bg-recipe-primary data-[state=checked]:border-recipe-primary"
              />
              <Label 
                htmlFor={`cuisine-${cuisine}`} 
                className="cursor-pointer group-hover:text-recipe-primary transition-colors"
              >
                {cuisine}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <Separator className="bg-recipe-muted/50" />
      
      <div>
        <h3 className="text-lg font-semibold mb-4 font-playfair text-recipe-dark">Tags</h3>
        <div className="space-y-3">
          {uniqueTags.map(tag => (
            <div key={tag} className="flex items-center space-x-3 group">
              <Checkbox 
                id={`tag-${tag}`} 
                checked={selectedTags.includes(tag)}
                onCheckedChange={() => handleTagChange(tag)}
                className="border-recipe-muted data-[state=checked]:bg-recipe-primary data-[state=checked]:border-recipe-primary"
              />
              <Label 
                htmlFor={`tag-${tag}`} 
                className="cursor-pointer group-hover:text-recipe-primary transition-colors"
              >
                {tag}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <Separator className="bg-recipe-muted/50" />
      
      <div>
        <h3 className="text-lg font-semibold mb-4 font-playfair text-recipe-dark">Prep Time</h3>
        <div className="space-y-6 px-2">
          <Slider 
            defaultValue={[highestPrepTime]} 
            max={highestPrepTime} 
            step={5} 
            value={[maxPrepTime]}
            onValueChange={handlePrepTimeChange}
            className="w-full"
          />
          <div className="flex justify-between">
            <span className="font-medium text-recipe-primary">≤ {maxPrepTime} minutes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
