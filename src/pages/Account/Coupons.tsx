import React from 'react';
import { AccountLayout } from '../../components/Account/AccountLayout';
import { initialCoupons } from '../../data/initialData';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { Tag, Copy, Check, Clock } from 'lucide-react';

export const Coupons: React.FC = () => {
  const { applyCoupon } = useCart();
  const { showToast } = useToast();

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    showToast(`Code "${code}" copied to clipboard!`, 'info');
  };

  const handleApply = (code: string) => {
    const res = applyCoupon(code);
    showToast(res.message, res.success ? 'success' : 'warning');
  };

  return (
    <AccountLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Coupons & Supermarket Deals
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Apply these promo codes during checkout or in your shopping basket to save big.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {initialCoupons.map((coupon) => (
            <div
              key={coupon.code}
              className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-emerald-400 transition-all shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-sm font-black text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-xl tracking-wider">
                    {coupon.code}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Valid till Dec 2026
                  </span>
                </div>

                <h3 className="text-sm font-black text-slate-900">{coupon.title}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {coupon.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(coupon.code)}
                  className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleApply(coupon.code)}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-2xs transition-colors"
                >
                  Apply in Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AccountLayout>
  );
};
