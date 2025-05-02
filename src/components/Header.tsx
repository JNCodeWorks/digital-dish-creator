
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="border-b py-4">
      <div className="container flex items-center justify-center">
        <Link to="/" className="text-3xl font-bold font-playfair text-recipe-dark hover:text-recipe-primary transition-colors">
          Culinary Collection
        </Link>
      </div>
    </header>
  );
};

export default Header;
