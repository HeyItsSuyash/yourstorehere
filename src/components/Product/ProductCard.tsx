import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus, Minus, Star, ShoppingCart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { getItemQuantity, addToCart, updateQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const qty = getItemQuantity(product.id);
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    showToast(`${product.name} added to cart`);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, qty + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, qty - 1);
    if (qty === 1) {
      showToast(`${product.name} removed from cart`, 'info');
    }
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product);
    showToast(
      added ? `${product.name} saved to wishlist` : `Removed from wishlist`,
      'info'
    );
  };

  // Convert Indian rupee price to USD display for exact template aesthetic ($2.39 style)
  const priceUSD = (product.price / 75).toFixed(2);
  const mrpUSD = (product.originalPrice / 75).toFixed(2);

  return (
    <div className="nfb-card p-3.5 flex flex-col justify-between group h-full">
      {/* Top badges: Exact template green discount badge + Wishlist */}
      <div className="flex items-center justify-between z-10">
        {product.discount > 0 ? (
          <span className="nfb-discount-badge">
            {product.discount}%<br />OFF
          </span>
        ) : (
          <span />
        )}
        <button
          type="button"
          onClick={handleWishlistClick}
          className={`p-1 bg-transparent transition-colors ${
            isWishlisted
              ? 'text-rose-500'
              : 'text-slate-400 hover:text-rose-500'
          }`}
          title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
        </button>
      </div>

      {/* Product Image Link */}
      <Link
        to={`/product/${product.id}`}
        className="block my-2 overflow-hidden aspect-square flex items-center justify-center p-2  transition-transform duration-200"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="max-h-full max-w-full object-contain"
        />
      </Link>

      {/* Brand, Name, Unit, Rating */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-bold text-[#888] uppercase tracking-wider block">
            {product.brand}
          </span>
          <Link
            to={`/product/${product.id}`}
            className="text-xs font-bold text-[#111] hover:text-[#ea580c] line-clamp-1 leading-snug mt-0.5"
            title={product.name}
          >
            {product.name}
          </Link>
          <p className="text-[10px] text-[#777] mt-0.5 font-medium">{product.unit}</p>
        </div>

        {/* Rating chip */}
        <div className="flex items-center gap-1 mt-1.5">
          <div className="flex items-center gap-0.5 text-amber-500 text-[11px] font-bold">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-[#333] text-[10px]">{product.rating}</span>
          </div>
          <span className="text-[9.5px] text-[#888]">({product.reviewCount})</span>
        </div>

        {/* Price & Add to Cart button */}
        <div className="mt-2.5 pt-2 border-t border-[#ecefe6]">
          <div className="flex items-baseline gap-1.5 mb-2">
            <span className="text-sm font-black text-[#111]">
              ₹{product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-[11px] text-[#888] line-through">
                ₹{product.originalPrice}
              </span>
            )}
            {product.discount > 0 && (
              <span className="text-[10px] text-[#ea580c] font-bold ml-auto">
                Save ₹{product.originalPrice - product.price}
              </span>
            )}
          </div>

          {/* ADD TO CART Button / Stepper */}
          {qty === 0 ? (
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full border border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c] hover:text-white transition-all text-[10.5px] font-bold py-1.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer "
            >
              <span>ADD TO CART</span>
              <ShoppingCart className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="flex items-center justify-between bg-[#ea580c] text-white rounded-xl overflow-hidden py-0.5 px-2">
              <button
                type="button"
                onClick={handleDecrement}
                className="p-1 hover:bg-[#184910] rounded-xl"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-xs font-black text-center">
                {qty} in Cart
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                className="p-1 hover:bg-[#184910] rounded-xl"
                aria-label="Increase quantity"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
