import { Coupon, Address, UserProfile } from '../types';

export const initialCoupons: Coupon[] = [
  {
    code: 'SAVE100',
    title: 'Flat ₹100 Off',
    description: 'Get flat ₹100 instant discount on orders above ₹999.',
    discountAmount: 100,
    minOrder: 999,
    discountType: 'fixed',
    expiresAt: '2026-12-31'
  },
  {
    code: 'EXPRESS50',
    title: '₹50 Express Savings',
    description: 'Save ₹50 on essential groceries. Minimum order ₹499.',
    discountAmount: 50,
    minOrder: 499,
    discountType: 'fixed',
    expiresAt: '2026-12-31'
  },
  {
    code: 'FAMILY20',
    title: '20% Mega Family Discount',
    description: 'Get 20% discount up to ₹250 on orders above ₹1499.',
    discountAmount: 250,
    minOrder: 1499,
    discountType: 'percentage',
    percentage: 20,
    expiresAt: '2026-12-31'
  },
  {
    code: 'FREEDEL',
    title: 'Free Superfast Delivery',
    description: 'Enjoy free doorstep delivery on your order above ₹299.',
    discountAmount: 40,
    minOrder: 299,
    discountType: 'fixed',
    expiresAt: '2026-12-31'
  }
];

export const initialAddresses: Address[] = [
  {
    id: 'addr-1',
    type: 'Home',
    name: 'Rahul Sharma',
    phone: '094159 22031',
    flat: 'Flat No. 402, Tower B',
    street: 'Kathauta Chauraha Rd, Vijayant Khand',
    landmark: 'Near Express daily Mart',
    city: 'Gomti Nagar, Lucknow',
    state: 'Uttar Pradesh',
    pincode: '226010',
    isDefault: true
  },
  {
    id: 'addr-2',
    type: 'Work',
    name: 'Rahul Sharma',
    phone: '094159 22031',
    flat: 'Office 12, Commercial Hub',
    street: 'Kathauta Chauraha Road',
    landmark: 'In front of petrol pump',
    city: 'Gomti Nagar, Lucknow',
    state: 'Uttar Pradesh',
    pincode: '226010',
    isDefault: false
  }
];

export const initialProfile: UserProfile = {
  name: 'Rahul Sharma',
  phone: '094159 22031',
  email: 'rahul.sharma@expressdailymart.com',
  dob: '1992-08-15',
  gender: 'Male',
  loyaltyPoints: 2450
};
