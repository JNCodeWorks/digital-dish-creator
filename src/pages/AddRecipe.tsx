
import React from 'react';
import Header from '@/components/Header';
import AddRecipeForm from '@/components/AddRecipeForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AddRecipePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <Link to="/" className="mb-6 inline-flex items-center text-recipe-primary hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to all recipes
        </Link>
        
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 font-playfair">Create New Recipe</h1>
          <p className="text-muted-foreground">Share your culinary creation with the world</p>
        </div>
        
        <AddRecipeForm />
      </main>
    </div>
  );
};

export default AddRecipePage;
