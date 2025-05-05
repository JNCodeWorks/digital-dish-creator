
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  PlusCircle, 
  UtensilsCrossed, 
  BookmarkCheck, 
  ShoppingCart,
  Menu
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <header className="border-b py-5 bg-card shadow-sm sticky top-0 z-50">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <UtensilsCrossed className="h-7 w-7 text-recipe-primary transition-transform group-hover:rotate-12" />
          <span className="text-3xl font-bold font-playfair text-foreground hover:text-recipe-primary transition-colors">
            {!isMobile ? "Culinary Collection" : "CC"}
          </span>
        </Link>
        
        <div className="flex items-center gap-3">
          {/* Make theme toggle visible on all screen sizes */}
          <ThemeToggle className="flex" />
          
          {/* Desktop navigation links */}
          {!isMobile ? (
            <>
              <Link to="/favorites">
                <Button 
                  variant="ghost" 
                  className="text-foreground hover:text-recipe-primary hover:bg-accent"
                >
                  <BookmarkCheck className="mr-2 h-4 w-4" />
                  Favorites
                </Button>
              </Link>
              
              <Link to="/shopping-list">
                <Button 
                  variant="ghost" 
                  className="text-foreground hover:text-recipe-primary hover:bg-accent"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Shopping List
                </Button>
              </Link>
            </>
          ) : (
            /* Mobile dropdown menu */
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/favorites" className="flex items-center w-full cursor-pointer">
                    <BookmarkCheck className="mr-2 h-4 w-4" />
                    Favorites
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/shopping-list" className="flex items-center w-full cursor-pointer">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Shopping List
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          <Link to="/add-recipe">
            <Button className="bg-recipe-primary hover:bg-recipe-primary/90 text-white font-medium transition-all shadow-md hover:shadow-lg">
              {!isMobile && <PlusCircle className="mr-2 h-4 w-4" />}
              {isMobile ? "Add" : "Add Recipe"}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
