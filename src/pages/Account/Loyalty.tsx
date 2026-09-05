import React from 'react';
import { AccountLayout } from '../../components/Account/AccountLayout';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Gift, Award, TrendingUp, Sparkles, Check, ArrowRight } from 'lucide-react';

export const Loyalty: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const points = user?.loyaltyPoints || 2450;
  const rupeeValue = Math.floor(points / 10);
  const nextTarget = 3000;
  const pointsRemaining = nextTarget - points;
  const progressPercent = Math.min(100, Math.round((points / nextTarget) * 100));

  const rewards = [
    { title: '₹50 Flat Voucher', pointsRequired: 500, minOrder: '₹499' },
    { title: '₹100 Flat Voucher', pointsRequired: 1000, minOrder: '₹899' },
    { title: '₹250 Mega Savings', pointsRequired: 2500, minOrder: '₹1499' },
    { title: 'Free Delivery for 30 Days', pointsRequired: 1200, minOrder: 'Any order' }
  ];

  const transactions = [
    { desc: 'Earned on Order #NFB-10482', points: '+120', date: 'Today' },
    { desc: 'Redeemed on Order #NFB-10390', points: '-500', date: 'Sep 1, 2026' },
    { desc: 'Monthly Loyalty Bonus', points: '+250', date: 'Aug 25, 2026' },
    { desc: 'Earned on Order #NFB-09821', points: '+180', date: 'Aug 18, 2026' }
  ];

  const handleRedeem = (title: string, cost: number) => {
    if (points < cost) {
      showToast(`Need ${cost - points} more points to unlock this reward.`, 'warning');
      return;
    }
    showToast(`Voucher for "${title}" redeemed! Added to your coupons.`, 'success');
  };

  return (
    <AccountLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Family Rewards Loyalty Program
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Every supermarket purchase brings you closer to your next grocery reward.
          </p>
        </div>

        {/* Large Loyalty Card Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-700 p-6 sm:p-8 text-white shadow-lg">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-500/40">
                GOLD FAMILY TIER
              </span>
              <h2 className="text-3xl sm:text-4xl font-black mt-2">
                {points.toLocaleString()} <span className="text-lg font-normal">Family Points</span>
              </h2>
              <p className="text-emerald-100 text-xs font-semibold">
                Direct cash equivalent: <strong>₹{rupeeValue}</strong> in grocery checkout discounts
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/20 text-center sm:text-right">
              <span className="text-xs text-emerald-200 block">Next Tier Reward</span>
              <strong className="text-white text-sm font-bold block mt-0.5">
                {pointsRemaining > 0 ? `${pointsRemaining} points until ₹300 reward` : 'Max Tier Achieved'}
              </strong>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative z-10 mt-6 pt-4 border-t border-emerald-600/60">
            <div className="flex justify-between text-xs font-bold text-emerald-100 mb-2">
              <span>Current: {points} pts</span>
              <span>Next Milestone: {nextTarget} pts</span>
            </div>
            <div className="w-full h-3 bg-emerald-950/60 rounded-full overflow-hidden p-0.5 border border-emerald-500/40">
              <div
                className="h-full bg-gradient-to-r from-amber-300 to-emerald-300 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Available Tier Rewards to Redeem */}
        <div>
          <h3 className="font-bold text-sm text-slate-900 mb-3">
            Redeemable Rewards & Vouchers
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {rewards.map((r, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between hover:border-emerald-300 transition-colors shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xs font-bold text-slate-900">{r.title}</h4>
                    <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {r.pointsRequired} pts
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">Applicable on {r.minOrder}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">
                    {points >= r.pointsRequired ? 'Ready to claim' : 'Need more points'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRedeem(r.title, r.pointsRequired)}
                    disabled={points < r.pointsRequired}
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-colors ${
                      points >= r.pointsRequired
                        ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Redeem Reward
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Points History */}
        <div className="pt-2">
          <h3 className="font-bold text-sm text-slate-900 mb-3">Recent Points History</h3>
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 divide-y divide-slate-200/70 text-xs">
            {transactions.map((t, idx) => (
              <div key={idx} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-800">{t.desc}</p>
                  <span className="text-[10px] text-slate-400">{t.date}</span>
                </div>
                <span
                  className={`font-black text-sm ${
                    t.points.startsWith('+') ? 'text-emerald-700' : 'text-slate-600'
                  }`}
                >
                  {t.points}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AccountLayout>
  );
};
