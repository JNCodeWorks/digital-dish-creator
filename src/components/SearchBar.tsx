
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="relative group">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 group-hover:text-recipe-primary transition-colors" />
      <Input
        type="text"
        placeholder="Search recipes or ingredients..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="pl-12 py-6 h-auto text-lg bg-white border-recipe-muted rounded-xl focus-visible:ring-recipe-primary shadow-sm hover:shadow transition-shadow"
      />
    </div>
  );
};

export default SearchBar;
