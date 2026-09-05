import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Zap, Flame, ShieldAlert } from 'lucide-react';

export const PromoBanners: React.FC = () => {
  return (
    <section className="my-8 grid grid-cols-1 md:grid-cols-12 gap-4">
      {/* Banner 1: Weekend Super Saver (Large Green Banner inspired by reference) */}
      <div className="md:col-span-8 relative overflow-hidden rounded-xl bg-gradient-to-r from-[#c2410c] via-[#ea580c] to-[#9a3412] text-white p-6 sm:p-8 flex flex-col justify-between shadow-md">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative z-10 max-w-md space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 text-xs font-black px-2.5 py-1 rounded-xl uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 fill-slate-950" />
            <span>LIMITED TIME OFFER</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Weekend Super Saver
          </h3>

          <p className="text-orange-100 text-xs sm:text-sm leading-relaxed">
            Stock up on family staples! Enjoy up to 30% off on premium Basmati rice, cold-pressed oils, fresh spices, and dairy. Hurry, offer valid till Sunday.
          </p>
        </div>

        <div className="relative z-10 mt-6 flex items-center justify-between">
          <Link
            to="/shop?filter=deals"
            className="inline-flex items-center gap-2 bg-[#ea580c] hover:bg-emerald-300 text-slate-950 font-black text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm"
          >
            <span>SHOP DEALS NOW</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="flex items-center gap-2 bg-slate-900/60 backdrop-blur-xs border border-[#ea580c]/60 px-3 py-1.5 rounded-xl text-xs font-bold text-orange-200">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Ends in 14h : 22m</span>
          </div>
        </div>
      </div>

      {/* Banner 2: 30 Minutes Delivery */}
      <div className="md:col-span-4 relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-emerald-50/60 border border-emerald-200 p-6 flex flex-col justify-between shadow-xs">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1 text-[#c2410c] text-xs font-bold bg-orange-100 px-2.5 py-1 rounded-xl">
            <Zap className="w-3.5 h-3.5 text-[#ea580c] fill-emerald-600" />
            <span>EXPRESS SPEED</span>
          </div>

          <h3 className="text-xl font-extrabold text-slate-900 leading-snug">
            Get Delivery in <span className="text-[#ea580c]">30 Minutes!</span>
          </h3>

          <p className="text-xs text-slate-600 leading-relaxed">
            Need urgent kitchen ingredients, snacks, or milk? Our neighborhood store delivers piping fresh to your doorstep in minutes.
          </p>
        </div>

        <div className="mt-6">
          <Link
            to="/shop"
            className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-[#c2410c] text-white font-bold text-xs py-3 px-4 rounded-xl transition-colors shadow-xs"
          >
            <span>ORDER EXPRESS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
