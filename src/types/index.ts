export interface Product {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  image: string;
  images?: string[];
  unit: string;
  description: string;
  highlights?: string[];
  stock: number;
  tags: string[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  isDeal?: boolean;
  dealTag?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  itemCount: number;
  image: string;
  bannerImage?: string;
  popularItemName?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  name: string;
  phone: string;
  flat: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface OrderItem {
  productId: string;
  name: string;
  brand: string;
  price: number;
  unit: string;
  image: string;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'Order Placed' | 'Confirmed' | 'Packed' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  statusDescription: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponDiscount: number;
  loyaltyDiscount: number;
  deliveryFee: number;
  total: number;
  deliveryAddress: Address;
  paymentMethod: 'UPI' | 'Card' | 'COD';
  estimatedDelivery: string;
  deliveryPartner?: {
    name: string;
    phone: string;
    rating: number;
    vehicle: string;
  };
}

export interface Coupon {
  code: string;
  title: string;
  description: string;
  discountAmount: number;
  minOrder: number;
  discountType: 'fixed' | 'percentage';
  percentage?: number;
  expiresAt: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  dob?: string;
  gender?: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  loyaltyPoints: number;
}
