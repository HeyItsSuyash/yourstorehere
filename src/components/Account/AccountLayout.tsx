import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  User,
  ShoppingBag,
  MapPin,
  Gift,
  Tag,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const AccountLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleLogout = () => {
    logout();
    showToast('Logged out of demo session', 'info');
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard Overview', path: '/account', icon: User },
    { label: 'My Profile', path: '/account/profile', icon: User },
    { label: 'My Orders', path: '/account/orders', icon: ShoppingBag },
    { label: 'Saved Addresses', path: '/account/addresses', icon: MapPin },
    { label: 'Family Rewards (Loyalty)', path: '/account/loyalty', icon: Gift },
    { label: 'Coupons & Offers', path: '/account/coupons', icon: Tag },
    { label: 'Notifications', path: '/account/notifications', icon: Bell },
    { label: 'Help & Support', path: '/contact', icon: HelpCircle }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Account Sidebar Navigation */}
        <aside className="lg:col-span-4 bg-white rounded-xl-none p-6 border border-slate-200/80 shadow-xs space-y-6">
          {/* User Mini Profile Header */}
          <div className="flex items-center gap-3.5 pb-6 border-b border-slate-100">
            <div className="w-14 h-14 rounded-xl-none bg-[#ea580c] text-white font-black text-xl flex items-center justify-center shadow-md">
              {user?.name ? user.name.charAt(0) : 'R'}
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Welcome back
              </span>
              <h2 className="text-base font-black text-slate-900 leading-snug">
                {user?.name || 'Rahul Sharma'}
              </h2>
              <p className="text-xs text-slate-500 font-medium">{user?.phone}</p>
            </div>
          </div>

          {/* Nav List */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/account'}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl-none text-xs font-bold transition-colors ${
                      isActive
                        ? 'bg-orange-50 text-[#c2410c] border border-orange-200 shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                </NavLink>
              );
            })}

            {/* Logout button */}
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl-none text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors mt-4 pt-4 border-t border-slate-100"
            >
              <div className="flex items-center gap-3">
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </div>
            </button>
          </nav>
        </aside>

        {/* Dynamic Content Panel */}
        <main className="lg:col-span-8 bg-white rounded-xl-none p-6 sm:p-8 border border-slate-200/80 shadow-xs">
          {children}
        </main>
      </div>
    </div>
  );
};
