
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlusCircle, UtensilsCrossed } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="border-b py-5 bg-white shadow-sm sticky top-0 z-50">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <UtensilsCrossed className="h-7 w-7 text-recipe-primary transition-transform group-hover:rotate-12" />
          <span className="text-3xl font-bold font-playfair text-recipe-dark hover:text-recipe-primary transition-colors">
            Culinary Collection
          </span>
        </Link>
        
        <Link to="/add-recipe">
          <Button className="bg-recipe-primary hover:bg-recipe-primary/90 text-white font-medium transition-all shadow-md hover:shadow-lg">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Recipe
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
