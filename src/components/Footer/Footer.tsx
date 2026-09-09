import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-[#1c1917] text-white text-sm pt-16 pb-20 md:pb-12 border-t-2 border-[#ea580c] font-sans">
      <div className="max-w-[1240px] mx-auto px-6 space-y-12">
        {/* Main 5 columns matching supermarket layout with fresh green brand theme */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 items-start">
          {/* Col 1: Brand (lg:col-span-3) - Shopping cart illustration + 'Your Store Here' */}
          <div className="lg:col-span-3 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-2xl bg-white/15 backdrop-blur-xs border border-white/25 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                <img
                  src="/logo.svg"
                  alt="Shopping Cart Logo"
                  className="h-7 w-7 sm:h-8 sm:w-8 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-extrabold text-lg sm:text-xl tracking-tight leading-tight uppercase font-sans">
                  Your Store Here
                </span>
                <span className="text-[10px] text-orange-300 uppercase tracking-widest font-semibold">
                  Daily Supermarket
                </span>
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-orange-100/85 leading-relaxed max-w-xs font-normal">
              {t('footer.tagline')}
            </p>
            {/* Social Icons - Clean without enclosing box */}
            <div className="flex items-center gap-4 pt-2 text-white/90">
              <a
                href="#facebook"
                aria-label="Facebook"
                className="hover:text-white  transition-transform"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#instagram"
                aria-label="Instagram"
                className="hover:text-white  transition-transform"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#twitter"
                aria-label="Twitter"
                className="hover:text-white  transition-transform"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-orange-200">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-100/80 font-normal">
              <li><Link to="/" className="hover:text-white transition-colors">{t('nav.home')}</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">{t('nav.categories')}</Link></li>
              <li><Link to="/shop?filter=deals" className="hover:text-white transition-colors">{t('nav.deals')}</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">{t('nav.contact')}</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">FAQs & Support</Link></li>
            </ul>
          </div>

          {/* Col 3: Customer Service (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-orange-200">
              {t('footer.customerService')}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-100/80 font-normal">
              <li><Link to="/account" className="hover:text-white transition-colors">My Account</Link></li>
              <li><Link to="/account/orders" className="hover:text-white transition-colors">Order Tracking</Link></li>
              <li><Link to="/wishlist" className="hover:text-white transition-colors">Wishlist</Link></li>
              <li><Link to="/account" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Col 4: Categories (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-orange-200">
              {t('footer.categories')}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-100/80 font-normal">
              <li><Link to="/category/fruits-vegetables" className="hover:text-white transition-colors">{t('cat.fruitsVegetables')}</Link></li>
              <li><Link to="/category/dairy-eggs" className="hover:text-white transition-colors">{t('cat.dairyEggs')}</Link></li>
              <li><Link to="/category/beverages" className="hover:text-white transition-colors">{t('cat.beverages')}</Link></li>
              <li><Link to="/category/snacks-biscuits" className="hover:text-white transition-colors">{t('cat.snacksMunchies')}</Link></li>
              <li><Link to="/category/household-cleaning" className="hover:text-white transition-colors">{t('cat.householdEssentials')}</Link></li>
              <li><Link to="/category/personal-care" className="hover:text-white transition-colors">{t('cat.personalCare')}</Link></li>
            </ul>
          </div>

          {/* Col 5: Contact Us + We Accept (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-5">
            <div className="space-y-3.5">
              <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-orange-200">
                {t('footer.contactUs')}
              </h4>
              <div className="space-y-3 text-xs sm:text-sm text-orange-100/85 leading-relaxed font-normal">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-2.5 hover:text-white transition-colors"
                >
                  <MapPin className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                  <span>123 Market Street, Commercial Hub, Metro City 100001</span>
                </a>
                <p className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                  <a href="tel:9876543210" className="hover:text-white font-medium">+91 98765 43210</a>
                </p>
                <p className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                  <span className="font-medium">support@yourstorehere.com</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright strip */}
        <div className="pt-8 border-t border-stone-800/60 text-center text-xs text-orange-200/80 font-normal">
          {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
};
