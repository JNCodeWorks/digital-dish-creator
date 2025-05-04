
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RecipeDetail from "./pages/RecipeDetail";
import AddRecipe from "./pages/AddRecipe";
import NotFound from "./pages/NotFound";
import ShoppingList from "./pages/ShoppingList";
import Favorites from "./pages/Favorites";
import { useMigration } from "./scripts/useMigration";

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Migration wrapper component
const AppContent = () => {
  // This will run the migration automatically when the app loads
  const { migrationComplete, migrationInProgress } = useMigration();
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/recipes/:id" element={<RecipeDetail />} />
      <Route path="/add-recipe" element={<AddRecipe />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/shopping-list" element={<ShoppingList />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
