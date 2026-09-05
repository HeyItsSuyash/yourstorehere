import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { ProductGrid } from '../components/Product/ProductGrid';
import { categories } from '../data/categories';
import { products } from '../data/products';

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const currentCategory = categories.find((c) => c.slug === slug) || categories[0];
  const categoryProducts = products.filter((p) => p.category === currentCategory.slug);

  // Fallback if none matched
  const displayProducts =
    categoryProducts.length > 0
      ? categoryProducts
      : products.slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
        <Link to="/" className="hover:text-emerald-700">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-emerald-700">Categories</Link>
        <span>/</span>
        <span className="text-slate-800 font-semibold">{currentCategory.name}</span>
      </div>

      {/* Category Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 to-green-700 text-white p-6 sm:p-10 mb-8 shadow-md">
        <div className="relative z-10 max-w-xl space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-emerald-900/60 backdrop-blur-xs text-emerald-200 text-xs font-bold px-3 py-1 rounded-full border border-emerald-600/60">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AUTHENTIC INDIAN GROCERIES</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            {currentCategory.name}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            {currentCategory.popularItemName}. Sourced directly from reputed mills, farm cooperatives, and certified suppliers.
          </p>
        </div>

        {/* Hero Background Category Image Graphic */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-25 sm:opacity-40 pointer-events-none">
          <img
            src={currentCategory.image}
            alt={currentCategory.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Subcategory Pill chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 pr-2">
          Subcategories:
        </span>
        {['All Items', 'Farm Direct', 'Popular Picks', 'Saver Combos'].map((tab, idx) => (
          <button
            key={tab}
            type="button"
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-colors ${
              idx === 0
                ? 'bg-emerald-700 text-white shadow-2xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">
            Available Products ({displayProducts.length})
          </h2>
          <Link
            to="/shop"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Browse All Aisles</span>
          </Link>
        </div>

        <ProductGrid products={displayProducts} columns={5} />
      </div>
    </div>
  );
};
