import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ShoppingBag, ArrowRight } from 'lucide-react';
import { ProductGrid } from '../components/Product/ProductGrid';
import { products } from '../data/products';

export const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const categoryFilter = searchParams.get('cat') || 'all';

  const matches = products.filter((p) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;

    const matchesText =
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q));

    const matchesCat =
      categoryFilter === 'all' || p.category.toLowerCase() === categoryFilter.toLowerCase();

    return matchesText && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <Link to="/" className="hover:text-emerald-700">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Search Results</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          Search results for &ldquo;<span className="text-emerald-700">{query}</span>&rdquo;
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Found <span className="font-bold text-slate-800">{matches.length}</span> matching products
        </p>
      </div>

      {/* Grid or Empty State */}
      <div className="mt-8">
        {matches.length > 0 ? (
          <ProductGrid products={matches} columns={5} />
        ) : (
          <div className="bg-white rounded-xl-none p-12 text-center border border-slate-200/80 max-w-md mx-auto space-y-4 shadow-xs">
            <div className="w-16 h-16 rounded-xl-none bg-emerald-50 text-emerald-700 mx-auto flex items-center justify-center">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              No products found for &ldquo;{query}&rdquo;
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Check the spelling, try more general terms (e.g. &ldquo;milk&rdquo;, &ldquo;atta&rdquo;, &ldquo;oil&rdquo;), or explore our full catalog.
            </p>
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-3 rounded-xl-none shadow-xs"
              >
                <span>Browse All Supermarket Items</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Recommended Section if empty or low matches */}
      {matches.length < 4 && (
        <section className="mt-16 pt-8 border-t border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            Popular Recommended Items
          </h2>
          <ProductGrid products={products.slice(0, 5)} columns={5} />
        </section>
      )}
    </div>
  );
};
