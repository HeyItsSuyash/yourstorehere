import React, { useState } from 'react';
import { AccountLayout } from '../../components/Account/AccountLayout';
import { Bell, Check, Trash2, Clock, Sparkles } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'order' | 'points' | 'deal';
}

export const Notifications: React.FC = () => {
  const { showToast } = useToast();

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      title: 'Order Out for Delivery',
      message: 'Your order #NFB-10482 is out for delivery. Rider Manoj will arrive in ~20 mins.',
      time: '15 mins ago',
      read: false,
      type: 'order'
    },
    {
      id: '2',
      title: '120 Family Points Credited!',
      message: 'You have earned 120 points on your morning basket order.',
      time: '2 hours ago',
      read: false,
      type: 'points'
    },
    {
      id: '3',
      title: 'Fresh Shimla Apples Arrived',
      message: 'New batch of crisp Royal Delicious apples are in stock at 20% off.',
      time: '1 day ago',
      read: true,
      type: 'deal'
    },
    {
      id: '4',
      title: 'Coupon Expiring Soon',
      message: 'Your ₹100 OFF coupon "SAVE100" can be redeemed on your next grocery basket.',
      time: '2 days ago',
      read: true,
      type: 'deal'
    }
  ]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const clearAll = () => {
    setNotifications([]);
    showToast('Notifications cleared');
  };

  return (
    <AccountLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Notification Center
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Updates on your active orders, reward points, and grocery sales.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={markAllRead}
              className="text-xs font-bold text-emerald-700 hover:underline"
            >
              Mark all read
            </button>
            <span className="text-slate-300">•</span>
            <button
              type="button"
              onClick={clearAll}
              className="text-xs font-bold text-slate-400 hover:text-rose-600"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-4 rounded-xl-none border transition-all flex items-start gap-3.5 ${
                  n.read
                    ? 'bg-white border-slate-200'
                    : 'bg-emerald-50/40 border-emerald-300 ring-1 ring-emerald-200'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl-none flex items-center justify-center shrink-0 ${
                    n.type === 'order'
                      ? 'bg-amber-100 text-amber-800'
                      : n.type === 'points'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  <Bell className="w-4 h-4" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {n.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {n.message}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-xl-none border border-slate-100">
              <p className="text-sm font-semibold text-slate-500">
                You have no notifications right now.
              </p>
            </div>
          )}
        </div>
      </div>
    </AccountLayout>
  );
};
