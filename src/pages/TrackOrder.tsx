import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  User,
  ShieldCheck,
  ArrowLeft,
  Navigation
} from 'lucide-react';
import { useOrders } from '../context/OrderContext';

export const TrackOrder: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { orders } = useOrders();

  const currentOrder =
    orders.find((o) => o.id.toLowerCase() === id?.toLowerCase()) || orders[0];

  const steps = [
    { label: 'Order Placed', time: '5:45 PM', completed: true },
    { label: 'Order Confirmed', time: '5:48 PM', completed: true },
    { label: 'Packed at Hub', time: '5:55 PM', completed: true },
    { label: 'Out for Delivery', time: '6:10 PM', completed: true, current: true },
    { label: 'Delivered', time: 'Expected 6:40 PM', completed: false }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link
            to="/account/orders"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#ea580c]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to My Orders</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Live Order Tracking
          </h1>
          <p className="text-xs text-slate-500">
            Order #{currentOrder.id} • Placed today
          </p>
        </div>
        <span className="bg-orange-100 text-[#c2410c] text-xs font-black px-3 py-1.5 rounded-xl uppercase tracking-wider">
          {currentOrder.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 cols: Stylized Live Map Representation & Timeline */}
        <div className="lg:col-span-7 space-y-6">
          {/* Stylized Delivery Visualization Card (No external map dependencies) */}
          <div className="bg-slate-950 rounded-xl p-6 text-white relative overflow-hidden shadow-lg border border-slate-800">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

            {/* Stylized visual route */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[10px] text-orange-400 font-bold uppercase tracking-widest block">
                    CURRENT ESTIMATE
                  </span>
                  <h3 className="text-2xl font-black text-white">
                    Arriving in 18 Mins
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
                  <Navigation className="w-6 h-6 animate-pulse" />
                </div>
              </div>

              {/* Graphic delivery path */}
              <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 mb-4">
                <div className="flex items-center justify-between text-xs font-bold text-orange-200 mb-2">
                  <span>Hub: Main Fulfillment Center</span>
                  <span className="text-amber-400 font-extrabold flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" /> 1.2 km away
                  </span>
                  <span>Customer Location</span>
                </div>
                {/* Progress track */}
                <div className="w-full h-2.5 bg-slate-950 rounded-xl overflow-hidden p-0.5 border border-[#ea580c]">
                  <div className="h-full bg-gradient-to-r from-[#ea580c] to-amber-400 rounded-xl w-3/4 animate-pulse" />
                </div>
              </div>

              {/* Delivery Driver Info */}
              <div className="flex items-center justify-between bg-white/10 backdrop-blur-xs rounded-xl p-3.5 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#ea580c] text-white flex items-center justify-center font-black text-sm">
                    {currentOrder.deliveryPartner?.name.charAt(0) || 'M'}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      {currentOrder.deliveryPartner?.name || 'Manoj Kumar'}
                    </h4>
                    <p className="text-[11px] text-orange-300">
                      {currentOrder.deliveryPartner?.vehicle || 'Electric Cargo Van'}
                    </p>
                  </div>
                </div>

                <a
                  href={`tel:${currentOrder.deliveryPartner?.phone || '+919811234567'}`}
                  className="flex items-center gap-1 bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-black px-3.5 py-2 rounded-xl transition-colors shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Rider</span>
                </a>
              </div>
            </div>
          </div>

          {/* Timeline Stages */}
          <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs">
            <h3 className="font-bold text-slate-900 text-sm mb-4">
              Status Timeline
            </h3>

            <div className="space-y-6 relative pl-6 border-l-2 border-slate-100 ml-3">
              {steps.map((step, idx) => (
                <div key={idx} className="relative">
                  {/* Dot */}
                  <div
                    className={`absolute -left-[31px] top-0 w-4 h-4 rounded-xl border-2 ${
                      step.current
                        ? 'bg-amber-500 border-white ring-4 ring-amber-100'
                        : step.completed
                        ? 'bg-[#ea580c] border-white ring-2 ring-orange-200'
                        : 'bg-slate-200 border-white'
                    }`}
                  />
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className={`text-xs font-bold ${
                          step.current
                            ? 'text-amber-700'
                            : step.completed
                            ? 'text-slate-900'
                            : 'text-slate-400'
                        }`}
                      >
                        {step.label}
                      </p>
                      <p className="text-[11px] text-slate-400">{step.time}</p>
                    </div>
                    {step.completed && (
                      <CheckCircle2 className="w-4 h-4 text-[#ea580c]" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 cols: Order Items & Delivery Summary */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
              Basket Contents ({currentOrder.items.length} items)
            </h3>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {currentOrder.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 object-contain rounded-xl bg-slate-50 border p-0.5"
                    />
                    <div>
                      <p className="font-bold text-slate-800 line-clamp-1 max-w-[170px]">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {item.unit} • Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-extrabold text-slate-900">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>₹{currentOrder.subtotal}</span>
              </div>
              <div className="flex justify-between text-[#ea580c] font-semibold">
                <span>Total Discount</span>
                <span>- ₹{currentOrder.discount + currentOrder.couponDiscount}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery</span>
                <span className="text-[#ea580c] font-bold uppercase text-[11px]">
                  FREE
                </span>
              </div>
              <div className="flex justify-between font-black text-sm text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Paid</span>
                <span>₹{currentOrder.total}</span>
              </div>
            </div>

            {/* Address */}
            <div className="pt-3 border-t border-slate-100 text-xs text-slate-600">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                Destination Address
              </span>
              <p className="font-semibold text-slate-800">
                {currentOrder.deliveryAddress.name} ({currentOrder.deliveryAddress.type})
              </p>
              <p className="text-slate-500">
                {currentOrder.deliveryAddress.flat}, {currentOrder.deliveryAddress.street}
              </p>
              <p className="text-slate-500">
                {currentOrder.deliveryAddress.city} - {currentOrder.deliveryAddress.pincode}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
