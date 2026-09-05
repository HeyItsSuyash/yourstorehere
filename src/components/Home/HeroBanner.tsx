import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  return (
    <div className="my-4">
      {/* Main Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-50 via-emerald-100/40 to-green-50 border border-emerald-200/70 p-6 sm:p-10 lg:p-12 shadow-xs">
        {/* Subtle background circles */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 rounded-full bg-emerald-200/30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-60 h-60 rounded-full bg-green-200/30 blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-xs border border-emerald-300 text-emerald-800 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-2xs">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>FRESHNESS YOU CAN TRUST • BEST INDIAN BRANDS</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Everything Your Family Needs,{' '}
              <span className="text-emerald-700 block mt-1">Under One Roof.</span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base max-w-xl leading-relaxed">
              Shop fresh farm produce, pure dairy, chakki atta, pulses, edible oils, snacks, personal care, and household essentials at guaranteed everyday low prices.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-2xl shadow-md shadow-emerald-800/20 transition-all hover:scale-[1.02] active:scale-95"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/shop?filter=deals"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base px-6 py-3.5 rounded-2xl border border-slate-300 transition-all hover:border-emerald-600"
              >
                <span>VIEW TODAY&apos;S DEALS</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Graphic Composition */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Discount Badge */}
            <div className="absolute -top-3 left-4 sm:left-8 z-20 bg-emerald-700 text-white rounded-full w-20 h-20 sm:w-24 sm:h-24 flex flex-col items-center justify-center shadow-xl border-4 border-white transform -rotate-6 hover:rotate-0 transition-transform">
              <span className="text-[10px] font-bold uppercase tracking-wider">UP TO</span>
              <span className="text-xl sm:text-2xl font-black leading-none">30%</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">OFF</span>
            </div>

            {/* Main Grocery Composition Image */}
            <div className="relative w-full max-w-md aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80"
                alt="Fresh Groceries in Basket - New Family Bazar"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-4">
                <p className="text-white text-xs font-semibold drop-shadow-md">
                  100% Quality Checked Fruits, Vegetables & Staples
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators Bar below Hero */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-4">
        <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-800">Fresh & Quality</h3>
            <p className="text-[11px] text-slate-500">Handpicked farm produce</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-800">Fast 30-Min Delivery</h3>
            <p className="text-[11px] text-slate-500">Free on orders above ₹499</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-800">100% Secure Payments</h3>
            <p className="text-[11px] text-slate-500">UPI, Cards & Cash on Delivery</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-800">Easy Returns</h3>
            <p className="text-[11px] text-slate-500">Instant doorstep refund/replacement</p>
          </div>
        </div>
      </div>
    </div>
  );
};
