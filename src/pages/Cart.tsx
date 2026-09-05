import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Tag,
  Gift,
  Check,
  Percent
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { initialCoupons } from '../data/initialData';
import { ProductGrid } from '../components/Product/ProductGrid';
import { products } from '../data/products';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    updateQuantity,
    removeFromCart,
    subtotal,
    mrpTotal,
    totalSavings,
    deliveryFee,
    freeDeliveryThreshold,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    useLoyalty,
    setUseLoyalty,
    loyaltyDiscount,
    finalTotal
  } = useCart();
  const { showToast } = useToast();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = codeToApply || couponInput;
    if (!code) return;
    const res = applyCoupon(code);
    if (res.success) {
      showToast(res.message, 'success');
      setCouponError('');
      setCouponInput('');
    } else {
      setCouponError(res.message);
      showToast(res.message, 'warning');
    }
  };

  const distanceToFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeDeliveryPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-700 mx-auto flex items-center justify-center mb-4">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Your Basket is Empty</h2>
        <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">
          Explore fresh groceries, daily staples, snacks, and personal care essentials to fill your basket.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 mt-6 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-md"
        >
          <span>START SHOPPING</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          Shopping Basket ({cart.length} unique items)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review your supermarket items, apply family discounts, and proceed to checkout.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Columns: Items List */}
        <div className="lg:col-span-7 space-y-4">
          {/* Free delivery progress bar */}
          <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-2xs">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-slate-800">
                {distanceToFreeDelivery === 0 ? (
                  <span className="text-emerald-700 flex items-center gap-1">
                    <Check className="w-4 h-4" /> You unlocked FREE Express Delivery!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-emerald-800">₹{distanceToFreeDelivery}</strong> more for Free Delivery
                  </span>
                )}
              </span>
              <span className="font-black text-emerald-800">{freeDeliveryPercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
                style={{ width: `${freeDeliveryPercent}%` }}
              />
            </div>
          </div>

          {/* Cart item cards */}
          <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 divide-y divide-slate-100 shadow-xs">
            {cart.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="py-4 first:pt-0 last:pb-0 flex items-center gap-4"
              >
                <Link
                  to={`/product/${product.id}`}
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 rounded-2xl p-1 shrink-0 flex items-center justify-center border border-slate-100"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    {product.brand}
                  </span>
                  <Link
                    to={`/product/${product.id}`}
                    className="text-xs sm:text-sm font-bold text-slate-800 hover:text-emerald-700 line-clamp-1 block"
                  >
                    {product.name}
                  </Link>
                  <p className="text-[11px] text-slate-500">{product.unit}</p>

                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-sm font-black text-slate-900">
                      ₹{product.price * quantity}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs text-slate-400 line-through">
                        ₹{product.originalPrice * quantity}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Stepper & Remove */}
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="px-2 py-1 hover:bg-emerald-100"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2.5 text-xs font-black min-w-[20px] text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="px-2 py-1 hover:bg-emerald-100"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      removeFromCart(product.id);
                      showToast(`${product.name} removed from cart`, 'info');
                    }}
                    className="text-slate-400 hover:text-rose-500 p-1 transition-colors"
                    title="Remove product"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 Columns: Discounts, Coupons, Loyalty, Order Summary */}
        <div className="lg:col-span-5 space-y-4">
          {/* Apply Coupon Box */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-emerald-700" />
              <h3 className="font-bold text-slate-900 text-sm">Apply Coupon</h3>
            </div>

            {appliedCoupon ? (
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold text-emerald-800">
                    {appliedCoupon.code}
                  </span>
                  <p className="text-[11px] text-emerald-700">
                    ₹{appliedCoupon.discountAmount} discount applied!
                  </p>
                </div>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="text-xs font-bold text-rose-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => {
                      setCouponInput(e.target.value.toUpperCase());
                      setCouponError('');
                    }}
                    placeholder="Enter code (e.g. SAVE100)"
                    className="flex-1 bg-slate-50 border border-slate-200 uppercase px-3 py-2 rounded-xl text-xs outline-none focus:border-emerald-600 font-bold"
                  />
                  <button
                    type="button"
                    onClick={() => handleApplyCoupon()}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-2xs"
                  >
                    Apply
                  </button>
                </div>
                {couponError && (
                  <p className="text-[11px] text-rose-600 font-semibold mt-1">
                    {couponError}
                  </p>
                )}

                {/* Quick select coupon pills */}
                <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-100">
                  {initialCoupons.slice(0, 3).map((cp) => (
                    <button
                      key={cp.code}
                      type="button"
                      onClick={() => handleApplyCoupon(cp.code)}
                      className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-lg border border-emerald-200 transition-colors"
                    >
                      {cp.code} ({cp.title})
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Loyalty Points Redemption Box */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-emerald-700" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Family Rewards</h3>
                  <p className="text-[11px] text-slate-500">2,450 points available (₹245 value)</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={useLoyalty}
                  onChange={(e) => setUseLoyalty(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-700"></div>
              </label>
            </div>
            {useLoyalty && (
              <p className="text-[11px] text-emerald-700 font-semibold mt-2 pt-2 border-t border-slate-100">
                Redeeming 2,450 points for ₹{loyaltyDiscount} off!
              </p>
            )}
          </div>

          {/* Bill Summary */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
              Bill Summary
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Items MRP Total</span>
                <span className="line-through text-slate-400">₹{mrpTotal}</span>
              </div>
              <div className="flex justify-between text-slate-800 font-semibold">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Supermarket Discount</span>
                <span>- ₹{mrpTotal - subtotal}</span>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon Discount ({appliedCoupon.code})</span>
                  <span>- ₹{appliedCoupon.discountAmount}</span>
                </div>
              )}

              {useLoyalty && loyaltyDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Family Rewards Points</span>
                  <span>- ₹{loyaltyDiscount}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Delivery Charges</span>
                <span>
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase text-[11px]">
                      FREE
                    </span>
                  ) : (
                    <span>₹{deliveryFee}</span>
                  )}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
              <div>
                <span className="text-xs text-slate-500 font-medium block">To Pay</span>
                <span className="text-2xl font-black text-slate-900">
                  ₹{finalTotal}
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                Total Savings: ₹{totalSavings}
              </span>
            </div>

            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="w-full mt-4 flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm py-4 rounded-2xl shadow-md transition-all active:scale-95"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Suggested additions */}
      <div className="mt-16 pt-8 border-t border-slate-200">
        <h2 className="text-xl font-black text-slate-900 mb-4">
          Shoppers Also Frequently Pick
        </h2>
        <ProductGrid products={products.slice(6, 11)} columns={5} />
      </div>
    </div>
  );
};
