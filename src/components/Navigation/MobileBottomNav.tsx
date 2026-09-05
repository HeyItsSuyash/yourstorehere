import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Grid, Search, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const MobileBottomNav: React.FC = () => {
  const { totalItems } = useCart();

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Categories', path: '/shop', icon: Grid },
    { label: 'Search', path: '/search', icon: Search },
    { label: 'Cart', path: '/cart', icon: ShoppingBag, badge: totalItems },
    { label: 'Account', path: '/account', icon: User }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200/90 shadow-lg px-2 py-1.5 flex justify-around items-center">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-14 py-1 rounded-xl-none transition-colors relative ${
                isActive ? 'text-[#ea580c] font-bold' : 'text-slate-500 hover:text-slate-800'
              }`
            }
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {!!item.badge && item.badge > 0 && (
                <span className="absolute -top-1.5 -right-2.5 bg-[#ea580c] text-white text-[10px] font-black w-4 h-4 rounded-xl-none flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};
