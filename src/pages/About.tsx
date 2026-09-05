import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Sparkles, CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          <span>OUR STORY & PHILOSOPHY</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Built for Families. Made for Everyday Shopping.
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          At New Family Bazar, we believe grocery shopping should be simple, affordable, and full of fresh choices that bring Indian families together around the dinner table.
        </p>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-black text-slate-900">Direct From Farm & Mills</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We partner with regional farmers and certified mills to bring you farm-fresh greens and authentic grains without intermediaries.
          </p>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-black text-slate-900">Honest Everyday Pricing</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            No artificial markups or confusing discounts. Just steady, transparent supermarket pricing on 100% genuine brands.
          </p>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-base font-black text-slate-900">Family-First Care</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            From our quick 30-minute delivery to no-questions-asked doorstep replacements, our priority is your family&apos;s peace of mind.
          </p>
        </div>
      </div>

      {/* Our Promise Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-green-700 rounded-3xl p-8 sm:p-10 text-white text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-black">Our Promise to You</h2>
        <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto leading-relaxed">
          If any item in your grocery basket does not meet your expectations for freshness or quality, we will gladly replace it at your doorstep immediately.
        </p>
        <div className="pt-2">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-white text-emerald-900 font-bold text-xs px-6 py-3 rounded-xl shadow-md hover:bg-emerald-50"
          >
            <span>START YOUR GROCERY RUN</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
