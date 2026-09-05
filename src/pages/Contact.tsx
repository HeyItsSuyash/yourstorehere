import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Check, Star } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const Contact: React.FC = () => {
  const { showToast } = useToast();
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      showToast('Please fill out all fields', 'warning');
      return;
    }
    setSent(true);
    showToast('Your message has been received! Our support team will call you.', 'success');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          Store Locator & Customer Support
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Visit our flagship Lakhimpur supermarket or connect with our customer care desk.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 6 cols: Store Details & Simulated Map */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-xl-none p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="text-lg font-black text-slate-900">
              New Family Bazar - Lakhimpur Supermarket
            </h2>

            <div className="space-y-3.5 text-xs sm:text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 block">Store Address:</strong>
                  <span>Behajam Road, Motinagar Colony, Maharaj Nagar, Lakhimpur, Uttar Pradesh 262701</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 block">Operating Hours:</strong>
                  <span>Monday – Sunday: 10:00 AM – 9:30 PM (Open 7 Days a Week)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 block">Contact Number:</strong>
                  <a href="tel:09415922031" className="text-emerald-700 font-bold hover:underline">
                    094159 22031
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 block">Email Support:</strong>
                  <span>care@newfamilybazar.com</span>
                </div>
              </div>
            </div>

            {/* Google Maps Card with real link */}
            <div className="rounded-xl-none overflow-hidden border border-slate-200 bg-slate-100 relative h-52 flex flex-col justify-between p-4 mt-4">
              <div className="bg-white/90 backdrop-blur-xs p-3 rounded-xl-none border border-slate-200 shadow-xs max-w-sm text-xs">
                <strong className="font-bold text-slate-900 block text-sm">
                  NEW FAMILY BAZAR, Lakhimpur
                </strong>
                <p className="text-[11px] text-slate-500 mt-0.5">Behajam Rd, Motinagar Colony, Lakhimpur, UP</p>
                <div className="flex items-center gap-1.5 text-amber-500 font-bold text-xs mt-1">
                  <div className="flex items-center">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  </div>
                  <span className="text-slate-700">4.8 • Supermarket & Shopping Mall</span>
                </div>
              </div>

              <a
                href="https://maps.app.goo.gl/dik1TVGpPLVk4dBo8"
                target="_blank"
                rel="noreferrer"
                className="self-start inline-flex items-center gap-1.5 bg-[#246b19] hover:bg-[#1b5212] text-white font-bold text-xs px-3.5 py-2 rounded-xl-none shadow-sm transition-transform active:scale-95"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Open in Google Maps Directions</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right 6 cols: Feedback / Contact Form */}
        <div className="lg:col-span-6 bg-white rounded-xl-none p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
          <h2 className="text-lg font-black text-slate-900">Send Us a Message</h2>
          <p className="text-xs text-slate-500">
            Have questions about an order or product feedback? Reach out to our store managers.
          </p>

          {sent ? (
            <div className="p-6 bg-emerald-50 rounded-xl-none border border-emerald-200 text-center space-y-2">
              <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl-none flex items-center justify-center mx-auto">
                <Check className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-emerald-900 text-sm">Message Received</h3>
              <p className="text-xs text-emerald-700">
                Thank you, {formData.name}. Our representative will contact you within 2 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl-none text-xs outline-none focus:border-emerald-600 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl-none text-xs outline-none focus:border-emerald-600 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Message</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help your family with groceries today?"
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl-none text-xs outline-none focus:border-emerald-600 focus:bg-white"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-3.5 rounded-xl-none shadow-md transition-all active:scale-95"
              >
                <span>SEND MESSAGE</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
