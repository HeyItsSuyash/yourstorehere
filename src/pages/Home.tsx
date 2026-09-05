import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Truck,
  ShieldCheck,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';
import { products } from '../data/products';

export const Home: React.FC = () => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { t } = useLanguage();

  const [email, setEmail] = useState('');

  // 8 Exact Categories matching template.jpg layout
  const templateCategories = [
    { nameKey: 'cat.fruitsVegetables', defaultName: 'Fruits &\nVegetables', img: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=240&auto=format&fit=crop&q=80', slug: 'fruits-vegetables' },
    { nameKey: 'cat.dairyEggs', defaultName: 'Dairy &\nEggs', img: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?w=240&auto=format&fit=crop&q=80', slug: 'dairy-eggs' },
    { nameKey: 'cat.snacksMunchies', defaultName: 'Snacks &\nMunchies', img: 'https://images.unsplash.com/photo-1621996346565-e3d5d62816dd?w=240&auto=format&fit=crop&q=80', slug: 'snacks-biscuits' },
    { nameKey: 'cat.beverages', defaultName: 'Beverages', img: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=240&auto=format&fit=crop&q=80', slug: 'beverages' },
    { nameKey: 'cat.breakfastCereals', defaultName: 'Breakfast &\nCereals', img: 'https://images.unsplash.com/photo-1521483451569-e33803c0330c?w=240&auto=format&fit=crop&q=80', slug: 'breakfast-cereals' },
    { nameKey: 'cat.bakeryBread', defaultName: 'Bakery &\nBread', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=240&auto=format&fit=crop&q=80', slug: 'packaged-foods' },
    { nameKey: 'cat.householdEssentials', defaultName: 'Household\nEssentials', img: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=240&auto=format&fit=crop&q=80', slug: 'household-cleaning' },
    { nameKey: 'cat.personalCare', defaultName: 'Personal Care\n& Beauty', img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=240&auto=format&fit=crop&q=80', slug: 'personal-care' }
  ];

  // 6 Deal of the Day items in Indian Rupees (₹)
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
    <div className="w-full bg-[#f8f9f5] min-h-screen text-[#1c1c1c] pb-12 font-sans">
      <div className="max-w-[1240px] mx-auto px-4 space-y-10 pt-4">
        {/* =========================================================================
            1. HERO SECTION (With Generated Variant Image + 30% OFF Badge)
           ========================================================================= */}
        <section className="relative overflow-hidden bg-[#f4f6ef] rounded-2xl border border-[#e5e9de] p-6 sm:p-10 md:p-12 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column Copy */}
            <div className="lg:col-span-6 space-y-4 text-left z-10">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#2d731e] inline-flex items-center gap-1.5 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3 text-[#2d731e]" />
                {t('hero.badge')}
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black text-[#151515] leading-[1.08] tracking-tight">
                {t('hero.titleLine1')}<br />
                <span className="text-[#256f1a]">{t('hero.titleLine2')}</span>
              </h1>

              <p className="text-xs sm:text-sm text-[#555] max-w-md leading-relaxed">
                {t('hero.subtitle')}
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 bg-[#205d15] hover:bg-[#184910] text-white text-xs font-bold px-5 py-3 rounded-md transition-all hover:shadow-md active:scale-95 uppercase cursor-pointer"
                >
                  <span>{t('hero.shopNow')}</span>
                  <span className="text-sm font-light">&rarr;</span>
                </Link>
                <Link
                  to="/shop?filter=deals"
                  className="inline-flex items-center gap-2 bg-transparent hover:bg-white/60 text-[#222] border border-[#205d15] text-xs font-bold px-5 py-3 rounded-md transition-all hover:shadow-2xs active:scale-95 uppercase"
                >
                  <span>{t('hero.exploreDeals')}</span>
                </Link>
              </div>

              {/* 4 Feature Badges under buttons in Hero */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-[#e2e6d9] text-[#222]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full border border-[#205d15] flex items-center justify-center text-[#205d15] text-xs font-black shrink-0">
                    ₹
                  </div>
                  <div className="text-left">
                    <span className="text-[11px] font-bold block leading-tight">{t('feat.farmFresh')}</span>
                    <span className="text-[9.5px] text-[#777] block leading-tight">{t('feat.farmFreshDesc')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#205d15] shrink-0" />
                  <div className="text-left">
                    <span className="text-[11px] font-bold block leading-tight">{t('feat.freeDelivery')}</span>
                    <span className="text-[9.5px] text-[#777] block leading-tight">{t('feat.freeDeliveryDesc')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#205d15] shrink-0" />
                  <div className="text-left">
                    <span className="text-[11px] font-bold block leading-tight">{t('feat.securePayment')}</span>
                    <span className="text-[9.5px] text-[#777] block leading-tight">{t('feat.securePaymentDesc')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-[#205d15] shrink-0" />
                  <div className="text-left">
                    <span className="text-[11px] font-bold block leading-tight">{t('feat.easyReturns')}</span>
                    <span className="text-[9.5px] text-[#777] block leading-tight">{t('feat.easyReturnsDesc')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Generated Hero Basket Variant with 30% OFF Circle Badge */}
            <div className="lg:col-span-6 relative flex justify-center items-center">
              {/* Circular 30% OFF Badge (identical to template.jpg) */}
              <div className="absolute top-2 left-6 z-20 w-16 h-16 rounded-full bg-[#1b5212] text-white flex flex-col items-center justify-center shadow-lg border-2 border-white/60">
                <span className="text-[8.5px] font-bold tracking-wider leading-none">UP TO</span>
                <span className="text-lg font-black leading-none mt-0.5">30%</span>
                <span className="text-[8.5px] font-bold tracking-wider leading-none mt-0.5">OFF</span>
              </div>

              <div className="w-full max-w-[560px] rounded-2xl overflow-hidden shadow-xs border border-[#e5e9de] bg-white">
                <img
                  src="/hero_basket_variant.jpg"
                  alt="Fresh Organic Groceries in Green Basket"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. SHOP BY CATEGORY (8 Rounded Cards with clean CSS & Images)
           ========================================================================= */}
        <section className="space-y-4">
          <div className="text-center">
            <h2 className="text-base font-black uppercase tracking-wider text-[#111]">
              {t('sec.shopByCategory')}
            </h2>
            <div className="nfb-section-underline" />
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {templateCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/category/${cat.slug}`}
                  className="nfb-card p-3 text-center flex flex-col items-center justify-between group h-[175px] hover:-translate-y-1 transition-all"
                >
                  <div className="h-24 w-full flex items-center justify-center p-1 overflow-hidden">
                    <img
                      src={cat.img}
                      alt={t(cat.nameKey)}
                      className="max-h-full max-w-full object-cover rounded-lg group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-[#222] group-hover:text-[#246b19] leading-snug mt-1 text-center line-clamp-2">
                    {t(cat.nameKey)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. PROMOTIONAL BANNERS: Weekend Super Saver + 30 Min Delivery
           ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* Left Banner: Weekend Super Saver */}
          <div className="lg:col-span-8 rounded-2xl overflow-hidden bg-[#103b0d] text-white p-6 sm:p-8 flex flex-col sm:flex-row justify-between relative shadow-xs border border-[#1b4e13]">
            <div className="space-y-2.5 max-w-sm z-10">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-300">
                LIMITED TIME OFFER
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                {t('banner.superSaver')}
              </h3>
              <p className="text-xs text-emerald-100/90 leading-relaxed">
                {t('banner.superSaverDesc')}
              </p>
              <div className="pt-2">
                <Link
                  to="/shop?filter=deals"
                  className="bg-[#72a339] hover:bg-[#618c2f] text-[#0a2007] text-xs font-black px-4 py-2 rounded-md inline-block uppercase transition-transform active:scale-95"
                >
                  {t('hero.shopNow')}
                </Link>
              </div>
            </div>

            {/* 30% off yellow circle badge */}
            <div className="self-center sm:self-auto mt-4 sm:mt-0 flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-[#fbbd08] text-[#111] flex flex-col items-center justify-center font-black shadow-md animate-float">
                <span className="text-[9px] uppercase tracking-wider">UP TO</span>
                <span className="text-xl font-black leading-none">30%</span>
                <span className="text-[9px] uppercase tracking-wider">OFF</span>
              </div>
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&auto=format&fit=crop&q=80"
                alt="Fresh produce harvest"
                className="w-36 h-28 object-cover rounded-xl shadow-xs hidden sm:block"
              />
            </div>
          </div>

          {/* Right Banner: 30 Minutes Delivery */}
          <div className="lg:col-span-4 rounded-2xl overflow-hidden bg-[#f4f6ef] border border-[#d9dfd0] p-6 flex flex-col justify-between shadow-xs">
            <div className="space-y-2">
              <h3 className="text-base font-extrabold text-[#111]">
                {t('banner.30Min')}
              </h3>
              <p className="text-xs text-[#666]">
                {t('banner.30MinDesc')}
              </p>
              <div className="pt-2">
                <Link
                  to="/shop"
                  className="bg-[#246b19] hover:bg-[#1b5212] text-white text-xs font-bold px-4 py-2 rounded-md inline-block uppercase tracking-wider transition-transform active:scale-95"
                >
                  {t('hero.shopNow')}
                </Link>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <img
                src="/template_assets/scooter_guy.png"
                alt="Delivery partner on green scooter"
                className="h-24 object-contain"
              />
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. DEAL OF THE DAY (6 Products in ₹ Indian Rupees)
           ========================================================================= */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-wider text-[#111]">
              {t('sec.dealOfDay')}
            </h2>
            <Link
              to="/shop?filter=deals"
              className="text-xs font-bold text-[#246b19] hover:underline flex items-center gap-1"
            >
              <span>View All Deals</span>
              <span>&rarr;</span>
            </Link>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {dealProducts.map((p) => (
                <div
                  key={p.id}
                  className="nfb-card p-3 flex flex-col justify-between hover:-translate-y-1 transition-all"
                >
                  {/* Top discount green pill badge */}
                  <div className="flex justify-start">
                    <span className="nfb-discount-badge">
                      {p.discount}<br />OFF
                    </span>
                  </div>

                  {/* Product Image */}
                  <div className="h-28 flex items-center justify-center p-1 my-1 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="max-h-full max-w-full object-contain hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Title & Unit */}
                  <div>
                    <h3 className="text-xs font-bold text-[#111] line-clamp-1">{p.name}</h3>
                    <p className="text-[10px] text-[#777] mt-0.5">{p.unit}</p>
                  </div>

                  {/* Pricing in ₹ */}
                  <div className="flex items-baseline gap-1.5 my-2">
                    <span className="text-sm font-black text-[#111]">₹{p.price}</span>
                    <span className="text-[11px] text-[#888] line-through">₹{p.originalPrice}</span>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    type="button"
                    onClick={() => handleAddDeal(p)}
                    className="w-full border border-[#246b19] text-[#246b19] hover:bg-[#246b19] hover:text-white transition-all text-[10.5px] font-bold py-1.5 rounded-md flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                  >
                    <span>{t('cart.addToCart')}</span>
                    <span className="text-xs">🛒</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. WHY CHOOSE FRESHMART? (5 Clean Feature Cards)
           ========================================================================= */}
        <section className="space-y-4 pt-4">
          <div className="text-center">
            <h2 className="text-sm font-black uppercase tracking-wider text-[#111]">
              WHY CHOOSE NEW FAMILY BAZAR?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              { title: 'Best Quality', desc: 'We deliver only the freshest & finest products.', icon: '🌾' },
              { title: 'Affordable Prices', desc: 'Best prices & exclusive offers on all your favorite products.', icon: '🛡️' },
              { title: 'Fast Delivery', desc: 'Lightning fast delivery at your doorstep on time.', icon: '🚚' },
              { title: '100% Secure', desc: 'Your payments and data are safe with us always.', icon: '🔒' },
              { title: 'Easy Returns', desc: 'Not satisfied? Easy returns within 7 days of delivery.', icon: '🔄' }
            ].map((item) => (
              <div
                key={item.title}
                className="nfb-card p-3.5 flex items-center gap-3 shadow-2xs"
              >
                <div className="w-9 h-9 rounded-full bg-[#f0f6ec] border border-[#d8ded0] shrink-0 flex items-center justify-center text-[#246b19] text-base">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#111]">{item.title}</h4>
                  <p className="text-[10px] text-[#666] mt-0.5 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            6. TESTIMONIALS, TRUSTED BY 50K+, AND NEWSLETTER
           ========================================================================= */}
        <section className="bg-white rounded-2xl border border-[#e5e9df] p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Left: What Our Customers Say */}
          <div className="space-y-2 pr-4 md:border-r border-[#ecefe6]">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#111]">
              WHAT OUR CUSTOMERS SAY
            </h3>
            <div className="flex text-amber-500 text-xs">★★★★★</div>
            <p className="text-xs text-[#555] italic leading-relaxed">
              &ldquo;New Family Bazar has made grocery shopping so easy and convenient. The quality is always top-notch and delivery is super fast!&rdquo;
            </p>
            <div className="flex items-center justify-between text-[11px] text-[#333] font-bold pt-1">
              <span>– Sarah J.</span>
              <div className="flex items-center gap-1 text-[#246b19]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#246b19]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              </div>
            </div>
          </div>

          {/* Middle: Trusted by 50,000+ Happy Customers */}
          <div className="space-y-2 px-0 md:px-4 md:border-r border-[#ecefe6]">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#246b19]">
              TRUSTED BY 50,000+ HAPPY CUSTOMERS
            </h3>
            <div className="flex items-center gap-3 pt-1">
              <div className="flex -space-x-2">
                {['🧑‍💼', '👩‍💼', '👨‍💼', '👩'].map((emoji, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-[#eef2e6] border-2 border-white flex items-center justify-center text-sm shadow-xs">
                    {emoji}
                  </div>
                ))}
              </div>
              <div>
                <span className="text-base font-black text-[#111] block leading-none">
                  50K+
                </span>
                <span className="text-[10px] text-[#666] font-semibold">Happy Customers</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-amber-500 pt-1">
              <span>★★★★★</span>
              <span className="text-[#333]">4.8/5 Average Rating</span>
            </div>
          </div>

          {/* Right: Get Exclusive Offers Newsletter */}
          <div className="space-y-2 pl-0 md:pl-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#111]">
              GET EXCLUSIVE OFFERS
            </h3>
            <p className="text-[11px] text-[#666]">
              Subscribe to get the best offers & updates
            </p>
            <form onSubmit={handleNewsletter} className="flex gap-2 pt-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-white border border-[#d8ded0] text-xs px-3 py-2 rounded-md outline-none focus:border-[#246b19]"
                required
              />
              <button
                type="submit"
                className="bg-[#246b19] hover:bg-[#1b5212] text-white font-bold text-xs px-4 py-2 rounded-md transition-colors uppercase tracking-wider cursor-pointer"
              >
                SUBSCRIBE
              </button>
            </form>
            <p className="text-[9.5px] text-[#888]">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
