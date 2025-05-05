
import React from 'react';
import SearchBar from '@/components/SearchBar';

interface RecipeBannerProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const RecipeBanner: React.FC<RecipeBannerProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="w-full relative overflow-hidden z-10">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556911073-a517e752729c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center after:absolute after:inset-0 after:bg-black/20 dark:after:bg-black/50"></div>
      <div className="container py-12 md:py-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-white font-playfair drop-shadow-md">
            Culinary Collection
          </h1>
          <p className="text-white/90 text-base md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
            Discover delicious recipes from around the world, perfectly crafted for every occasion and taste.
          </p>
          <div className="max-w-lg mx-auto bg-white/10 p-2 rounded-xl backdrop-blur-md">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeBanner;
