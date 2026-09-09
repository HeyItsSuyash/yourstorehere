import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Star } from 'lucide-react';
import { ProductGrid } from '../components/Product/ProductGrid';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { SEO } from '../components/SEO';

export const Shop: React.FC = () => {
  const [searchParams] = useSearchParams();

  const initialCat = searchParams.get('category') || 'all';
  const initialFilter = searchParams.get('filter') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCat);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(600);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('relevance');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Extract all unique brands
  const brands = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.brand)));
    return list.sort();
  }, []);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrands([]);
    setMaxPrice(600);
    setMinRating(0);
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }
        // Brand filter
        if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
          return false;
        }
        // Price filter
        if (p.price > maxPrice) {
          return false;
        }
        // Rating filter
        if (p.rating < minRating) {
          return false;
        }
        // Special URL filter parameters
        if (initialFilter === 'deals' && !p.isDeal) return false;
        if (initialFilter === 'bestseller' && !p.isBestSeller) return false;
        if (initialFilter === 'under99' && p.price >= 99) return false;
        if (initialFilter === 'new' && !p.isNew) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'discount') return b.discount - a.discount;
        return 0; // relevance
      });
  }, [selectedCategory, selectedBrands, maxPrice, minRating, sortBy, initialFilter]);

  return (
    <div className="w-full bg-[#f8f9f5] min-h-screen py-6 font-sans">
      <SEO
        title="Shop Groceries, Fruits & Essentials Online"
        description="Browse our complete supermarket catalog: fresh fruits, vegetables, dairy, staples, snacks, beverages and household cleaners in Gomti Nagar, Lucknow."
      />
      <div className="max-w-[1240px] mx-auto px-4">
        {/* Breadcrumb strip */}
        <div className="flex items-center gap-2 text-[11px] text-[#777] mb-4">
          <Link to="/" className="hover:text-[#16a34a]">Home</Link>
          <span>/</span>
          <span className="text-[#111] font-bold">Shop Supermarket Catalog</span>
        </div>

        {/* Header with Title & Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#e5e9df]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#111] tracking-tight">
              {initialFilter === 'deals'
                ? 'Today’s Special Deals'
                : initialFilter === 'under99'
                ? 'Family Essentials Under ₹99'
                : 'All Supermarket Groceries'}
            </h1>
            <p className="text-xs text-[#666] mt-1">
              Showing <span className="font-bold text-[#111]">{filteredProducts.length}</span> items across fresh farm aisles
            </p>
          </div>

          {/* Mobile Filter Toggle & Desktop Sort */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-[#f0fdf4] text-[#16a34a] border border-[#d8ded0] font-bold text-xs px-4 py-2.5 rounded-xl shadow-2xs"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>

            <div className="flex items-center gap-2 bg-white border border-[#d8ded0] rounded-xl px-3 py-2 text-xs font-semibold text-[#333]">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#777]" />
              <label htmlFor="shop-sort-select" className="text-[#777]">Sort by:</label>
              <select
                id="shop-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent outline-none cursor-pointer text-[#111] font-bold"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="discount">Highest Discount</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Layout: Filter Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-start">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-3 nfb-card p-5 space-y-6 sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-[#ecefe6]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#16a34a]" />
                <h3 className="font-bold text-[#111] text-xs uppercase tracking-wider">
                  Filter Products
                </h3>
              </div>
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-[#16a34a] hover:underline font-bold"
              >
                Reset
              </button>
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="text-[11px] font-black text-[#111] uppercase tracking-wider mb-2.5">
                Categories
              </h4>
              <div className="space-y-1 max-h-52 overflow-y-auto pr-1">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                    selectedCategory === 'all'
                      ? 'bg-[#f0fdf4] text-[#16a34a] font-bold'
                      : 'text-[#444] hover:bg-slate-50'
                  }`}
                >
                  <span>All Categories</span>
                  <span>{products.length}</span>
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCategory(c.slug)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                      selectedCategory === c.slug
                        ? 'bg-[#f0fdf4] text-[#16a34a] font-bold'
                        : 'text-[#444] hover:bg-slate-50'
                    }`}
                  >
                    <span className="truncate pr-2">{c.name}</span>
                    <span className="text-[10px] text-[#888]">
                      {products.filter((p) => p.category === c.slug).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range in Indian Rupees */}
            <div className="pt-2 border-t border-[#ecefe6]">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-[11px] font-black text-[#111] uppercase tracking-wider">
                  Max Price
                </h4>
                <span className="text-xs font-black text-[#16a34a]">
                  ₹{maxPrice}
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="600"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                aria-label="Filter products by maximum price"
                className="w-full accent-[#16a34a] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#888] mt-1">
                <span>₹20</span>
                <span>₹600+</span>
              </div>
            </div>

            {/* Brands Filter */}
            <div className="pt-2 border-t border-[#ecefe6]">
              <h4 className="text-[11px] font-black text-[#111] uppercase tracking-wider mb-2.5">
                Popular Brands
              </h4>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {brands.map((b) => (
                  <label
                    key={b}
                    className="flex items-center gap-2 text-xs text-[#444] cursor-pointer hover:text-[#16a34a] select-none"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(b)}
                      onChange={() => toggleBrand(b)}
                      className="rounded-xl accent-[#16a34a]"
                    />
                    <span>{b}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Customer Rating Filter */}
            <div className="pt-2 border-t border-[#ecefe6]">
              <h4 className="text-[11px] font-black text-[#111] uppercase tracking-wider mb-2">
                Customer Rating
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {[4.8, 4.7, 4.5, 4.0].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setMinRating(minRating === star ? 0 : star)}
                    className={`px-2 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 border transition-colors ${
                      minRating === star
                        ? 'bg-[#16a34a] text-white border-[#16a34a]'
                        : 'bg-white text-[#444] border-[#d8ded0] hover:bg-slate-50'
                    }`}
                  >
                    <span>{star}</span>
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>& above</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-9">
            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} columns={4} />
            ) : (
              <div className="nfb-card p-12 text-center">
                <h3 className="text-base font-black text-[#111]">No products match your filters</h3>
                <p className="text-xs text-[#666] mt-1 max-w-sm mx-auto">
                  Try adjusting your price slider or resetting selected categories and brands.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-4 nfb-btn-primary"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>
        </div>

        {/* Mobile Filters Modal */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end">
            <div className="w-full max-w-xs bg-white h-full p-5 overflow-y-auto flex flex-col justify-between animate-in slide-in-from-right">
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#ecefe6]">
                  <h3 className="font-bold text-[#111] text-sm uppercase">Filter Catalog</h3>
                  <button
                    type="button"
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1 text-[#777]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Category */}
                <div>
                  <h4 className="text-[11px] font-bold text-[#111] uppercase mb-1.5">Category</h4>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 text-xs border border-[#d8ded0] rounded-xl bg-white text-[#111]"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Mobile Price */}
                <div>
                  <div className="flex justify-between text-xs mb-1 font-bold">
                    <span>Max Price</span>
                    <span className="text-[#16a34a]">₹{maxPrice}</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="600"
                    step="10"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    aria-label="Filter products by maximum price"
                    className="w-full accent-[#16a34a]"
                  />
                  <div className="flex justify-between text-[10px] text-[#888] mt-1">
                    <span>₹20</span>
                    <span>₹600+</span>
                  </div>
                </div>

                {/* Mobile Brands */}
                <div>
                  <h4 className="text-[11px] font-bold text-[#111] uppercase mb-1.5">Brands</h4>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto">
                    {brands.map((b) => (
                      <label key={b} className="flex items-center gap-2 text-xs text-[#444]">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(b)}
                          onChange={() => toggleBrand(b)}
                          className="accent-[#16a34a]"
                        />
                        <span>{b}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#ecefe6] flex gap-2">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="flex-1 py-2 text-xs font-bold border border-[#d8ded0] rounded-xl"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-1 py-2 text-xs font-bold bg-[#16a34a] text-white rounded-xl"
                >
                  Apply ({filteredProducts.length})
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
