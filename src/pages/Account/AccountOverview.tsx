import React from 'react';
import { Link } from 'react-router-dom';
import {
  Gift,
  Tag,
  ShoppingBag,
  MapPin,
  ArrowRight,
  TrendingUp,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { AccountLayout } from '../../components/Account/AccountLayout';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';

export const AccountOverview: React.FC = () => {
  const { user, addresses } = useAuth();
  const { orders } = useOrders();

  const recentOrder = orders[0];

  return (
    <AccountLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Account Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your family profile, reward points, active deliveries, and addresses.
          </p>
        </div>

        {/* Highlight Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Card 1: Loyalty Points */}
          <div className="p-5 rounded-xl-none bg-gradient-to-br from-orange-50 to-amber-50/50 border border-orange-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#c2410c] uppercase">
                Family Points
              </span>
              <Gift className="w-5 h-5 text-[#ea580c]" />
            </div>
            <div className="text-2xl font-black text-slate-900">
              {user?.loyaltyPoints || 2450}
            </div>
            <p className="text-[11px] text-[#ea580c] font-semibold mt-1">
              Worth ₹{(user?.loyaltyPoints || 2450) / 10} on groceries
            </p>
            <Link
              to="/account/loyalty"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#c2410c] hover:underline mt-3"
            >
              <span>Redeem rewards</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Card 2: Active Coupons */}
          <div className="p-5 rounded-xl-none bg-amber-50/50 border border-amber-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-900 uppercase">
                Coupons Ready
              </span>
              <Tag className="w-5 h-5 text-amber-700" />
            </div>
            <div className="text-2xl font-black text-slate-900">4 Active</div>
            <p className="text-[11px] text-amber-800 font-semibold mt-1">
              Save up to ₹250 on next order
            </p>
            <Link
              to="/account/coupons"
              className="inline-flex items-center gap-1 text-xs font-bold text-amber-900 hover:underline mt-3"
            >
              <span>View vouchers</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Card 3: Total Orders */}
          <div className="p-5 rounded-xl-none bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 uppercase">
                All Orders
              </span>
              <ShoppingBag className="w-5 h-5 text-slate-700" />
            </div>
            <div className="text-2xl font-black text-slate-900">
              {orders.length} Orders
            </div>
            <p className="text-[11px] text-slate-500 font-semibold mt-1">
              Latest: #{recentOrder?.id || 'NFB-10482'}
            </p>
            <Link
              to="/account/orders"
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-800 hover:underline mt-3"
            >
              <span>Order history</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Most Recent Order Spotlight */}
        {recentOrder && (
          <div className="p-5 bg-white rounded-xl-none border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#ea580c]" />
                <h3 className="font-bold text-sm text-slate-900">
                  Latest Order Spotlight (#{recentOrder.id})
                </h3>
              </div>
              <span className="bg-orange-100 text-[#c2410c] text-[11px] font-bold px-2.5 py-0.5 rounded-xl-none">
                {recentOrder.status}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 text-xs pt-1">
              <div>
                <span className="text-slate-400 block">Items</span>
                <span className="font-bold text-slate-800">
                  {recentOrder.items.length} products
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Total</span>
                <span className="font-bold text-slate-800">₹{recentOrder.total}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Delivery ETA</span>
                <span className="font-bold text-[#ea580c]">
                  {recentOrder.estimatedDelivery}
                </span>
              </div>
              <Link
                to={`/track-order/${recentOrder.id}`}
                className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs px-4 py-2 rounded-xl-none"
              >
                Track Now
              </Link>
            </div>
          </div>
        )}

        {/* Saved Addresses snippet */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm text-slate-900">Primary Address</h3>
            <Link
              to="/account/addresses"
              className="text-xs font-bold text-[#ea580c] hover:underline"
            >
              Manage all ({addresses.length})
            </Link>
          </div>
          {addresses[0] && (
            <div className="p-4 rounded-xl-none bg-slate-50 border border-slate-200 text-xs text-slate-600">
              <span className="font-bold text-slate-900 block">
                {addresses[0].name} ({addresses[0].type})
              </span>
              <p className="mt-0.5">
                {addresses[0].flat}, {addresses[0].street}, {addresses[0].city} -{' '}
                {addresses[0].pincode}
              </p>
              <p className="mt-0.5 text-slate-400">Phone: {addresses[0].phone}</p>
            </div>
          )}
        </div>
      </div>
    </AccountLayout>
  );
};
