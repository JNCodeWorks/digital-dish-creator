import React from 'react';
import { useForm } from 'react-hook-form';
import { PlusCircle, Plus, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Recipe } from '@/types/recipe';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const recipeSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  image: z.string().url({ message: "Please enter a valid image URL" }),
  cuisine: z.string().min(2, { message: "Cuisine is required" }),
  prepTime: z.number().min(1, { message: "Prep time must be at least 1 minute" }),
  ingredients: z.array(z.string().min(2, { message: "Ingredient must be at least 2 characters" })),
  steps: z.array(z.string().min(5, { message: "Step must be at least 5 characters" })),
  tags: z.array(z.string())
});

type FormValues = z.infer<typeof recipeSchema>;

const AddRecipeForm: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [ingredients, setIngredients] = React.useState<string[]>([]);
  const [steps, setSteps] = React.useState<string[]>([]);
  const [tags, setTags] = React.useState<string[]>([]);
  const [newIngredient, setNewIngredient] = React.useState('');
  const [newStep, setNewStep] = React.useState('');
  const [newTag, setNewTag] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: '',
      image: '',
      cuisine: '',
      prepTime: 30,
      ingredients: [],
      steps: [],
      tags: []
    }
  });

  const addIngredient = () => {
    if (newIngredient.trim().length > 1) {
      setIngredients([...ingredients, newIngredient]);
      setNewIngredient('');
    }
  };

  const removeIngredient = (index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const addStep = () => {
    if (newStep.trim().length > 4) {
      setSteps([...steps, newStep]);
      setNewStep('');
    }
  };

  const removeStep = (index: number) => {
    const updatedSteps = [...steps];
    updatedSteps.splice(index, 1);
    setSteps(updatedSteps);
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  const onSubmit = async (data: FormValues) => {
    // Add the arrays to the form data
    data.ingredients = ingredients;
    data.steps = steps;
    data.tags = tags;
    
    setIsSubmitting(true);
    
    try {
      // Insert the recipe into Supabase
      const { data: insertedData, error } = await supabase
        .from('recipes')
        .insert({
          title: data.title,
          image: data.image,
          cuisine: data.cuisine,
          prep_time: data.prepTime,
          ingredients: data.ingredients,
          steps: data.steps,
          tags: data.tags,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      // Show success message
      toast({
        title: "Recipe Created",
        description: "Your recipe has been saved successfully!",
      });
      
      // Reset form
      form.reset();
      setIngredients([]);
      setSteps([]);
      setTags([]);
      
      // Navigate to the recipe detail page if we have the inserted ID
      if (insertedData && insertedData.id) {
        navigate(`/recipes/${insertedData.id}`);
      } else {
        // If for some reason we don't have the ID, navigate to the home page
        navigate('/');
      }
    } catch (error) {
      console.error('Error saving recipe:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem saving your recipe. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-card rounded-lg shadow-sm border border-border">
      <h2 className="text-2xl font-bold mb-6 font-playfair">Add New Recipe</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipe Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter recipe title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cuisine"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cuisine</FormLabel>
                  <FormControl>
                    <Input placeholder="Italian, Mexican, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="prepTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preparation Time (minutes)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="30" 
                      min={1} 
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                      value={field.value} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Ingredients</h3>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Add an ingredient"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addIngredient();
                  }
                }}
              />
              <Button type="button" onClick={addIngredient} className="bg-recipe-primary">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <ul className="space-y-2">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center justify-between bg-recipe-muted p-2 rounded">
                  <span>{ingredient}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeIngredient(index)}
                    className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-transparent"
                  >
                    &times;
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Steps</h3>
            <div className="space-y-2">
              <Textarea
                placeholder="Add a step instruction"
                value={newStep}
                onChange={(e) => setNewStep(e.target.value)}
                className="min-h-[100px]"
              />
              <Button 
                type="button" 
                onClick={addStep} 
                className="bg-recipe-primary w-full"
              >
                Add Step
              </Button>
            </div>
            
            <ol className="space-y-3">
              {steps.map((step, index) => (
                <li key={index} className="bg-recipe-muted p-3 rounded flex gap-2">
                  <span className="flex-shrink-0 w-6 h-6 bg-recipe-primary text-white rounded-full flex items-center justify-center mt-0.5">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p>{step}</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeStep(index)}
                      className="mt-2 h-7 text-red-500 hover:text-red-700 hover:bg-transparent p-0"
                    >
                      Remove
                    </Button>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tags</h3>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Add a tag (e.g., Vegan)"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <Button type="button" onClick={addTag} className="bg-recipe-primary">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span key={index} className="bg-recipe-secondary text-recipe-dark px-3 py-1 rounded-full inline-flex items-center gap-1">
                  {tag}
                  <button 
                    type="button"
                    onClick={() => removeTag(index)}
                    className="text-recipe-dark hover:text-recipe-primary"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-recipe-primary hover:bg-recipe-primary/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving Recipe...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Recipe
              </>
            )}
          </Button>
          
          <div className="text-center text-sm text-muted-foreground mt-4">
            <p>Your recipe will be saved to Supabase and displayed in the app.</p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddRecipeForm;
