import React from 'react';
import { Star, ShieldCheck, HeartHandshake, Award } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Sarah J. (Bellandur)',
      comment:
        'New Family Bazar has made grocery shopping so easy and convenient. The quality of fresh veggies and Amul milk is top-notch, and delivery is super fast!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
    },
    {
      name: 'Venkatesh Rao (HSR Layout)',
      comment:
        'Genuine Indian brands, honest pricing, and pristine packing. Their stone-ground atta and Tata sampann pulses are always fresh.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
    },
    {
      name: 'Pooja Agarwal (Koramangala)',
      comment:
        'The Family Rewards points are a great perk! Saved ₹250 on my monthly grocery basket effortlessly. Strongly recommend to every family.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <section className="my-10 bg-white rounded-xl border border-slate-200/80 p-6 sm:p-8">
      <div className="text-center max-w-xl mx-auto mb-8">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
          Trusted by 50,000+ Happy Families
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          See why your neighbors trust New Family Bazar for their daily kitchen & home supplies
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reviews.map((r, i) => (
          <div
            key={i}
            className="p-5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between hover:border-orange-200 transition-colors"
          >
            <div>
              <div className="flex items-center gap-1 mb-3 text-amber-500">
                {Array.from({ length: r.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                &ldquo;{r.comment}&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-3 mt-4 pt-3 border-t border-slate-200/60">
              <img
                src={r.avatar}
                alt={r.name}
                className="w-10 h-10 rounded-xl object-cover border border-orange-200"
              />
              <div>
                <h4 className="text-xs font-bold text-slate-900">{r.name}</h4>
                <div className="flex items-center gap-1 text-[10px] text-[#ea580c] font-semibold">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified Buyer</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
