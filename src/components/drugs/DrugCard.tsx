import React from 'react';
import { Heart, AlertTriangle, TrendingDown, TrendingUp, Pill, Droplets, Syringe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface Drug {
  id: string;
  tradeNameEn: string;
  tradeNameAr: string;
  activeIngredient: string;
  form: 'tablet' | 'syrup' | 'injection' | 'cream' | 'drops';
  currentPrice: number;
  oldPrice?: number;
  company: string;
  isNew?: boolean;
  isPopular?: boolean;
  hasInteraction?: boolean;
  isFavorite?: boolean;
}

interface DrugCardProps {
  drug: Drug;
  onFavoriteToggle?: (id: string) => void;
  onClick?: () => void;
  className?: string;
}

const formIcons = {
  tablet: Pill,
  syrup: Droplets,
  injection: Syringe,
  cream: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="6" y="4" width="12" height="16" rx="2" />
      <path d="M6 8h12" />
    </svg>
  ),
  drops: Droplets,
};

const formLabels = {
  tablet: 'Tablet',
  syrup: 'Syrup',
  injection: 'Injection',
  cream: 'Cream',
  drops: 'Drops',
};

const DrugCard: React.FC<DrugCardProps> = ({ drug, onFavoriteToggle, onClick, className }) => {
  const FormIcon = formIcons[drug.form];
  const priceChange = drug.oldPrice ? ((drug.currentPrice - drug.oldPrice) / drug.oldPrice) * 100 : 0;
  const isPriceDown = priceChange < 0;

  return (
    <div
      className={cn(
        "drug-card bg-card rounded-xl p-4 card-shadow cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {/* Header Row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground truncate">{drug.tradeNameEn}</h3>
            <div className="flex gap-1 flex-shrink-0">
              {drug.isNew && <Badge variant="new" size="sm">NEW</Badge>}
              {drug.isPopular && <Badge variant="popular" size="sm">POPULAR</Badge>}
            </div>
          </div>
          <p className="text-sm text-muted-foreground font-arabic truncate" dir="rtl">
            {drug.tradeNameAr}
          </p>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle?.(drug.id);
          }}
          className={cn(
            "p-2 rounded-full transition-all duration-200",
            drug.isFavorite 
              ? "bg-danger-soft text-danger" 
              : "bg-muted text-muted-foreground hover:bg-danger-soft hover:text-danger"
          )}
        >
          <Heart className={cn("w-4 h-4", drug.isFavorite && "fill-current")} />
        </button>
      </div>

      {/* Form & Active Ingredient */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-1.5 px-2 py-1 bg-accent rounded-md">
          <FormIcon className="w-3.5 h-3.5 text-accent-foreground" />
          <span className="text-xs font-medium text-accent-foreground">{formLabels[drug.form]}</span>
        </div>
        <span className="text-xs text-muted-foreground">•</span>
        <span className="text-xs text-muted-foreground truncate">{drug.activeIngredient}</span>
      </div>

      {/* Price Section */}
      <div className="flex items-end justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-foreground">
            {drug.currentPrice.toFixed(2)} EGP
          </span>
          {drug.oldPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {drug.oldPrice.toFixed(2)}
            </span>
          )}
        </div>
        
        {priceChange !== 0 && (
          <Badge variant={isPriceDown ? "priceDown" : "priceUp"} size="sm">
            {isPriceDown ? <TrendingDown className="w-3 h-3 mr-1" /> : <TrendingUp className="w-3 h-3 mr-1" />}
            {Math.abs(priceChange).toFixed(0)}%
          </Badge>
        )}
      </div>

      {/* Interaction Warning */}
      {drug.hasInteraction && (
        <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-danger-soft rounded-lg">
          <AlertTriangle className="w-4 h-4 text-danger flex-shrink-0" />
          <span className="text-xs font-medium text-danger">Interaction Warning</span>
        </div>
      )}
    </div>
  );
};

export default DrugCard;
