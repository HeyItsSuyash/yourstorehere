import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { ProductGrid } from '../components/Product/ProductGrid';
import { products } from '../data/products';

export const Wishlist: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center mx-auto">
          <Heart className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-black text-slate-900">
          Your Wishlist is Empty
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
          Save items you love and buy them whenever you are ready.
        </p>
        <div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs px-6 py-3 rounded-xl shadow-xs"
          >
            <span>DISCOVER GROCERIES</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          My Saved Wishlist ({wishlist.length} items)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Your favorite products saved for quick re-ordering.
        </p>
      </div>

      <ProductGrid products={wishlist} columns={5} />
    </div>
  );
};
