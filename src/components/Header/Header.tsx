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
    <header className="w-full bg-[#f8f9f5] border-b border-[#e5e9e0] text-[#1c1c1c] sticky top-0 z-50">
      {/* 1. TOP UTILITY BAR (Exact 1:1 match with template.jpg + Language Switcher & Social SVGs) */}
      <div className="border-b border-[#ecefe6] text-[11px] py-1.5 px-3 sm:px-4 text-[#4a4a4a] bg-[#f8f9f5]">
        <div className="max-w-[1240px] mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left Info Items */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-8">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#1b5e20] shrink-0" />
              <span className="truncate max-w-[200px] sm:max-w-none">{t('top.address')}</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#1b5e20] shrink-0" />
              <span>{t('top.freeDelivery')}</span>
            </span>
          </div>

          {/* Right Info Items */}
          <div className="flex items-center gap-3 sm:gap-6 ml-auto sm:ml-0">
            {/* Hindi / English Language Switcher Button */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-[#246b19]/30 text-[#246b19] hover:bg-[#246b19] hover:text-white transition-all font-bold text-[10.5px] cursor-pointer shadow-2xs"
              title="Toggle Hindi / English"
            >
              <Globe className="w-3 h-3" />
              <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            <a
              href="tel:09415922031"
              className="hidden sm:flex items-center gap-1.5 hover:text-[#1b5e20] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#1b5e20] shrink-0" />
              <span>094159 22031</span>
            </a>
            <span className="hidden lg:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#1b5e20] shrink-0" />
              <span>{t('top.timing')}</span>
            </span>

            {/* Social icons - Clean SVGs instead of plain letters */}
            <div className="flex items-center gap-1.5 text-[#444] pl-1">
              {/* Facebook */}
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-5 h-5 rounded-full hover:bg-[#246b19] hover:text-white flex items-center justify-center transition-colors p-0.5"
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-5 h-5 rounded-full hover:bg-[#246b19] hover:text-white flex items-center justify-center transition-colors p-0.5"
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              {/* Twitter / X */}
              <a
                href="#twitter"
                aria-label="Twitter"
                className="w-5 h-5 rounded-full hover:bg-[#246b19] hover:text-white flex items-center justify-center transition-colors p-0.5"
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Pinterest */}
              <a
                href="#pinterest"
                aria-label="Pinterest"
                className="w-5 h-5 rounded-full hover:bg-[#246b19] hover:text-white flex items-center justify-center transition-colors p-0.5"
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.373-.056.232-.186.281-.43.168-1.609-.748-2.614-3.097-2.614-4.987 0-4.062 2.951-7.794 8.512-7.794 4.468 0 7.943 3.184 7.943 7.438 0 4.441-2.799 8.016-6.684 8.016-1.305 0-2.533-.679-2.953-1.482l-.804 3.064c-.291 1.111-1.077 2.503-1.604 3.364 1.199.369 2.474.57 3.799.57 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER (Logo, Search, Account, Cart) */}
      <div className="bg-white py-3 sm:py-3.5 px-3 sm:px-4">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-3 sm:gap-4">
          {/* Logo with official white typography logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="h-9 px-2.5 rounded-lg bg-[#246b19] flex items-center justify-center shadow-xs transition-transform group-hover:scale-[1.02]">
              <img
                src="/text_logo_white.png"
                alt="New Family Bazar"
                className="h-6 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Center Search Bar (Visible on md and up) */}
          <div className="hidden md:flex items-center flex-1 max-w-[560px] mx-3 lg:mx-4 border border-[#e0e4d9] rounded-md overflow-hidden h-[42px] focus-within:border-[#246b19] transition-colors">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('search.placeholder')}
              className="flex-1 px-3.5 text-xs text-[#222] placeholder-[#888] outline-none"
            />
            <div className="h-5 w-[1px] bg-[#e0e4d9]" />
            <div className="relative px-3 flex items-center gap-1.5 text-xs text-[#444] cursor-pointer hover:text-[#111]">
              <span className="text-[11px] font-medium">{selectedCategory}</span>
              <ChevronDown className="w-3 h-3 text-[#777]" />
            </div>
            <Link
              to={`/search?q=${encodeURIComponent(searchQuery || 'fresh')}`}
              className="w-[44px] h-full bg-[#255f1a] hover:bg-[#1b4b12] text-white flex items-center justify-center transition-colors shrink-0"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </Link>
          </div>

          {/* Right Area: Sign In / My Account + My Cart (Rupees Display) */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            {/* Account */}
            <Link
              to={isAuthenticated ? '/account' : '/login'}
              className="flex items-center gap-2 text-[#222] hover:text-[#246b19] transition-colors"
            >
              <User className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
              <div className="text-left text-xs leading-tight hidden sm:block">
                <span className="text-[10px] text-[#777] block">
                  {isAuthenticated ? t('account.welcome') : t('account.signIn')}
                </span>
                <span className="font-bold text-[#111] block">
                  {isAuthenticated ? user?.name.split(' ')[0] : t('account.myAccount')}
                </span>
              </div>
            </Link>

            {/* My Cart (Changed from $ to ₹ Indian Rupees) */}
            <Link
              to="/cart"
              className="flex items-center gap-2 text-[#222] hover:text-[#246b19] transition-colors pl-1"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
                <span className="absolute -top-1.5 -right-2 bg-[#255f1a] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse-glow">
                  {totalItems}
                </span>
              </div>
              <div className="text-left text-xs leading-tight hidden sm:block">
                <span className="text-[10px] text-[#777] block">{t('cart.myCart')}</span>
                <span className="font-black text-[#111] block">
                  ₹{subtotal}
                </span>
              </div>
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1 text-[#222] hover:text-[#246b19] transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (Visible on mobile screens) */}
        <div className="md:hidden mt-2.5 flex items-center border border-[#e0e4d9] rounded-md overflow-hidden h-[38px] focus-within:border-[#246b19]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            className="flex-1 px-3 text-xs text-[#222] placeholder-[#888] outline-none"
          />
          <Link
            to={`/search?q=${encodeURIComponent(searchQuery || 'fresh')}`}
            className="w-[40px] h-full bg-[#255f1a] text-white flex items-center justify-center shrink-0"
            aria-label="Search"
          >
            <Search className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 3. NAVIGATION BAR */}
      <div className="bg-white border-t border-[#f0f2eb] hidden lg:block">
        <div className="max-w-[1240px] mx-auto px-4 flex items-center justify-between">
          {/* Left: 'Shop by Categories' button with rounded corners */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              className="bg-[#1e5215] hover:bg-[#184211] text-white font-bold text-xs py-2.5 px-4 rounded-md flex items-center gap-2.5 transition-colors shadow-2xs cursor-pointer"
            >
              <Menu className="w-4 h-4" />
              <span>{t('nav.shopByCategories')}</span>
            </button>

            {/* Categories dropdown */}
            {isCategoryMenuOpen && (
              <div
                onMouseLeave={() => setIsCategoryMenuOpen(false)}
                className="absolute left-0 top-full mt-1 w-64 bg-white rounded-lg shadow-xl border border-[#e5e9e0] py-1.5 z-50 animate-fade-in-up"
              >
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    onClick={() => setIsCategoryMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-2 hover:bg-[#f6f8f2] text-xs font-medium text-[#333] hover:text-[#1e5215]"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-[#888]">{cat.itemCount}+</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Middle Nav Links with green active indicator bar */}
          <nav className="flex items-center gap-8 text-xs font-semibold text-[#2b2b2b]">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`relative py-3 flex items-center gap-1 hover:text-[#246b19] transition-colors ${
                    isActive ? 'text-[#246b19] font-bold' : ''
                  }`}
                >
                  <span>{link.label}</span>
                  {link.hasDropdown && <ChevronDown className="w-3 h-3 text-[#777]" />}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#246b19] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: FLASH DEALS with lightning bolt badge */}
          <Link
            to="/shop?filter=deals"
            className="flex items-center gap-1.5 text-[11px] font-black uppercase text-[#246b19] bg-[#f0f6ec] hover:bg-[#e4eedc] px-3 py-1.5 rounded-md transition-colors"
          >
            <Zap className="w-3.5 h-3.5 text-[#246b19] fill-[#246b19]" />
            <span>{t('nav.flashDeals')}</span>
          </Link>
        </div>
      </div>

      {/* 4. RESPONSIVE MOBILE MENU DRAWER */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#e0e4d9] px-4 py-4 space-y-3 animate-fade-in-up shadow-lg">
          <div className="flex items-center justify-between pb-2 border-b border-[#ecefe6]">
            <span className="text-xs font-bold text-[#1e5215] uppercase tracking-wider">Navigation Menu</span>
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-xs font-bold text-[#246b19] bg-[#f0f6ec] px-2.5 py-1 rounded-full"
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
                className="p-2 rounded-md hover:bg-[#f6f8f2] hover:text-[#246b19]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-[#ecefe6]">
            <Link
              to="/shop?filter=deals"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 w-full text-xs font-black uppercase text-white bg-[#246b19] py-2.5 rounded-md"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>{t('nav.flashDeals')} - UP TO 30% OFF</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

