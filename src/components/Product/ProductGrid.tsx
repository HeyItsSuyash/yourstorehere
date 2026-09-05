import React from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '../../types';

interface ProductGridProps {
  products: Product[];
  columns?: 3 | 4 | 5 | 6;
  isLoading?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  columns = 5,
  isLoading = false
}) => {
  const getGridColClass = () => {
    switch (columns) {
      case 3:
        return 'grid-cols-2 md:grid-cols-3';
      case 4:
        return 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
      case 6:
        return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6';
      case 5:
      default:
        return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5';
    }
  };

  if (isLoading) {
    return (
      <div className={`grid ${getGridColClass()} gap-3 sm:gap-4`}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl-none p-4 border border-slate-100 animate-pulse flex flex-col justify-between h-72"
          >
            <div className="bg-slate-200 h-32 rounded-xl-none w-full" />
            <div className="space-y-2 mt-4">
              <div className="bg-slate-200 h-3 w-1/3 rounded-xl" />
              <div className="bg-slate-200 h-4 w-5/6 rounded-xl" />
              <div className="bg-slate-200 h-3 w-1/2 rounded-xl" />
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="bg-slate-200 h-5 w-16 rounded-xl" />
              <div className="bg-slate-200 h-8 w-16 rounded-xl-none" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid ${getGridColClass()} gap-3 sm:gap-4`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
