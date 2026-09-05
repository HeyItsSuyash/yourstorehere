import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AccountLayout } from '../../components/Account/AccountLayout';
import { useOrders } from '../../context/OrderContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { Clock, Truck, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';

export const Orders: React.FC = () => {
  const { orders } = useOrders();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [filterTab, setFilterTab] = useState<'All' | 'Processing' | 'Out for Delivery' | 'Delivered'>('All');

  const filteredOrders = orders.filter((o) => {
    if (filterTab === 'All') return true;
    return o.status === filterTab;
  });

  return (
    <AccountLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            My Supermarket Orders
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track active deliveries, download invoices, or re-order weekly staples with one click.
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 border-b border-slate-100">
          {(['All', 'Processing', 'Out for Delivery', 'Delivered'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilterTab(tab)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-colors ${
                filterTab === tab
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 hover:border-emerald-300 transition-colors shadow-2xs"
              >
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <span className="font-mono font-black text-xs text-slate-900 block">
                      Order #{order.id}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Placed on {new Date(order.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.status === 'Out for Delivery'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Items preview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-contain bg-slate-50 rounded-xl p-1 border"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-800 line-clamp-1">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {item.unit} • Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer and Actions */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-slate-400">Total Paid:</span>{' '}
                    <strong className="text-slate-900 font-extrabold text-sm">
                      ₹{order.total}
                    </strong>{' '}
                    <span className="text-slate-400">({order.paymentMethod})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/track-order/${order.id}`}
                      className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-2xs"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Track Order</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        showToast(`Items from #${order.id} added to basket!`);
                      }}
                      className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-3 py-2 rounded-xl"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Buy Again</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-sm font-semibold text-slate-600">
                No orders found under &ldquo;{filterTab}&rdquo;.
              </p>
            </div>
          )}
        </div>
      </div>
    </AccountLayout>
  );
};
