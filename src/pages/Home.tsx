import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Truck,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  ShoppingBag,
  Star,
  Tag,
  Lock,
  ShoppingCart,
  ArrowRight,
  Flame,
  Award
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';
import { products } from '../data/products';
import { SEO } from '../components/SEO';

export const Home: React.FC = () => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { t } = useLanguage();

  const [email, setEmail] = useState('');

  // 8 Categories with modern visual treatment
  const templateCategories = [
    {
      nameKey: 'cat.fruitsVegetables',
      defaultName: 'Fruits & Vegetables',
      img: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&auto=format&fit=crop&q=80',
      slug: 'fruits-vegetables'
    },
    {
      nameKey: 'cat.dairyEggs',
      defaultName: 'Dairy & Eggs',
      img: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?w=400&auto=format&fit=crop&q=80',
      slug: 'dairy-eggs'
    },
    {
      nameKey: 'cat.snacksMunchies',
      defaultName: 'Snacks & Munchies',
      img: 'https://images.unsplash.com/photo-1621996346565-e3d5d62816dd?w=400&auto=format&fit=crop&q=80',
      slug: 'snacks-biscuits'
    },
    {
      nameKey: 'cat.beverages',
      defaultName: 'Beverages',
      img: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&auto=format&fit=crop&q=80',
      slug: 'beverages'
    },
    {
      nameKey: 'cat.breakfastCereals',
      defaultName: 'Breakfast & Cereals',
      img: 'https://images.unsplash.com/photo-1521483451569-e33803c0330c?w=400&auto=format&fit=crop&q=80',
      slug: 'breakfast-cereals'
    },
    {
      nameKey: 'cat.bakeryBread',
      defaultName: 'Bakery & Bread',
      img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80',
      slug: 'packaged-foods'
    },
    {
      nameKey: 'cat.householdEssentials',
      defaultName: 'Household Essentials',
      img: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&auto=format&fit=crop&q=80',
      slug: 'household-cleaning'
    },
    {
      nameKey: 'cat.personalCare',
      defaultName: 'Personal Care & Beauty',
      img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&auto=format&fit=crop&q=80',
      slug: 'personal-care'
    }
  ];

  // Deal of the Day items in Indian Rupees (₹)
  const dealProducts = [
    {
      id: 'prod-deal-1',
      name: 'Fresh Red Apples',
      unit: '1 kg',
      price: 180,
      originalPrice: 220,
      discount: '20%',
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&auto=format&fit=crop&q=80',
      matchProd: products[0]
    },
    {
      id: 'prod-deal-2',
      name: 'Organic Bananas',
      unit: '1 kg',
      price: 60,
      originalPrice: 70,
      discount: '15%',
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&auto=format&fit=crop&q=80',
      matchProd: products[1]
    },
    {
      id: 'prod-deal-3',
      name: 'Farm Fresh Milk',
      unit: '1 Ltr',
      price: 66,
      originalPrice: 85,
      discount: '25%',
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&auto=format&fit=crop&q=80',
      matchProd: products[5]
    },
    {
      id: 'prod-deal-4',
      name: 'Farm Fresh White Eggs',
      unit: '12 pcs',
      price: 96,
      originalPrice: 120,
      discount: '20%',
      image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=300&auto=format&fit=crop&q=80',
      matchProd: products[8]
    },
    {
      id: 'prod-deal-5',
      name: 'Daawat Rozana Basmati Rice',
      unit: '5 kg',
      price: 399,
      originalPrice: 570,
      discount: '30%',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&auto=format&fit=crop&q=80',
      matchProd: products[11]
    },
    {
      id: 'prod-deal-6',
      name: 'California Almonds',
      unit: '250 g',
      price: 255,
      originalPrice: 300,
      discount: '15%',
      image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=300&auto=format&fit=crop&q=80',
      matchProd: products[29]
    }
  ];

  const handleAddDeal = (deal: typeof dealProducts[0]) => {
    addToCart(deal.matchProd || products[0], 1);
    showToast(`${deal.name} added to cart!`);
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    showToast('Subscribed to exclusive offers!', 'success');
    setEmail('');
  };

  return (
    <div className="w-full bg-[#fdfcfb] min-h-screen text-[#1c1c1c] pb-20 font-sans">
      <SEO
        title="Fresh Quality Groceries Everyday | Your Store Here Supermarket"
        description="Shop fresh vegetables, fruits, staples, dairy, snacks & household essentials from Your Store Here. Fast 30-min doorstep delivery."
      />
      {/* =========================================================================
          1. HERO SECTION (FULL-WIDTH EXTENDED BACKGROUND, PROFESSIONAL & CLEAN)
         ========================================================================= */}
      <section
        className="w-full relative overflow-hidden min-h-[500px] lg:min-h-[560px] flex items-center bg-cover bg-center bg-no-repeat shadow-xs"
        style={{
          backgroundImage: "url('/hero_section.png')",
          backgroundColor: '#fff7ed'
        }}
      >
        {/* Soft, gentle gradient overlay for perfect readability without harsh borders */}
        <div className="absolute inset-0 bg-linear-to-r from-white/95 via-white/80 to-transparent pointer-events-none" />

        <div className="relative max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-10 py-12 lg:py-16 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column Copy */}
          <div className="lg:col-span-7 space-y-6 text-left max-w-xl">
            {/* Title: Everything Your Family Needs, Under One Roof. */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#111827] leading-[1.08] tracking-tight">
              {t('hero.titleLine1')}<br />
              <span className="text-[#ea580c]">{t('hero.titleLine2')}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#4b5563] max-w-lg leading-relaxed font-normal">
              {t('hero.subtitle')}
            </p>

            {/* Action Buttons - Smooth Rounded */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold px-7 py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{t('hero.shopNow')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/shop?filter=deals"
                className="inline-flex items-center gap-2 bg-white hover:bg-orange-50 text-[#ea580c] text-xs font-bold px-7 py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <span>{t('hero.exploreDeals')}</span>
              </Link>
            </div>

            {/* Social Proof: Avatars + 10K+ + Rating (NO horizontal rule) */}
            <div className="flex items-center gap-4 pt-2 max-w-md">
              <div className="flex items-center -space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Customer"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-xs"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Customer"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-xs"
                />
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                  alt="Customer"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-xs"
                />
                <div className="w-8 h-8 rounded-full bg-[#ea580c] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-xs">
                  10K+
                </div>
              </div>

              <div className="text-left">
                <span className="text-xs font-semibold text-[#374151] block leading-tight">
                  Trusted by 10,000+ happy families
                </span>
                <div className="flex items-center gap-1 text-amber-500 font-bold text-xs mt-0.5">
                  <div className="flex items-center">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  </div>
                  <span className="text-[#111827] font-bold text-xs ml-1">4.8/5 Rated</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Floating subtle offer card (smooth rounded, no brutalist edges) */}
          <div className="lg:col-span-5 hidden lg:flex justify-end items-center">
            <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-green-100/50 text-center min-w-[220px]">
              <span className="text-xs font-bold text-[#ea580c] uppercase tracking-wider block">
                SPECIAL SAVER
              </span>
              <span className="text-5xl font-extrabold text-[#ea580c] block leading-none my-2">
                30%
              </span>
              <span className="text-sm font-bold text-[#111827] block uppercase tracking-wide">
                OFF STOREWIDE
              </span>
              <span className="text-xs text-[#6b7280] block mt-2 pt-2 border-t border-slate-100">
                Your Trusted Neighborhood Supermarket
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* HORIZONTAL LOOPING MARQUEE STRIP RIGHT BELOW HERO (Thin orange strip, white text, dots) */}
      <div className="w-full bg-[#ea580c] py-2.5 overflow-hidden text-white shadow-xs">
        <div className="animate-marquee whitespace-nowrap flex items-center text-xs font-bold tracking-wider uppercase">
          {[1, 2, 3, 4].map((groupIndex) => (
            <div key={groupIndex} className="flex items-center">
              <span className="mx-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-200" />
                {t('feat.farmFresh')}
              </span>
              <span className="text-orange-200 mx-2 text-sm font-black">•</span>

              <span className="mx-4 flex items-center gap-2">
                <Truck className="w-4 h-4 text-orange-200 stroke-[2]" />
                {t('feat.freeDelivery')}
              </span>
              <span className="text-orange-200 mx-2 text-sm font-black">•</span>

              <span className="mx-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-orange-200 stroke-[2]" />
                {t('feat.securePayment')}
              </span>
              <span className="text-orange-200 mx-2 text-sm font-black">•</span>

              <span className="mx-4 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-orange-200 stroke-[2]" />
                {t('feat.easyReturns')}
              </span>
              <span className="text-orange-200 mx-2 text-sm font-black">•</span>

              <span className="mx-4">30 MINUTE EXPRESS DELIVERY</span>
              <span className="text-orange-200 mx-2 text-sm font-black">•</span>

              <span className="mx-4">100% FRESHNESS GUARANTEE</span>
              <span className="text-emerald-200 mx-2 text-sm font-black">•</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-14 pt-8">
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-extrabold text-[#111] tracking-tight">
              {t('sec.shopByCategory')}
            </h2>
            <div className="nfb-section-underline" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {templateCategories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className="relative overflow-hidden h-[180px] rounded-xl bg-cover bg-center flex flex-col justify-end p-3 transition-all hover:-translate-y-1 hover:shadow-lg group"
                style={{
                  backgroundImage: `url('${cat.img}')`,
                  backgroundColor: '#c2410c'
                }}
              >
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent group-hover:from-[#c2410c]/80 group-hover:via-[#c2410c]/40 transition-colors duration-300" />
                
                <span className="relative z-10 text-xs font-bold text-white leading-tight drop-shadow-md text-center">
                  {t(cat.nameKey)}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div
            className="lg:col-span-8 rounded-2xl overflow-hidden text-white p-8 sm:p-10 flex flex-col sm:flex-row justify-between relative shadow-md bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80')",
              backgroundColor: '#c2410c'
            }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-[#9a3412]/95 via-[#c2410c]/85 to-transparent pointer-events-none" />

            <div className="space-y-3 max-w-md z-10 text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200 bg-black/25 px-3 py-1 rounded-full inline-block">
                LIMITED TIME OFFER
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight text-white">
                {t('banner.superSaver')}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-normal">
                {t('banner.superSaverDesc')}
              </p>
              <div className="pt-2">
                <Link
                  to="/shop?filter=deals"
                  className="bg-white hover:bg-emerald-50 text-[#c2410c] text-xs font-bold px-6 py-3 rounded-xl inline-block transition-all shadow-sm hover:shadow-md"
                >
                  {t('hero.shopNow')}
                </Link>
              </div>
            </div>

            <div className="self-center sm:self-auto mt-6 sm:mt-0 flex items-center z-10">
              <div className="w-24 h-24 rounded-full bg-[#fbbd08] text-[#111] flex flex-col items-center justify-center font-extrabold shadow-lg">
                <span className="text-[10px] uppercase tracking-wider">UP TO</span>
                <span className="text-2xl font-black leading-none">30%</span>
                <span className="text-[10px] uppercase tracking-wider">OFF</span>
              </div>
            </div>
          </div>

          <div
            className="lg:col-span-4 rounded-2xl overflow-hidden p-8 flex flex-col justify-between shadow-md relative bg-cover bg-center text-white"
            style={{
              backgroundImage: "url('/30MINDELIVERY.png')",
              backgroundColor: '#c2410c'
            }}
          >
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/45 to-black/20 pointer-events-none" />

            <div className="space-y-3 z-10 text-left">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-white bg-[#c2410c] px-3 py-1 rounded-full inline-block shadow-xs">
                EXPRESS DELIVERY
              </span>
              <h3 className="text-2xl font-black text-white leading-tight drop-shadow-md">
                {t('banner.30Min')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-medium drop-shadow-sm max-w-xs">
                {t('banner.30MinDesc')}
              </p>
            </div>

            <div className="pt-6 z-10 text-left">
              <Link
                to="/shop"
                className="bg-[#c2410c] hover:bg-[#9a3412] text-white text-xs font-bold px-6 py-3 rounded-xl inline-flex items-center gap-2 transition-all shadow-md"
              >
                <span>{t('hero.shopNow')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-[#111] tracking-tight">
              {t('sec.dealOfDay')}
            </h2>
            <Link
              to="/shop?filter=deals"
              className="text-xs font-bold text-[#c2410c] hover:underline flex items-center gap-1"
            >
              <span>View All Deals</span>
              <span>&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {dealProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl p-3.5 flex flex-col justify-between hover:shadow-lg transition-all shadow-xs group"
              >
                <div className="flex justify-start">
                  <span className="bg-emerald-100 text-[#c2410c] text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {p.discount} OFF
                  </span>
                </div>

                <div className="h-28 flex items-center justify-center p-1 my-2 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="max-h-full max-w-full object-contain  transition-transform"
                  />
                </div>

                <div>
                  <h3 className="text-xs font-bold text-[#111] line-clamp-1">{p.name}</h3>
                  <p className="text-[10px] text-[#777] mt-0.5">{p.unit}</p>
                </div>

                <div className="flex items-baseline gap-1.5 my-2">
                  <span className="text-sm font-extrabold text-[#111]">₹{p.price}</span>
                  <span className="text-[11px] text-[#888] line-through">₹{p.originalPrice}</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleAddDeal(p)}
                  className="w-full bg-emerald-50 hover:bg-[#c2410c] text-[#c2410c] hover:text-white transition-colors text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{t('cart.addToCart')}</span>
                  <ShoppingCart className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6 pt-4">
          <div className="text-center">
            <h2 className="text-xl font-extrabold text-[#111] tracking-tight">
              WHY CHOOSE Your Store Here?
            </h2>
            <div className="nfb-section-underline" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { title: 'Best Quality', desc: 'We deliver only the freshest & finest products.', icon: <Sparkles className="w-7 h-7 text-[#c2410c]" /> },
              { title: 'Affordable Prices', desc: 'Best prices & exclusive offers on all items.', icon: <Tag className="w-7 h-7 text-[#c2410c]" /> },
              { title: 'Fast Delivery', desc: 'Lightning fast delivery right at your doorstep.', icon: <Truck className="w-7 h-7 text-[#c2410c]" /> },
              { title: '100% Secure', desc: 'Your payments and data are always safe.', icon: <Lock className="w-7 h-7 text-[#c2410c]" /> },
              { title: 'Easy Returns', desc: 'Doorstep hassle-free replacement or refunds.', icon: <RefreshCw className="w-7 h-7 text-[#c2410c]" /> }
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-5 flex items-center gap-3.5 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#111]">{item.title}</h4>
                  <p className="text-[11px] text-[#666] mt-0.5 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center shadow-xs">
          <div className="space-y-3 pr-4 md:border-r border-slate-100">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#c2410c]">
              WHAT OUR CUSTOMERS SAY
            </h3>
            <div className="flex items-center gap-0.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
            <p className="text-xs text-[#555] italic leading-relaxed">
              &ldquo;Your Store Here has made supermarket grocery shopping so easy every day. The quality is always top-notch and delivery is super fast!&rdquo;
            </p>
            <div className="text-[11px] text-[#111] font-bold pt-1">
              <span>– S. Sharma, Metro City</span>
            </div>
          </div>

          <div className="space-y-3 px-0 md:px-4 md:border-r border-slate-100">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#c2410c]">
              TRUSTED BY 50,000+ CUSTOMERS
            </h3>
            <div className="flex items-center gap-3 pt-1">
              <div className="flex -space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Customer"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Customer"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                  alt="Customer"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
                <div className="w-8 h-8 rounded-full bg-[#c2410c] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                  50K+
                </div>
              </div>
              <div>
                <span className="text-base font-extrabold text-[#111] block leading-none">
                  50K+
                </span>
                <span className="text-[10px] text-[#666] font-semibold">Happy Customers</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500 pt-1">
              <div className="flex items-center gap-0.5">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              </div>
              <span className="text-[#333]">4.8/5 Rating</span>
            </div>
          </div>

          <div className="space-y-3 pl-0 md:pl-2">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#111]">
              GET EXCLUSIVE OFFERS
            </h3>
            <p className="text-xs text-[#666]">
              Subscribe to get the best weekly supermarket deals directly.
            </p>
            <form onSubmit={handleNewsletter} className="flex gap-2 pt-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-slate-50 border-0 text-xs px-4 py-2.5 rounded-lg outline-none focus:ring-2 focus:ring-emerald-400"
                required
              />
              <button
                type="submit"
                className="bg-[#c2410c] hover:bg-[#9a3412] text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                SUBSCRIBE
              </button>
            </form>
            <p className="text-[10px] text-[#888]">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
