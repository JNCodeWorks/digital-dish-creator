
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="border-b py-4 bg-white shadow-sm">
      <div className="container flex items-center justify-between">
        <Link to="/" className="text-3xl font-bold font-playfair text-recipe-dark hover:text-recipe-primary transition-colors">
          Culinary Collection
        </Link>
        
        <Link to="/add-recipe">
          <Button variant="outline" className="border-recipe-primary text-recipe-primary hover:bg-recipe-primary hover:text-white transition-all">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Recipe
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
