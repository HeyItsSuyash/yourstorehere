import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Coupon } from '../types';
import { initialCoupons } from '../data/initialData';
import { products } from '../data/products';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
  totalItems: number;
  subtotal: number;
  mrpTotal: number;
  totalSavings: number;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  useLoyalty: boolean;
  setUseLoyalty: (val: boolean) => void;
  loyaltyDiscount: number;
  finalTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('nfb_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    // Pre-populate with 3 items so cart is never empty for initial demo impression
    return [
      { product: products[0], quantity: 2 }, // Royal Apples
      { product: products[5], quantity: 1 }, // Amul Taaza Milk
      { product: products[10], quantity: 1 } // Aashirvaad Atta
    ];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    const saved = localStorage.getItem('nfb_coupon');
    return saved ? JSON.parse(saved) : null;
  });

  const [useLoyalty, setUseLoyalty] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('nfb_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('nfb_coupon', JSON.stringify(appliedCoupon));
  }, [appliedCoupon]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setUseLoyalty(false);
  };

  const getItemQuantity = (productId: string) => {
    const found = cart.find((item) => item.product.id === productId);
    return found ? found.quantity : 0;
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const mrpTotal = cart.reduce(
    (acc, item) => acc + item.product.originalPrice * item.quantity,
    0
  );

  const freeDeliveryThreshold = 499;
  const deliveryFee = subtotal >= freeDeliveryThreshold || subtotal === 0 ? 0 : 40;

  // Coupon discount computation
  let couponDiscount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrder) {
    if (appliedCoupon.discountType === 'percentage' && appliedCoupon.percentage) {
      couponDiscount = Math.min(
        appliedCoupon.discountAmount,
        Math.round((subtotal * appliedCoupon.percentage) / 100)
      );
    } else {
      couponDiscount = appliedCoupon.discountAmount;
    }
  }

  // Loyalty discount (e.g. 2450 points = ₹245, max 50% of subtotal)
  const loyaltyDiscount = useLoyalty ? Math.min(245, Math.floor(subtotal * 0.5)) : 0;

  const totalSavings = mrpTotal - subtotal + couponDiscount + loyaltyDiscount;

  const finalTotal = Math.max(0, subtotal - couponDiscount - loyaltyDiscount + deliveryFee);

  const applyCoupon = (code: string) => {
    const normalized = code.trim().toUpperCase();
    const found = initialCoupons.find((c) => c.code.toUpperCase() === normalized);

    if (!found) {
      return { success: false, message: 'Invalid coupon code.' };
    }

    if (subtotal < found.minOrder) {
      return {
        success: false,
        message: `Min order value of ₹${found.minOrder} required for ${found.code}.`
      };
    }

    setAppliedCoupon(found);
    return { success: true, message: `Coupon "${found.code}" applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemQuantity,
        totalItems,
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
