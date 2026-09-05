import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-[#103b0d] text-white text-xs pt-12 pb-16 md:pb-8 border-t border-[#0c2f0a] font-sans">
      <div className="max-w-[1240px] mx-auto px-4 space-y-8">
        {/* Main 5 columns matching template.jpg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
          {/* Col 1: Brand (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <Link to="/" className="inline-block">
              <img
                src="/text_logo_white.png"
                alt="New Family Bazar"
                className="h-7 w-auto object-contain"
              />
            </Link>
            <p className="text-[11px] text-emerald-100/80 leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>
            {/* Social Icons - Clean SVGs instead of raw letters */}
            <div className="flex items-center gap-2.5 pt-2 text-white">
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#246b19] flex items-center justify-center transition-all hover:-translate-y-0.5"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#246b19] flex items-center justify-center transition-all hover:-translate-y-0.5"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#twitter"
                aria-label="Twitter"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#246b19] flex items-center justify-center transition-all hover:-translate-y-0.5"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#pinterest"
                aria-label="Pinterest"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#246b19] flex items-center justify-center transition-all hover:-translate-y-0.5"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.373-.056.232-.186.281-.43.168-1.609-.748-2.614-3.097-2.614-4.987 0-4.062 2.951-7.794 8.512-7.794 4.468 0 7.943 3.184 7.943 7.438 0 4.441-2.799 8.016-6.684 8.016-1.305 0-2.533-.679-2.953-1.482l-.804 3.064c-.291 1.111-1.077 2.503-1.604 3.364 1.199.369 2.474.57 3.799.57 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-2.5">
            <h4 className="text-[11px] font-black uppercase tracking-wider text-white">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-1.5 text-[11px] text-emerald-100/75">
              <li><Link to="/" className="hover:text-white transition-colors">{t('nav.home')}</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">{t('nav.categories')}</Link></li>
              <li><Link to="/shop?filter=deals" className="hover:text-white transition-colors">{t('nav.deals')}</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">{t('nav.contact')}</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Col 3: Customer Service (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-2.5">
            <h4 className="text-[11px] font-black uppercase tracking-wider text-white">
              {t('footer.customerService')}
            </h4>
            <ul className="space-y-1.5 text-[11px] text-emerald-100/75">
              <li><Link to="/account" className="hover:text-white transition-colors">My Account</Link></li>
              <li><Link to="/account/orders" className="hover:text-white transition-colors">Order Tracking</Link></li>
              <li><Link to="/wishlist" className="hover:text-white transition-colors">Wishlist</Link></li>
              <li><Link to="/account" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Col 4: Categories (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-2.5">
            <h4 className="text-[11px] font-black uppercase tracking-wider text-white">
              {t('footer.categories')}
            </h4>
            <ul className="space-y-1.5 text-[11px] text-emerald-100/75">
              <li><Link to="/category/fruits-vegetables" className="hover:text-white transition-colors">{t('cat.fruitsVegetables')}</Link></li>
              <li><Link to="/category/dairy-eggs" className="hover:text-white transition-colors">{t('cat.dairyEggs')}</Link></li>
              <li><Link to="/category/beverages" className="hover:text-white transition-colors">{t('cat.beverages')}</Link></li>
              <li><Link to="/category/snacks-biscuits" className="hover:text-white transition-colors">{t('cat.snacksMunchies')}</Link></li>
              <li><Link to="/category/household-cleaning" className="hover:text-white transition-colors">{t('cat.householdEssentials')}</Link></li>
              <li><Link to="/category/personal-care" className="hover:text-white transition-colors">{t('cat.personalCare')}</Link></li>
            </ul>
          </div>

          {/* Col 5: Contact Us + We Accept (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="space-y-2.5">
              <h4 className="text-[11px] font-black uppercase tracking-wider text-white">
                {t('footer.contactUs')}
              </h4>
              <div className="space-y-2 text-[11px] text-emerald-100/80 leading-snug">
                <a
                  href="https://maps.app.goo.gl/dik1TVGpPLVk4dBo8"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-2 hover:text-white transition-colors"
                >
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Behajam Rd, Motinagar Colony, Maharaj Nagar, Lakhimpur, UP 262701</span>
                </a>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <a href="tel:09415922031" className="hover:text-white">094159 22031</a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>support@newfamilybazar.com</span>
                </p>
              </div>
            </div>

            {/* We Accept Box matching template.jpg */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-emerald-200 mb-1.5">
                {t('footer.weAccept')}
              </h4>
              <img
                src="/template_assets/payment_methods.png"
                alt="UPI RuPay Visa Mastercard NetBanking"
                className="h-12 sm:h-14 object-contain rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Copyright strip */}
        <div className="pt-6 border-t border-[#184d14] text-center text-[11px] text-emerald-200/70">
          {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
};

