import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, TrendingUp } from 'lucide-react';
import { products } from '../../data/products';
import { categories } from '../../data/categories';

export const SearchBar: React.FC<{
  isMobile?: boolean;
  onSearchComplete?: () => void;
}> = ({ isMobile, onSearchComplete }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    setIsOpen(false);
    navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}&cat=${selectedCategory}`);
    if (onSearchComplete) onSearchComplete();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  // Suggestions logic
  const filteredSuggestions = query.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.brand.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const popularSearches = [
    'Amul Milk',
    'Aashirvaad Atta',
    'Tata Salt',
    'Fortune Oil',
    'Maggi',
    'Parle-G',
    'Surf Excel'
  ];

  return (
    <div ref={searchRef} className="relative w-full max-w-3xl">
      <div
        className={`flex items-center bg-white rounded-xl-none border transition-all duration-200 ${
          isOpen ? 'border-orange-300 ring-2 ring-orange-100 shadow-md' : 'border-slate-300 hover:border-slate-400'
        } ${isMobile ? 'h-11 px-3.5' : 'h-12 px-4 shadow-xs'}`}
      >
        {!isMobile && (
          <div className="flex items-center pr-3 border-r border-slate-200 mr-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filter search by category"
              className="text-xs font-semibold text-slate-700 bg-transparent outline-none cursor-pointer hover:text-[#c2410c]"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search for fresh groceries, snacks, household essentials..."
          className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none"
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-xl-none hover:bg-slate-100 mr-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <button
          type="button"
          onClick={() => handleSearch(query)}
          className={`flex items-center justify-center rounded-xl-none text-white bg-[#ea580c] hover:bg-[#c2410c] transition-colors ${
            isMobile ? 'w-8 h-8' : 'w-9 h-9'
          }`}
          title="Search"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl-none shadow-xl border border-slate-100 overflow-hidden z-50 animate-in fade-in-50 duration-150">
          {query.trim().length > 0 ? (
            <div>
              {filteredSuggestions.length > 0 ? (
                <div>
                  <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-50 border-b border-slate-100">
                    Product Suggestions
                  </div>
                  {filteredSuggestions.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        navigate(`/product/${prod.id}`);
                        setIsOpen(false);
                      }}
                      className="flex items-center justify-between px-4 py-2.5 hover:bg-orange-50/60 cursor-pointer transition-colors border-b border-slate-50 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-10 h-10 object-contain rounded-xl-none bg-white p-1 border border-slate-100"
                        />
                        <div>
                          <p className="text-sm font-medium text-slate-800 line-clamp-1">
                            {prod.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {prod.brand} • {prod.unit}
                          </p>
                        </div>
                      </div>
                      <div className="text-right pl-3">
                        <span className="text-sm font-bold text-[#c2410c]">
                          ₹{prod.price}
                        </span>
                        {prod.originalPrice > prod.price && (
                          <span className="block text-xs text-slate-400 line-through">
                            ₹{prod.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  <div
                    onClick={() => handleSearch(query)}
                    className="p-3 bg-orange-50 text-[#c2410c] text-xs font-bold text-center cursor-pointer hover:bg-orange-100 flex items-center justify-center gap-1.5"
                  >
                    <span>View all matching results for &ldquo;{query}&rdquo;</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center text-slate-500 text-sm">
                  No direct products found for &ldquo;{query}&rdquo;. Press Enter to browse
                  shop catalog.
                </div>
              )}
            </div>
          ) : (
            <div className="p-4">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-2.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#ea580c]" />
                <span>POPULAR SEARCHES</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setQuery(item);
                      handleSearch(item);
                    }}
                    className="px-3 py-1.5 text-xs bg-slate-100 hover:bg-orange-100 hover:text-[#c2410c] text-slate-700 rounded-xl-none transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
