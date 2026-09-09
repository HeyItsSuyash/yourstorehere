import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  MapPin,
  Truck,
  Phone,
  Clock,
  ChevronDown,
  User,
  ShoppingBag,
  Menu,
  X,
  Zap,
  Search,
  Globe
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { categories } from '../../data/categories';

export const Header: React.FC = () => {
  const { totalItems, subtotal } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.categories'), path: '/shop', hasDropdown: true },
    { label: t('nav.deals'), path: '/shop?filter=deals' },
    { label: t('nav.newArrivals'), path: '/shop?filter=new' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.recipes'), path: '/shop?filter=recipes' },
    { label: t('nav.contact'), path: '/contact' }
  ];

  return (
    <header className="w-full bg-[#15803d] text-white sticky top-0 z-50 shadow-md">
      {/* 1. TOP UTILITY BAR (Single row on all screens without multi-row wrapping) */}
      <div className="bg-[#166534] text-[10.5px] sm:text-[11px] py-1.5 px-3 sm:px-6 text-emerald-50 font-medium overflow-x-auto no-scrollbar whitespace-nowrap">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-3">
          {/* Left Info Items */}
          <div className="flex items-center gap-3 sm:gap-6 shrink-0">
            <span className="flex items-center gap-1.5 shrink-0">
              <MapPin className="w-3.5 h-3.5 text-emerald-200 shrink-0" />
              <span className="truncate max-w-[140px] sm:max-w-[260px] md:max-w-none">{t('top.address')}</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 shrink-0">
              <Truck className="w-3.5 h-3.5 text-emerald-200 shrink-0" />
              <span>{t('top.freeDelivery')}</span>
            </span>
          </div>

          {/* Right Info Items */}
          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            {/* Hindi / English Language Switcher Button */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/15 hover:bg-white text-white hover:text-[#166534] transition-all font-bold text-[10px] sm:text-[10.5px] cursor-pointer shrink-0"
              title="Toggle Hindi / English"
            >
              <Globe className="w-3.5 h-3.5 shrink-0" />
              <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            <a
              href="tel:09415922031"
              className="flex items-center gap-1 hover:text-white transition-colors shrink-0"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-200 shrink-0" />
              <span className="hidden xs:inline">094159 22031</span>
            </a>

            <span className="hidden lg:flex items-center gap-1.5 shrink-0">
              <Clock className="w-3.5 h-3.5 text-emerald-200 shrink-0" />
              <span>{t('top.timing')}</span>
            </span>

            {/* Social icons */}
            <div className="hidden sm:flex items-center gap-2.5 text-white/90 pl-1 shrink-0">
              <a href="#facebook" aria-label="Facebook" className="hover:text-white transition-transform">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#instagram" aria-label="Instagram" className="hover:text-white transition-transform">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#twitter" aria-label="Twitter" className="hover:text-white transition-transform">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER (Fresh Green Navbar with transparent logo & transparent text logo, NO BOXES) */}
      <div className="bg-[#15803d] py-3 px-3 sm:px-6">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-3 sm:gap-6">
          {/* Dual Brand Logo: Exact logo.png and text_logo_white.png with increased size */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <img
              src="/logo.png"
              alt="Express daily Mart Logo"
              className="h-11 w-11 sm:h-12 sm:w-12 object-contain drop-shadow-xs transition-transform"
            />
            <img
              src="/text_logo_white.png"
              alt="Express daily Mart"
              className="h-8 sm:h-9 w-auto object-contain drop-shadow-xs transition-transform"
            />
          </Link>

          {/* Center Search Bar (Smooth rounded pill, subtle & clean) */}
          <div className="hidden md:flex items-center flex-1 max-w-[540px] mx-3 lg:mx-6 bg-white rounded-full overflow-hidden h-[42px] shadow-sm">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('search.placeholder')}
              className="flex-1 px-5 text-xs text-[#222] placeholder-[#888] outline-none"
            />
            <div className="h-4 w-[1px] bg-slate-200" />
            <div className="relative px-3.5 flex items-center gap-1.5 text-xs text-[#555] cursor-pointer hover:text-[#111]">
              <span className="text-[11px] font-medium">{selectedCategory}</span>
              <ChevronDown className="w-3 h-3 text-[#777]" />
            </div>
            <Link
              to={`/search?q=${encodeURIComponent(searchQuery || 'fresh')}`}
              className="w-[44px] h-[36px] mr-1 bg-[#15803d] hover:bg-[#166534] text-white rounded-full flex items-center justify-center transition-colors shrink-0"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </Link>
          </div>

          {/* Right Area: Sign In / My Account + My Cart */}
          <div className="flex items-center gap-5 sm:gap-7 shrink-0 text-white">
            {/* Account */}
            <Link
              to={isAuthenticated ? '/account' : '/login'}
              className="flex items-center gap-2 hover:text-emerald-200 transition-colors"
            >
              <User className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
              <div className="text-left text-xs leading-tight hidden sm:block">
                <span className="text-[10px] text-emerald-200 block">
                  {isAuthenticated ? t('account.welcome') : t('account.signIn')}
                </span>
                <span className="font-bold text-white block">
                  {isAuthenticated ? user?.name.split(' ')[0] : t('account.myAccount')}
                </span>
              </div>
            </Link>

            {/* My Cart */}
            <Link
              to="/cart"
              className="flex items-center gap-2 hover:text-emerald-200 transition-colors pl-1"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
                <span className="absolute -top-1.5 -right-2 bg-white text-[#15803d] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {totalItems}
                </span>
              </div>
              <div className="text-left text-xs leading-tight hidden sm:block">
                <span className="text-[10px] text-emerald-200 block">{t('cart.myCart')}</span>
                <span className="font-extrabold text-white block">
                  ₹{subtotal}
                </span>
              </div>
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1 text-white hover:text-emerald-200 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden mt-2.5 flex items-center bg-white rounded-full overflow-hidden h-[38px] shadow-xs px-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            className="flex-1 px-3.5 text-xs text-[#222] placeholder-[#888] outline-none"
          />
          <Link
            to={`/search?q=${encodeURIComponent(searchQuery || 'fresh')}`}
            className="w-[32px] h-[32px] bg-[#15803d] text-white rounded-full flex items-center justify-center shrink-0"
            aria-label="Search"
          >
            <Search className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 3. NAVIGATION BAR (Seamless background matching navbar - NO line between navbar and shop categories) */}
      <div className="bg-[#15803d] hidden lg:block border-0 pt-0.5 pb-2">
        <div className="max-w-[1240px] mx-auto px-6 flex items-center justify-between">
          {/* Left: 'Shop by Categories' button (Smooth rounded corners, font-bold) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              className="bg-[#166534] hover:bg-[#14532d] text-white font-extrabold text-xs py-2 px-5 rounded-md flex items-center gap-2.5 transition-colors shadow-xs cursor-pointer border-0"
            >
              <Menu className="w-4 h-4" />
              <span>{t('nav.shopByCategories')}</span>
            </button>

            {/* Categories dropdown - Smooth rounded shadow */}
            {isCategoryMenuOpen && (
              <div
                onMouseLeave={() => setIsCategoryMenuOpen(false)}
                className="absolute left-0 top-full mt-1.5 w-64 bg-white rounded-xl shadow-2xl border border-slate-100 py-2 z-50 animate-fade-in-up text-[#111]"
              >
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    onClick={() => setIsCategoryMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-2.5 hover:bg-emerald-50 text-xs font-semibold text-[#333] hover:text-[#15803d] transition-colors"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded-full font-bold">{cat.itemCount}+</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Middle Nav Links */}
          <nav className="flex items-center gap-8 text-xs font-bold text-white">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`relative py-2 flex items-center gap-1 hover:text-emerald-200 transition-colors ${
                    isActive ? 'text-white underline underline-offset-8 decoration-2' : ''
                  }`}
                >
                  <span>{link.label}</span>
                  {link.hasDropdown && <ChevronDown className="w-3 h-3 text-emerald-200" />}
                </Link>
              );
            })}
          </nav>

          {/* Right: FLASH DEALS - GHOST BUTTON with white font and icons */}
          <Link
            to="/shop?filter=deals"
            className="flex items-center gap-1.5 text-xs font-bold text-white bg-transparent hover:bg-white/15 px-3.5 py-1.5 rounded-md border border-white/60 hover:border-white transition-all shadow-xs"
          >
            <Zap className="w-3.5 h-3.5 text-white" />
            <span>{t('nav.flashDeals')}</span>
          </Link>
        </div>
      </div>

      {/* 4. RESPONSIVE MOBILE MENU DRAWER */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white text-[#111] px-5 py-4 space-y-3 animate-fade-in-up shadow-xl rounded-b-2xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-black text-[#15803d] uppercase tracking-wider">Navigation Menu</span>
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-xs font-bold text-[#15803d] bg-emerald-50 px-2.5 py-1 rounded-full"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'स्विच करें: हिन्दी' : 'Switch: English'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-[#333]">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-orange-50 hover:text-[#ea580c]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <Link
              to="/shop?filter=deals"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 w-full text-xs font-black uppercase text-white bg-[#ea580c] py-2.5 rounded-lg shadow-sm"
            >
              <Zap className="w-4 h-4" />
              <span>{t('nav.flashDeals')} - UP TO 30% OFF</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
