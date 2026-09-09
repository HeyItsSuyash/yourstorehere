import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  MapPin,
  Truck,
  CreditCard,
  ShieldCheck,
  Check,
  ArrowRight,
  Plus,
  ArrowLeft,
  Zap
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useToast } from '../context/ToastContext';
import { Address } from '../types';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    subtotal,
    mrpTotal,
    totalSavings,
    deliveryFee,
    appliedCoupon,
    loyaltyDiscount,
    finalTotal,
    clearCart
  } = useCart();

  const { addresses, addAddress } = useAuth();
  const { createOrder } = useOrders();
  const { showToast } = useToast();

  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    addresses[0]?.id || ''
  );
  const [deliveryType, setDeliveryType] = useState<'standard' | 'express'>('express');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'COD'>('UPI');
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);

  // New Address Form state
  const [newAddr, setNewAddr] = useState({
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    type: 'Home' as 'Home' | 'Work' | 'Other',
    flat: '',
    street: '',
    landmark: '',
    city: 'Metro City',
    state: 'Uttar Pradesh',
    pincode: '100001'
  });

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.flat || !newAddr.street) {
      showToast('Please fill flat & street address', 'warning');
      return;
    }
    addAddress(newAddr);
    setIsAddingNewAddress(false);
    showToast('New delivery address saved!');
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      showToast('Your basket is empty', 'warning');
      navigate('/cart');
      return;
    }

    const chosenAddress =
      addresses.find((a) => a.id === selectedAddressId) || addresses[0];

    const newOrder = createOrder({
      items: cart,
      subtotal,
      discount: mrpTotal - subtotal,
      couponDiscount: appliedCoupon ? appliedCoupon.discountAmount : 0,
      loyaltyDiscount,
      deliveryFee: deliveryType === 'express' ? 0 : deliveryFee,
      total: finalTotal,
      address: chosenAddress,
      paymentMethod
    });

    clearCart();
    showToast('Order placed successfully!', 'success');
    navigate(`/order-success?orderId=${newOrder.id}`);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">No items in checkout</h2>
        <p className="text-xs text-slate-500 mt-1">Please add items to your cart first.</p>
        <Link
          to="/shop"
          className="mt-4 inline-block bg-[#ea580c] text-white font-bold text-xs px-5 py-2.5 rounded-xl"
        >
          Browse Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Back button */}
      <div className="mb-6">
        <Link
          to="/cart"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#ea580c]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Shopping Basket</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
          Express Checkout
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 cols: Step 1 Address, Step 2 Delivery, Step 3 Payment */}
        <div className="lg:col-span-7 space-y-6">
          {/* STEP 1: DELIVERY ADDRESS */}
          <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-xl bg-[#ea580c] text-white text-xs font-black flex items-center justify-center">
                  1
                </span>
                <h3 className="font-bold text-slate-900 text-base">
                  Delivery Address
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddingNewAddress(!isAddingNewAddress)}
                className="text-xs font-bold text-[#ea580c] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Address</span>
              </button>
            </div>

            {/* Saved addresses cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  onClick={() => setSelectedAddressId(addr.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedAddressId === addr.id
                      ? 'border-orange-300 bg-orange-50/50 ring-1 ring-[#ea580c] shadow-2xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#c2410c] bg-orange-100 px-2 py-0.5 rounded-xl">
                      {addr.type}
                    </span>
                    {selectedAddressId === addr.id && (
                      <Check className="w-4 h-4 text-[#ea580c] font-black" />
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">{addr.name}</h4>
                  <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">
                    {addr.flat}, {addr.street}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium mt-1">
                    Phone: {addr.phone}
                  </p>
                </div>
              ))}
            </div>

            {/* Add Address Form Modal/Inline */}
            {isAddingNewAddress && (
              <form
                onSubmit={handleSaveAddress}
                className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 mt-4 animate-in fade-in"
              >
                <h4 className="text-xs font-bold text-slate-900 uppercase">
                  Add New Delivery Location
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={newAddr.name}
                    onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                    className="p-2.5 text-xs bg-white border border-slate-200 rounded-xl"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={newAddr.phone}
                    onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                    className="p-2.5 text-xs bg-white border border-slate-200 rounded-xl"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Flat / House / Apartment No."
                    value={newAddr.flat}
                    onChange={(e) => setNewAddr({ ...newAddr, flat: e.target.value })}
                    className="p-2.5 text-xs bg-white border border-slate-200 rounded-xl"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Street / Area / Colony"
                    value={newAddr.street}
                    onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                    className="p-2.5 text-xs bg-white border border-slate-200 rounded-xl"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Landmark (Optional)"
                    value={newAddr.landmark}
                    onChange={(e) => setNewAddr({ ...newAddr, landmark: e.target.value })}
                    className="p-2.5 text-xs bg-white border border-slate-200 rounded-xl"
                  />
                  <input
                    type="text"
                    placeholder="Pincode"
                    value={newAddr.pincode}
                    onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                    className="p-2.5 text-xs bg-white border border-slate-200 rounded-xl"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingNewAddress(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold bg-[#ea580c] text-white rounded-xl shadow-xs"
                  >
                    Save & Use Address
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* STEP 2: DELIVERY OPTIONS */}
          <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <span className="w-6 h-6 rounded-xl bg-[#ea580c] text-white text-xs font-black flex items-center justify-center">
                2
              </span>
              <h3 className="font-bold text-slate-900 text-base">
                Delivery Speed
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => setDeliveryType('express')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  deliveryType === 'express'
                    ? 'border-orange-300 bg-orange-50/50 ring-1 ring-[#ea580c]'
                    : 'border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-extrabold text-[#c2410c] flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>30-Min Express</span>
                  </span>
                  {deliveryType === 'express' && <Check className="w-4 h-4 text-[#ea580c]" />}
                </div>
                <p className="text-xs text-slate-600">
                  Shipped directly from our nearest store
                </p>
                <span className="text-[11px] font-bold text-[#ea580c] mt-2 block">
                  FREE with your order
                </span>
              </div>

              <div
                onClick={() => setDeliveryType('standard')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  deliveryType === 'standard'
                    ? 'border-orange-300 bg-orange-50/50 ring-1 ring-[#ea580c]'
                    : 'border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-extrabold text-slate-800">
                    Scheduled Evening Slot
                  </span>
                  {deliveryType === 'standard' && <Check className="w-4 h-4 text-[#ea580c]" />}
                </div>
                <p className="text-xs text-slate-600">
                  Delivered between 7:00 PM – 9:00 PM today
                </p>
                <span className="text-[11px] font-bold text-slate-500 mt-2 block">
                  Convenient for working professionals
                </span>
              </div>
            </div>
          </div>

          {/* STEP 3: PAYMENT OPTIONS */}
          <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <span className="w-6 h-6 rounded-xl bg-[#ea580c] text-white text-xs font-black flex items-center justify-center">
                3
              </span>
              <h3 className="font-bold text-slate-900 text-base">
                Payment Method (Demo Simulation)
              </h3>
            </div>

            <div className="space-y-2">
              <label
                onClick={() => setPaymentMethod('UPI')}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'UPI'
                    ? 'border-orange-300 bg-orange-50/50 ring-1 ring-[#ea580c]'
                    : 'border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#c2410c] flex items-center justify-center font-bold text-xs">
                    UPI
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">
                      Instant UPI (Google Pay, PhonePe, Paytm, BHIM)
                    </h4>
                    <p className="text-[11px] text-slate-500">Fastest and recommended</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'UPI'}
                  onChange={() => setPaymentMethod('UPI')}
                  className="accent-[#ea580c]"
                />
              </label>

              <label
                onClick={() => setPaymentMethod('Card')}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'Card'
                    ? 'border-orange-300 bg-orange-50/50 ring-1 ring-[#ea580c]'
                    : 'border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#ea580c] flex items-center justify-center font-bold text-xs">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">
                      Credit / Debit Card (Visa, RuPay, Mastercard)
                    </h4>
                    <p className="text-[11px] text-slate-500">Zero surcharge</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'Card'}
                  onChange={() => setPaymentMethod('Card')}
                  className="accent-[#ea580c]"
                />
              </label>

              <label
                onClick={() => setPaymentMethod('COD')}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'COD'
                    ? 'border-orange-300 bg-orange-50/50 ring-1 ring-[#ea580c]'
                    : 'border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                    ₹
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">
                      Cash on Delivery (Pay at Doorstep)
                    </h4>
                    <p className="text-[11px] text-slate-500">Pay via Cash or QR code on arrival</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'COD'}
                  onChange={() => setPaymentMethod('COD')}
                  className="accent-[#ea580c]"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Right 5 cols: Order Summary & Place Order CTA */}
        <div className="lg:col-span-5 bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs space-y-4 sticky top-28">
          <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
            Order Review ({cart.length} items)
          </h3>

          {/* Quick list preview */}
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-xs">
            {cart.map((item) => (
              <div key={item.product.id} className="flex justify-between items-center py-1">
                <div className="flex items-center gap-2">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-8 h-8 object-contain rounded-xl bg-slate-50 p-0.5 border"
                  />
                  <div>
                    <p className="font-semibold text-slate-800 line-clamp-1 max-w-[170px]">
                      {item.product.name}
                    </p>
                    <span className="text-[10px] text-slate-400">Qty: {item.quantity}</span>
                  </div>
                </div>
                <span className="font-bold text-slate-900">
                  ₹{item.product.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            {appliedCoupon && (
              <div className="flex justify-between text-[#ea580c] font-semibold">
                <span>Coupon ({appliedCoupon.code})</span>
                <span>- ₹{appliedCoupon.discountAmount}</span>
              </div>
            )}
            {loyaltyDiscount > 0 && (
              <div className="flex justify-between text-[#ea580c] font-semibold">
                <span>Family Rewards</span>
                <span>- ₹{loyaltyDiscount}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>Delivery Charges</span>
              <span className="text-[#ea580c] font-bold uppercase text-[11px]">
                FREE
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
            <span className="text-xs text-slate-500 font-medium">Final Payable</span>
            <span className="text-2xl font-black text-slate-900">₹{finalTotal}</span>
          </div>

          <button
            type="button"
            onClick={handlePlaceOrder}
            className="w-full flex items-center justify-center gap-2 bg-[#ea580c] hover:bg-[#c2410c] text-white font-black text-sm py-4 rounded-xl shadow-lg shadow-orange-800/20 transition-all "
          >
            <span>PLACE ORDER</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#ea580c]" />
            100% Safe & Contactless Delivery
          </p>
        </div>
      </div>
    </div>
  );
};
