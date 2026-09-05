import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight, Clock, MapPin, Truck } from 'lucide-react';
import { useOrders } from '../context/OrderContext';

export const OrderSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || 'NFB-10482';
  const { getOrderById } = useOrders();

  const order = getOrderById(orderId);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md text-center space-y-6">
        {/* Animated Check */}
        <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full mx-auto flex items-center justify-center shadow-inner">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Order Confirmed
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 pt-2">
            Order Placed Successfully!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Thank you for shopping with New Family Bazar. Your groceries are being picked from our fresh inventory.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 text-left space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Order Reference</span>
              <p className="font-mono font-black text-sm text-slate-900">#{orderId}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Amount</span>
              <p className="font-black text-sm text-emerald-800">
                ₹{order ? order.total : 587}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-600">
            <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              Estimated Delivery: <strong>Today, within 45 minutes</strong>
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-600">
            <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="line-clamp-1">
              Delivering to: {order?.deliveryAddress?.flat || 'Flat 402, Sunshine Heights'},{' '}
              {order?.deliveryAddress?.city || 'Bengaluru'}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            to={`/track-order/${orderId}`}
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm py-3.5 px-6 rounded-2xl shadow-md transition-all active:scale-95"
          >
            <Truck className="w-4 h-4" />
            <span>TRACK YOUR ORDER</span>
          </Link>
          <Link
            to="/shop"
            className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm py-3.5 px-6 rounded-2xl border border-slate-300 transition-all hover:border-emerald-600"
          >
            <span>CONTINUE SHOPPING</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
