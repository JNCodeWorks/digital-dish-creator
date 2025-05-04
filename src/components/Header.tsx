
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  PlusCircle, 
  UtensilsCrossed, 
  BookmarkCheck, 
  ShoppingCart
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="border-b py-5 bg-card shadow-sm sticky top-0 z-50">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <UtensilsCrossed className="h-7 w-7 text-recipe-primary transition-transform group-hover:rotate-12" />
          <span className="text-3xl font-bold font-playfair text-foreground hover:text-recipe-primary transition-colors">
            Culinary Collection
          </span>
        </Link>
        
        <div className="flex items-center gap-3">
          <ThemeToggle className="hidden sm:flex" />
          
          <Link to="/favorites" className="hidden sm:flex">
            <Button 
              variant="ghost" 
              className="text-foreground hover:text-recipe-primary hover:bg-accent"
            >
              <BookmarkCheck className="mr-2 h-4 w-4" />
              Favorites
            </Button>
          </Link>
          
          <Link to="/shopping-list" className="hidden sm:flex">
            <Button 
              variant="ghost" 
              className="text-foreground hover:text-recipe-primary hover:bg-accent"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Shopping List
            </Button>
          </Link>
          
          <Link to="/add-recipe">
            <Button className="bg-recipe-primary hover:bg-recipe-primary/90 text-white font-medium transition-all shadow-md hover:shadow-lg">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Recipe
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
