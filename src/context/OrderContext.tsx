import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, CartItem, Address } from '../types';
import { initialAddresses } from '../data/initialData';
import { products } from '../data/products';

interface OrderContextType {
  orders: Order[];
  createOrder: (data: {
    items: CartItem[];
    subtotal: number;
    discount: number;
    couponDiscount: number;
    loyaltyDiscount: number;
    deliveryFee: number;
    total: number;
    address: Address;
    paymentMethod: 'UPI' | 'Card' | 'COD';
  }) => Order;
  getOrderById: (id: string) => Order | undefined;
  cancelOrder: (id: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const initialOrders: Order[] = [
  {
    id: 'NFB-10482',
    date: new Date(Date.now() - 3600 * 1000 * 3).toISOString(), // 3 hours ago
    status: 'Out for Delivery',
    statusDescription: 'Your order is on the delivery vehicle and will arrive shortly.',
    items: [
      {
        productId: products[0].id,
        name: products[0].name,
        brand: products[0].brand,
        price: products[0].price,
        unit: products[0].unit,
        image: products[0].image,
        quantity: 2
      },
      {
        productId: products[5].id,
        name: products[5].name,
        brand: products[5].brand,
        price: products[5].price,
        unit: products[5].unit,
        image: products[5].image,
        quantity: 1
      },
      {
        productId: products[10].id,
        name: products[10].name,
        brand: products[10].brand,
        price: products[10].price,
        unit: products[10].unit,
        image: products[10].image,
        quantity: 1
      }
    ],
    subtotal: 637,
    discount: 88,
    couponDiscount: 50,
    loyaltyDiscount: 0,
    deliveryFee: 0,
    total: 587,
    deliveryAddress: initialAddresses[0],
    paymentMethod: 'UPI',
    estimatedDelivery: 'Today, 6:30 PM – 7:00 PM',
    deliveryPartner: {
      name: 'Manoj Kumar',
      phone: '+91 98112 34567',
      rating: 4.9,
      vehicle: 'Electric Super Van (KA 05 EZ 8821)'
    }
  },
  {
    id: 'NFB-10390',
    date: new Date(Date.now() - 86400 * 1000 * 4).toISOString(), // 4 days ago
    status: 'Delivered',
    statusDescription: 'Delivered to Bellandur residence.',
    items: [
      {
        productId: products[6].id,
        name: products[6].name,
        brand: products[6].brand,
        price: products[6].price,
        unit: products[6].unit,
        image: products[6].image,
        quantity: 2
      },
      {
        productId: products[18].id,
        name: products[18].name,
        brand: products[18].brand,
        price: products[18].price,
        unit: products[18].unit,
        image: products[18].image,
        quantity: 2
      }
    ],
    subtotal: 396,
    discount: 56,
    couponDiscount: 0,
    loyaltyDiscount: 50,
    deliveryFee: 0,
    total: 346,
    deliveryAddress: initialAddresses[0],
    paymentMethod: 'COD',
    estimatedDelivery: 'Delivered on Sep 1, 4:15 PM'
  }
];

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('nfb_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  useEffect(() => {
    localStorage.setItem('nfb_orders', JSON.stringify(orders));
  }, [orders]);

  const createOrder = (data: {
    items: CartItem[];
    subtotal: number;
    discount: number;
    couponDiscount: number;
    loyaltyDiscount: number;
    deliveryFee: number;
    total: number;
    address: Address;
    paymentMethod: 'UPI' | 'Card' | 'COD';
  }): Order => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newOrder: Order = {
      id: `NFB-${randomNum}`,
      date: new Date().toISOString(),
      status: 'Order Placed',
      statusDescription: 'Order confirmed and sent to nearest Express daily Mart hub for packing.',
      items: data.items.map((it) => ({
        productId: it.product.id,
        name: it.product.name,
        brand: it.product.brand,
        price: it.product.price,
        unit: it.product.unit,
        image: it.product.image,
        quantity: it.quantity
      })),
      subtotal: data.subtotal,
      discount: data.discount,
      couponDiscount: data.couponDiscount,
      loyaltyDiscount: data.loyaltyDiscount,
      deliveryFee: data.deliveryFee,
      total: data.total,
      deliveryAddress: data.address,
      paymentMethod: data.paymentMethod,
      estimatedDelivery: 'Today within 45 - 60 mins',
      deliveryPartner: {
        name: 'Ramesh Verma',
        phone: '+91 99887 76655',
        rating: 4.85,
        vehicle: 'Express Eco Cargo (KA 01 XY 3344)'
      }
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const getOrderById = (id: string) => {
    return orders.find((o) => o.id.toLowerCase() === id.toLowerCase());
  };

  const cancelOrder = (id: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              status: 'Cancelled',
              statusDescription: 'Cancelled by customer.'
            }
          : o
      )
    );
  };

  return (
    <OrderContext.Provider value={{ orders, createOrder, getOrderById, cancelOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrders must be used within OrderProvider');
  return context;
};
