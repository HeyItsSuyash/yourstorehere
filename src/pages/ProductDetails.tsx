import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Plus,
  Minus,
  Heart,
  Truck,
  ShieldCheck,
  RefreshCw,
  MapPin,
  Check,
  Share2,
  AlertCircle
} from 'lucide-react';
import { ProductGrid } from '../components/Product/ProductGrid';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { SEO } from '../components/SEO';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, getItemQuantity, updateQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const product = products.find((p) => p.id === id) || products[0];
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<'idle' | 'checking' | 'available' | 'invalid'>('idle');
  const [activeTab, setActiveTab] = useState<'details' | 'nutrition' | 'reviews'>('details');

  const inCartQty = getItemQuantity(product.id);
  const isWishlisted = isInWishlist(product.id);

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode)) {
      setPincodeStatus('invalid');
      return;
    }
    setPincodeStatus('checking');
    setTimeout(() => {
      setPincodeStatus('available');
    }, 400);
  };

  const handleAddToCart = () => {
    addToCart(product, 1);
    showToast(`${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    if (inCartQty === 0) {
      addToCart(product, 1);
    }
    navigate('/checkout');
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <SEO
        title={`${product.name} (${product.unit}) - ₹${product.price}`}
        description={`Buy ${product.name} ${product.unit} online at ₹${product.price} from Express daily Mart Gomti Nagar Lucknow. Enjoy fresh quality guarantee and fast 30-min doorstep delivery.`}
      />
      {/* Schema.org Product Rich Snippet */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'Product',
            name: product.name,
            image: product.image,
            description: product.description,
            brand: {
              '@type': 'Brand',
              name: product.brand
            },
            offers: {
              '@type': 'Offer',
              priceCurrency: 'INR',
              price: product.price,
              availability: product.stock > 0
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
              seller: {
                '@type': 'Organization',
                name: 'Express daily Mart'
              }
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: product.rating,
              reviewCount: product.reviewCount
            }
          })
        }}
      />
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <Link to="/" className="hover:text-[#16a34a]">Home</Link>
        <span>/</span>
        <Link to={`/category/${product.category}`} className="hover:text-[#16a34a] capitalize">
          {product.category.replace('-', ' ')}
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-semibold line-clamp-1">{product.name}</span>
      </div>

      {/* Main Grid: Gallery on left, Details on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square rounded-xl bg-slate-50 p-6 flex items-center justify-center border border-slate-100 overflow-hidden">
            {product.discount > 0 && (
              <span className="absolute top-4 left-4 bg-[#16a34a] text-white text-xs font-black px-2.5 py-1 rounded-xl">
                {product.discount}% OFF
              </span>
            )}
            <button
              type="button"
              onClick={() => {
                const added = toggleWishlist(product);
                showToast(
                  added ? 'Added to wishlist' : 'Removed from wishlist',
                  'info'
                );
              }}
              className="absolute top-4 right-4 p-2.5 rounded-xl bg-white shadow-xs border border-slate-200 hover:border-rose-300"
            >
              <Heart
                className={`w-5 h-5 ${
                  isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-slate-400'
                }`}
              />
            </button>
            <img
              src={selectedImage}
              alt={product.name}
              className="w-4/5 h-4/5 object-contain mix-blend-multiply"
            />
          </div>

          {/* Thumbnail preview list */}
          <div className="flex items-center gap-3">
            {[product.image, product.image, product.image].map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImage(img)}
                className={`w-16 h-16 rounded-xl border-2 p-1 bg-slate-50 overflow-hidden ${
                  selectedImage === img ? 'border-orange-300' : 'border-transparent'
                }`}
              >
                <img src={img} alt="thumb" className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Information & Actions */}
        <div className="lg:col-span-6 space-y-5">
          <div>
            <span className="text-xs font-bold text-[#16a34a] uppercase tracking-wider">
              {product.brand}
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Pack Size: <span className="text-slate-800 font-bold">{product.unit}</span>
            </p>
          </div>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-amber-50 text-amber-900 px-2 py-1 rounded-xl text-xs font-bold border border-amber-200">
              <span>{product.rating}</span>
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            </div>
            <span className="text-xs text-slate-500">
              {product.reviewCount} Ratings & Verified Customer Reviews
            </span>
          </div>

          {/* Pricing Block */}
          <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-200 flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900">
                  ₹{product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-base text-slate-400 line-through font-semibold">
                    MRP ₹{product.originalPrice}
                  </span>
                )}
              </div>
              <span className="text-[11px] text-[#16a34a] font-bold">
                (Inclusive of all taxes)
              </span>
            </div>
            {product.discount > 0 && (
              <span className="text-xs font-black text-[#15803d] bg-orange-200 px-3 py-1.5 rounded-xl">
                Save ₹{product.originalPrice - product.price}
              </span>
            )}
          </div>

          {/* Highlights */}
          {product.highlights && (
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Key Highlights
              </h4>
              <ul className="space-y-1">
                {product.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                    <Check className="w-3.5 h-3.5 text-[#16a34a] shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Add to Cart & Buy Now Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            {inCartQty === 0 ? (
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-black text-sm py-3.5 px-6 rounded-xl shadow-md transition-all "
              >
                <span>ADD TO BASKET</span>
              </button>
            ) : (
              <div className="flex items-center justify-between bg-[#16a34a] text-white rounded-xl px-4 py-2 sm:w-48 shadow-md">
                <button
                  type="button"
                  onClick={() => updateQuantity(product.id, inCartQty - 1)}
                  className="p-1 hover:bg-[#15803d] rounded-xl"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-black text-sm">{inCartQty} in Cart</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(product.id, inCartQty + 1)}
                  className="p-1 hover:bg-[#15803d] rounded-xl"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={handleBuyNow}
              className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-black text-sm py-3.5 px-6 rounded-xl shadow-md transition-all "
            >
              BUY NOW
            </button>
          </div>

          {/* Delivery Pincode Checker */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <MapPin className="w-4 h-4 text-[#16a34a]" />
              <span>Check Delivery Speed in Your Area</span>
            </div>
            <form onSubmit={handleCheckPincode} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => {
                  setPincode(e.target.value.replace(/\D/g, ''));
                  setPincodeStatus('idle');
                }}
                placeholder="Enter 6-digit Pincode (e.g. 262701)"
                className="flex-1 bg-white border border-slate-300 px-3 py-2 rounded-xl text-xs outline-none focus:border-orange-300 font-medium"
              />
              <button
                type="submit"
                className="bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-xs px-4 py-2 rounded-xl"
              >
                Check
              </button>
            </form>

            {pincodeStatus === 'available' && (
              <p className="text-xs text-[#16a34a] font-semibold flex items-center gap-1.5 animate-in fade-in">
                <Check className="w-3.5 h-3.5" />
                Delivery available in 30-45 mins at pincode {pincode}!
              </p>
            )}
            {pincodeStatus === 'invalid' && (
              <p className="text-xs text-rose-600 font-semibold flex items-center gap-1.5 animate-in fade-in">
                <AlertCircle className="w-3.5 h-3.5" />
                Please enter a valid 6-digit Indian pincode.
              </p>
            )}
          </div>

          {/* Trust assurances */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
            <div className="p-2">
              <Truck className="w-4 h-4 text-[#16a34a] mx-auto mb-1" />
              <p className="text-[10px] font-bold text-slate-700">30-Min Delivery</p>
            </div>
            <div className="p-2">
              <ShieldCheck className="w-4 h-4 text-[#16a34a] mx-auto mb-1" />
              <p className="text-[10px] font-bold text-slate-700">100% Genuine</p>
            </div>
            <div className="p-2">
              <RefreshCw className="w-4 h-4 text-[#16a34a] mx-auto mb-1" />
              <p className="text-[10px] font-bold text-slate-700">Easy Returns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Description, Highlights, Reviews */}
      <div className="mt-10 bg-white rounded-xl p-6 sm:p-8 border border-slate-200/80">
        <div className="flex border-b border-slate-200 gap-6">
          <button
            type="button"
            onClick={() => setActiveTab('details')}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'details'
                ? 'border-[#16a34a] text-[#15803d]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Product Description
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('nutrition')}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'nutrition'
                ? 'border-[#16a34a] text-[#15803d]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Quality & Specifications
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'reviews'
                ? 'border-[#16a34a] text-[#15803d]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Customer Reviews ({product.reviewCount})
          </button>
        </div>

        <div className="pt-6">
          {activeTab === 'details' && (
            <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>{product.description}</p>
              <p>
                Stored in temperature-controlled warehouses to preserve maximum aroma, nutritional fidelity, and crunch. Packaged under high hygiene conditions certified by food safety standards.
              </p>
            </div>
          )}

          {activeTab === 'nutrition' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block font-medium">Brand</span>
                <span className="font-bold text-slate-800">{product.brand}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block font-medium">Quantity / Weight</span>
                <span className="font-bold text-slate-800">{product.unit}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block font-medium">Shelf Life</span>
                <span className="font-bold text-slate-800">6 to 12 Months</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block font-medium">Country of Origin</span>
                <span className="font-bold text-slate-800">India</span>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-slate-900 text-xs">Aakash Nair</span>
                  <div className="flex text-amber-500">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                  </div>
                </div>
                <p className="text-xs text-slate-600">
                  Delivered fresh within 25 minutes! Packaging was completely intact. Very happy with Express daily Mart service.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Frequently Bought Together / Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-black text-slate-900 mb-4">
            Related & Frequently Bought Together
          </h2>
          <ProductGrid products={relatedProducts} columns={5} />
        </section>
      )}
    </div>
  );
};
