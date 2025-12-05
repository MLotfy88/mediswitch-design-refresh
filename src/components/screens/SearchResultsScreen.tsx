import React, { useState } from 'react';
import { ArrowLeft, SlidersHorizontal, X } from 'lucide-react';
import SearchBar from '@/components/layout/SearchBar';
import DrugCard, { Drug } from '@/components/drugs/DrugCard';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const mockSearchResults: Drug[] = [
  {
    id: '1',
    tradeNameEn: 'Panadol Extra',
    tradeNameAr: 'بانادول اكسترا',
    activeIngredient: 'Paracetamol + Caffeine',
    form: 'tablet',
    currentPrice: 45.50,
    oldPrice: 52.00,
    company: 'GSK',
    isNew: true,
  },
  {
    id: '2',
    tradeNameEn: 'Panadol Advance',
    tradeNameAr: 'بانادول ادفانس',
    activeIngredient: 'Paracetamol 500mg',
    form: 'tablet',
    currentPrice: 38.00,
    company: 'GSK',
    isPopular: true,
  },
  {
    id: '3',
    tradeNameEn: 'Panadol Cold & Flu',
    tradeNameAr: 'بانادول كولد اند فلو',
    activeIngredient: 'Paracetamol + Pseudoephedrine',
    form: 'tablet',
    currentPrice: 55.00,
    company: 'GSK',
    hasInteraction: true,
  },
  {
    id: '4',
    tradeNameEn: 'Panadol Night',
    tradeNameAr: 'بانادول نايت',
    activeIngredient: 'Paracetamol + Diphenhydramine',
    form: 'tablet',
    currentPrice: 62.50,
    oldPrice: 68.00,
    company: 'GSK',
  },
  {
    id: '5',
    tradeNameEn: 'Panadol Syrup',
    tradeNameAr: 'بانادول شراب',
    activeIngredient: 'Paracetamol 120mg/5ml',
    form: 'syrup',
    currentPrice: 28.00,
    company: 'GSK',
    isNew: true,
  },
];

const filterOptions = [
  { id: 'all', label: 'All' },
  { id: 'tablet', label: 'Tablets' },
  { id: 'syrup', label: 'Syrups' },
  { id: 'injection', label: 'Injections' },
];

interface SearchResultsScreenProps {
  initialQuery?: string;
  onBack?: () => void;
  onDrugClick?: (id: string) => void;
}

const SearchResultsScreen: React.FC<SearchResultsScreenProps> = ({
  initialQuery = 'Panadol',
  onBack,
  onDrugClick,
}) => {
  const [searchValue, setSearchValue] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState('all');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredResults = mockSearchResults.filter(
    (drug) => activeFilter === 'all' || drug.form === activeFilter
  );

  return (
    <div className="pb-24 bg-background min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-surface/95 backdrop-blur-lg border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <button 
            onClick={onBack}
            className="p-2 rounded-xl bg-accent hover:bg-accent/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex-1">
            <SearchBar
              value={searchValue}
              onChange={setSearchValue}
              onFilterClick={() => setShowFilters(!showFilters)}
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="px-4 pb-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {filterOptions.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                  activeFilter === filter.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-foreground hover:bg-accent/80"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="px-4 py-3 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{filteredResults.length}</span> results for "{searchValue}"
        </p>
        <button className="flex items-center gap-1 text-sm text-primary font-medium">
          <SlidersHorizontal className="w-4 h-4" />
          Sort
        </button>
      </div>

      {/* Results List */}
      <div className="px-4 space-y-3">
        {filteredResults.map((drug, index) => (
          <div
            key={drug.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <DrugCard
              drug={{ ...drug, isFavorite: favorites.has(drug.id) }}
              onFavoriteToggle={toggleFavorite}
              onClick={() => onDrugClick?.(drug.id)}
            />
          </div>
        ))}
      </div>

      {/* No Results State */}
      {filteredResults.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
            <X className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No results found</h3>
          <p className="text-sm text-muted-foreground text-center">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResultsScreen;
