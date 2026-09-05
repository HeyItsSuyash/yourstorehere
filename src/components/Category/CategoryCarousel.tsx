import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { categories } from '../../data/categories';

export const CategoryCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="my-8">
      <div className="flex items-center justify-between mb-4 px-1">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            Shop by Category
          </h2>
          <p className="text-xs md:text-sm text-slate-500 font-medium">
            Handpicked fresh groceries and daily family essentials
          </p>
        </div>

        {/* Carousel Prev/Next Buttons */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="w-8 h-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors shadow-2xs"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors shadow-2xs"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-3 md:gap-4 overflow-x-auto no-scrollbar pb-3 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/category/${cat.slug}`}
            className="shrink-0 w-28 sm:w-36 md:w-40 group flex flex-col items-center bg-white rounded-xl p-3 border border-slate-200/70 hover:border-[#ea580c] hover:shadow-md transition-all duration-200 hover:-translate-y-1"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-orange-50/60 p-1 flex items-center justify-center  transition-transform duration-200 border border-orange-100">
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#ea580c] text-center line-clamp-2 mt-2 leading-tight">
              {cat.name}
            </span>
            <span className="text-[10px] text-slate-400 font-semibold mt-1">
              {cat.itemCount}+ Items
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};
